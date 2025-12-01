import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Animated,
  Easing,
  Image,
} from "react-native";
import { BlurView } from "expo-blur";
import { appImages, wp } from "@/services";

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message,
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      spinValue.setValue(0);
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.stopAnimation();
      spinValue.setValue(0);
    }
  }, [visible]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.container}>
        <BlurView intensity={60} tint="dark" style={styles.blur}>
          <View style={styles.loaderContainer}>
            <Animated.View style={{ transform: [{ rotate }] }}>
              <Image
                source={appImages.logo}
                style={styles.logo}
                resizeMode="contain"
              />
            </Animated.View>
            {message ? <Text style={styles.message}>{message}</Text> : null}
          </View>
        </BlurView>
      </View>
    </Modal>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  loaderContainer: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 20,
    alignItems: "center",
  },
  logo: {
    width: wp(25),
    height: wp(25),
    borderRadius: 50, // nice circular spin
  },
  message: {
    color: "#fff",
    marginTop: 12,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});
