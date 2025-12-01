import {
  FlashAlert,
  Header,
  InputField,
  MainWrapper,
  ParentWrapper,
} from "@/components";
import { FontFamily } from "@/constants/Fonts";
import { api } from "@/network/Environment";
import { callApi, Method } from "@/network/NetworkManger";
import {
  appImages,
  handleSimplePasswordCheck,
  useOrientation,
  useTheme,
} from "@/services";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DeleteAccount = () => {
  const { colors } = useTheme();
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const [password, setPassword] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const bottomSheetRef = useRef<BottomSheet>(null);

  const styles = createStyles(
    colors,
    windowWidth,
    windowHeight,
    isPortrait,
    wp,
    hp
  );

  const handlePasswordChange = async (): Promise<void> => {
    Keyboard.dismiss();
    if (!handleSimplePasswordCheck(password, errors, setErrors, true)) return;

    console.log("Attempting to expand bottom sheet");
    bottomSheetRef.current?.expand();
    setIsSheetOpen(true);
  };

  const handleConfirmDelete = () => {
    bottomSheetRef.current?.close();
    DeleteAccount();
  };

  const handleCancel = () => {
    bottomSheetRef.current?.close();
    setIsSheetOpen(false);
  };

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      setIsSheetOpen(false);
    }
  };

  const DeleteAccount = () => {
    try {
      const body = {
        password: password,
      };
      const onSuccess = (res: any) => {
        FlashAlert({
          title: "Account Deleted",
          type: "I",
        });
        console.log("res-------", res);
        setIsSheetOpen(false);
        router.back();
      };
      const onError = (error: any) => {
        console.log("error------------------", error);
      };
      const endPoint = api.deleteUser;
      const method = Method.POST;

      callApi(method, endPoint, body, onSuccess, onError);
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  const { bottom } = useSafeAreaInsets();

  const renderBackdrop = useCallback(
    (props: import("@gorhom/bottom-sheet").BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
        {...props}
      />
    ),
    []
  );
  return (
    <ParentWrapper colors={colors}>
      <Header
        hideHeader={false}
        inVisibleHeader={false}
        centerTitle={"Deactivate Account"}
        colors={colors}
        statusBarColor={colors.transparent}
        barStyleWhiteColor={true}
        leftSideIcons={true}
        backIcon={true}
        extraMarginAtTop={true}
      />
      <MainWrapper
        showButton
        buttonTitle="Delete Account"
        onButtonPress={handlePasswordChange}
        colors={colors}
      >
        <View style={styles.wrapper}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={appImages.warning}
              style={styles.deleteImage}
              resizeMode="contain"
            />
            <Text style={styles.deleteText}>Delete your account will:</Text>
          </View>

          <Text style={styles.description}>
            We're sorry to see you go. If you're sure you want to delete your
            Project SoulWave App account,{"\n"}please be aware that this action
            is permanent and cannot be undone. All of your personal information,
            including your information and settings, will be permanently
            deleted.
            {"\n\n"}
            If you're having trouble with your account or have concerns, please
            reach out to us at [contact email{"\n"}or support page] before
            proceeding with the account deletion. We'd love to help you resolve
            any issues and keep you as a valued SoulWave App user.
          </Text>

          <InputField
            colors={colors}
            value={password}
            title="Current Password"
            placeholder="*******"
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
              handleSimplePasswordCheck(text, errors, setErrors);
            }}
            errorText={errors?.password}
          />
          <Text style={styles.description}>
            To delete your account, please enter your{"\n"}password in the field
            below and confirm your decision by clicking the 'Delete My Account'
            {"\n"}
            button.
          </Text>
        </View>
      </MainWrapper>

      <BottomSheet
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        snapPoints={["28%"]}
        index={-1} // Start completely closed
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: "transparent",
        }}
        handleStyle={{ display: "none" }} // Hide the handle bar
        enableDynamicSizing={false}
        enableOverDrag={false}
        onChange={handleSheetChanges} // Track sheet state changes
      >
        <BlurView
          intensity={30}
          tint="light"
          style={[styles.bottomSheetContainer, { paddingBottom: bottom }]}
        >
          <Text style={styles.title}>Deactivate Account</Text>
          <Text style={styles.confirmText}>
            Are you sure you want to delete your account?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              activeOpacity={0.8}
              onPress={handleCancel}
            >
              <Text style={[styles.buttonText, styles.deleteButtonText]}>
                Stay
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              activeOpacity={0.8}
              onPress={handleConfirmDelete}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </BottomSheet>
    </ParentWrapper>
  );
};

export default DeleteAccount;

const createStyles = (
  colors: ThemeColors,
  windowWidth: number,
  windowHeight: number,
  isPortrait: boolean,
  wp: (percentage: number) => number,
  hp: (percentage: number) => number
) =>
  StyleSheet.create({
    wrapper: {
      marginHorizontal: isPortrait ? wp(4) : hp(4),
      marginTop: isPortrait ? wp(5) : hp(5),
      rowGap: wp(6),
    },
    deleteImage: {
      width: wp(5),
      height: wp(5),
      resizeMode: "contain",
    },
    deleteText: {
      color: colors.text,
      fontFamily: FontFamily.appMedium,
      fontSize: responsiveFontSize(1.8),
      marginLeft: wp(2),
    },
    description: {
      fontFamily: FontFamily.appRegular,
      fontSize: responsiveFontSize(1.6),
      color: colors.text,
      lineHeight: 18,
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 0, // Below bottom sheet but above main content
    },
    bottomSheetContainer: {
      flex: 1,

      borderRadius: wp(5),
      overflow: "hidden",
      borderColor: "#FFFFFF4D",
      borderWidth: wp(0.3),

      justifyContent: "center",
      alignItems: "center",
    },
    confirmText: {
      fontSize: responsiveFontSize(1.8),
      fontFamily: FontFamily.appRegular,
      color: colors.text,
      marginBottom: 20,
      textAlign: "center",
    },
    title: {
      fontSize: responsiveFontSize(2.6),
      fontFamily: FontFamily.appMedium,
      color: colors.text,
      marginBottom: 20,
      textAlign: "center",
      lineHeight: 36,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },
    button: {
      padding: 15,
      borderRadius: 8,
      width: "45%",
      alignItems: "center",
    },
    cancelButton: {
      backgroundColor: colors.primary,
      borderRadius: wp(6),
    },
    deleteButton: {
      backgroundColor: "transparent",
      borderRadius: wp(6),
      borderColor: colors.primary,
      borderWidth: wp(0.3),
    },
    buttonText: {
      fontSize: responsiveFontSize(1.8),
      fontFamily: FontFamily.appMedium,
      color: colors.white,
    },
    deleteButtonText: {
      color: colors.white,
    },
  });
