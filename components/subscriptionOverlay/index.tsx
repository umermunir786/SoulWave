import { FontFamily } from "@/constants/Fonts";
import { appImages, useTheme, wp } from "@/services";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../button";
import { useIAP, initConnection, endConnection, finishTransaction } from 'expo-iap';
import { api } from "@/network/Environment";
import { callApi, Method } from "@/network/NetworkManger";
import { useSelector } from "react-redux";
import { FlashAlert } from "../flashMessage";

const { width, height } = Dimensions.get("window");

interface SubscriptionOverlayProps {
  visible: boolean;
  onClose: () => void;
  onSubscribe: (plan: string) => void;
  onPressButton: () => void;
}

const SubscriptionOverlay: React.FC<SubscriptionOverlayProps> = ({
  visible,
  onClose,
  onSubscribe,
}) => {
  const features = [
    "Unlimited access to all meditation types",
    "Download for offline access",
    "Progress tracking and daily streaks",
  ];
  const [activePlan, setActivePlan] = useState("free");

  const plans = [
    {
      id: "free",
      title: "$0 / Free Trial",
      subtitle: "Billing starts after 7 days",
      price: "$0",
      period: "Free Trial",
      selected: false,
    },
    {
      id: "monthly",
      title: "$9.99 / Monthly",
      subtitle: "Billed monthly",
      price: "$9.99",
      period: "Monthly",
      selected: true,
    },
    {
      id: "yearly",
      title: "$59.99 / Monthly",
      subtitle: "Billed yearly",
      price: "$59.99",
      period: "Monthly",
      badge: "Save 33%",
      selected: false,
    },
  ];
  const { colors } = useTheme();
  const { subscriptions, connected, activeSubscriptions, requestPurchase, fetchProducts } = useIAP()
  const { user } = useSelector((state: any) => state.userData);

  const { bottom } = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(false);

  const subscriptionSkus = Platform.select({
    ios: ["SoulWaveMonthly", "SoulWaveYearly"],
    android: ["soulwave_packeges"],
  });

  const handleSubscribe = async () => {
    try {
      onSubscribe(activePlan);
      if (activePlan === "free") {
        onClose();
        FlashAlert({
          type: "S",
          title: "Free Trial",
          description: "Enjoy your free trial for 7 days!",
        });
        return;
      }
      let selectedSku: string;
      setIsLoading(true);
      if (Platform.OS === 'ios') {
        //@ts-ignore
        selectedSku = activePlan === "monthly" ? subscriptionSkus[0] : subscriptionSkus[1];
      } else {
        //@ts-ignore
        selectedSku = subscriptionSkus[0];
      }
      const connected = await initConnection();
      const result = await buySubscription(selectedSku, subscriptions);
      if (!result || !connected) {
        setIsLoading(false);
        return;
      };
      console.log('result==========', result)
      const purchase = Array.isArray(result) ? result[0] : result;
      console.log('purchase.purchaseToken-------------------', purchase)
      //@ts-ignore
      if (purchase?.purchaseToken) {
        try {
          await finishTransaction({
            purchase: purchase,
            isConsumable: false,
          });
          try {
            setIsApiLoading(true);
            onClose();
            FlashAlert({
              type: "S",
              title: "Success",
              description: "Your subscription has been successfully verified!",
            });
            setIsApiLoading(false);
            const body = {
              packageName:
                Platform.OS === 'ios' ?
                  activePlan === "monthly" ? subscriptionSkus[0] : subscriptionSkus[1]
                  : activePlan === "monthly" ? "soulwavemonthly" : "soulwaveyearly",
              type: activePlan,
              purchaseData: purchase,
              deviceType: Platform.OS,
            };
            const onSuccess = (res: any) => {
              console.log('response from verify subscription.............', res)
              setIsApiLoading(false);
              onClose();
              FlashAlert({
                type: "S",
                title: "Success",
                description: "Your subscription has been successfully verified!",
              });
            };
            const onError = (error: any) => {
              console.log('error from verify subscription.............', error)
              setIsApiLoading(false);
              Alert.alert("Error", "Failed to verify subscription. Please try again.");
            };
            const endPoint = `${api.verifySubscription}/${user?._id}`;
            const method = Method.POST;

            // callApi(method, endPoint, body, onSuccess, onError);
          } catch (error) {
            console.log("Error during image uploads:", error);
          }
        } catch (error) {
          console.error('Error finishing transaction:', error);
        }
      }

    } catch (error) {
      console.error("Purchase error:", error);
      setIsLoading(false);
      Alert.alert("Error", "Failed to process subscription. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const buySubscription = async (subscriptionId: string, subscriptions: any) => {
    if (Platform.OS === 'ios') {
      return await requestPurchase({
        request: {
          ios: {
            sku: subscriptionId
          },
        },
        type: 'subs',
      });
    } else {
      const subscriptionOffers = subscriptions[0]?.subscriptionOfferDetailsAndroid;

      if (!subscriptionOffers || subscriptionOffers.length === 0) {
        throw new Error('No subscription offers available');
      }

      const selectedOffer = subscriptionOffers.find((offer: any) => {
        const basePlanId = offer.basePlanId.toLowerCase();
        if (activePlan === "monthly") {
          return basePlanId === "soulwavemonthly";
        } else if (activePlan === "yearly") {
          return basePlanId === "soulwaveyearly";
        }
        return false;
      });

      return await requestPurchase({
        request: {
          android: {
            skus: [subscriptionId],
            subscriptionOffers: [{
              sku: subscriptionId,
              offerToken: selectedOffer.offerToken,
            }]
          },
        },
        type: 'subs',
      });
    }
  };


  useEffect(() => {
    const initIAP = async () => {
      try {
        const result = await initConnection();
        console.log('result', result)
        const subscriptions: any = await fetchProducts({
          //@ts-ignore
          skus: subscriptionSkus, type: 'subs'
        });
        // const purchases = await getAvailablePurchases();
        // console.log('Available purchases:', purchases);
        // if (purchases) {
        //   // const isValid = await validateReceiptOnServer(purchases[0]);
        //   // if (isValid) {
        //   //   await grantPurchaseToUser(purchases[0]);
        //   // }
        // }
        if (subscriptions?.length === 0) {
          Alert.alert('Error', 'No subscription products found. Please try again later.');
        }
      } catch (error) {
        console.warn('IAP initialization error:', error);
        Alert.alert('Error', 'Failed to initialize payment system. Please restart the app.');
      }
    };
    initIAP();
    return () => {
      endConnection();
    };
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <BlurView
          intensity={16}
          tint="dark"
          style={StyleSheet.absoluteFillObject}
        >
          <LinearGradient
            colors={["#31a9f9ea", "#203099e8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        </BlurView>

        <View style={styles.container}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} activeOpacity={0.8} onPress={onClose}>
            <Image
              source={appImages.cross}
              style={{ height: wp(2.5), width: wp(2.5) }}
            />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Unlock your calm.</Text>
            <Text style={styles.subtitle}>
              {
                "Enjoy unlimited access to guided\nmeditations, sleep sounds, and personalized\nprogress tracking."
              }
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Image
                  source={appImages.greenTick}
                  style={{ height: wp(5), width: wp(5), marginRight: wp(2) }}
                />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Pricing Plans */}
          <View style={styles.plansContainer}>
            {plans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planItem,
                  plan.selected && styles.selectedPlan,
                  plan.id === "yearly" && styles.yearlyPlan,
                ]}
                activeOpacity={0.8}
                onPress={() => setActivePlan(plan?.id)}
              >
                <View style={styles.planContent}>
                  <View style={styles.radioButton}>
                    {activePlan == plan?.id && (
                      <View
                        style={[
                          styles.radioInner,
                          activePlan == plan?.id && styles.radioSelected,
                        ]}
                      >
                        <Image
                          source={appImages?.blueTick}
                          style={[{ height: wp(2.5), width: wp(3.3) }]}
                        />
                      </View>
                    )}
                  </View>
                  <View style={styles.planInfo}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <Text style={styles.planSubtitle}>{plan.subtitle}</Text>
                  </View>
                </View>
                {plan.badge && (
                  <Image
                    source={appImages.discount}
                    style={{
                      height: wp(7.5),
                      width: wp(26.2),
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      {/* Subscribe Button */}
      <Button
        onPress={() => handleSubscribe()}
        colors={colors}
        changeMainContainerStyle={{
          position: "absolute",
          bottom: bottom + 5,
          marginHorizontal: wp(-20),
          alignSelf: "center",
          width: wp(90),
        }}
        disable={!activePlan || isLoading || isApiLoading}
        children={activePlan === "free" ? "Start your free trial" : activePlan === "monthly" ? "Upgrade to monthly plan" : "Upgrade to yearly plan"}
        isLoading={isLoading || isApiLoading}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  container: {
    backgroundColor: "transparent",
    borderRadius: wp(4),
    marginHorizontal: wp(5),
    alignItems: "center",
    paddingTop: wp(15),
  },
  closeButton: {
    position: "absolute",
    top: wp(10),
    right: wp(4),
    width: wp(8),
    height: wp(8),
    borderRadius: wp(2),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  closeButtonText: {
    color: "white",
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
  },
  header: {
    marginBottom: wp(8),
    marginTop: wp(6),
  },
  title: {
    fontSize: responsiveFontSize(2.8),
    fontFamily: FontFamily.appRegular,
    color: "white",

    marginBottom: wp(3),
    lineHeight: responsiveFontSize(4.2),
  },
  subtitle: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: FontFamily.appRegular,
    color: "white",
    textAlign: "left",
  },
  featuresContainer: {
    width: "100%",
    marginBottom: wp(8),
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: wp(3),
    backgroundColor: "#FFFFFF1A",
    paddingHorizontal: wp(1),
    paddingVertical: wp(1),
    borderRadius: wp(10),
  },
  checkIcon: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    backgroundColor: "rgba(34, 197, 94, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp(3),
  },
  checkText: {
    color: "white",

    fontSize: responsiveFontSize(1.8),
    fontFamily: FontFamily.appRegular,
  },
  featureText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: FontFamily.appRegular,
    color: "white",
    flex: 1,
  },
  plansContainer: {
    width: "100%",
    marginBottom: wp(8),
  },
  planItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: wp(3),
    padding: wp(3),
    marginBottom: wp(3),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  selectedPlan: {
    borderColor: "rgba(255, 255, 255, 0.5)",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  yearlyPlan: {
    borderColor: "rgba(255, 193, 7, 0.8)",
    backgroundColor: "rgba(255, 193, 7, 0.1)",
  },
  planContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp(4),
  },
  radioInner: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: "transparent",
  },
  radioSelected: {
    backgroundColor: "white",
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    justifyContent: "center",
    alignItems: "center",
  },
  planInfo: {
    flex: 1,
  },
  planTitle: {
    fontSize: responsiveFontSize(1.9),
    fontFamily: FontFamily.appRegular,
    color: "white",
    marginBottom: wp(1),
  },
  planSubtitle: {
    fontSize: responsiveFontSize(1.4),
    fontFamily: FontFamily.appRegular,
    color: "rgba(255, 255, 255, 0.7)",
  },
  badge: {
    backgroundColor: "rgba(255, 193, 7, 0.9)",
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    borderRadius: wp(1),
  },
  badgeText: {
    fontSize: responsiveFontSize(1.4),
    fontFamily: FontFamily.appRegular,
    color: "white",
    fontWeight: "bold",
  },

  subscribeButtonText: {
    fontSize: responsiveFontSize(2.0),
    fontFamily: FontFamily.appRegular,
    color: "white",
    fontWeight: "bold",
  },
});

export default SubscriptionOverlay;
