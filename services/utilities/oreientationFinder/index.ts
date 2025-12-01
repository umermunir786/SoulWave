import { useState, useEffect } from "react";
import { Dimensions, ScaledSize } from "react-native";

// Utility functions to calculate percentages
const wp = (percentage: number, width: number) => (width * percentage) / 100;
const hp = (percentage: number, height: number) => (height * percentage) / 100;

export const useOrientation = () => {
  const getScreenDimensions = () => Dimensions.get("window");

  const [screen, setScreen] = useState<ScaledSize>(getScreenDimensions());

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setScreen(window);
    };

    const subscription = Dimensions.addEventListener("change", onChange);

    return () => subscription.remove();
  }, []);

  return {
    windowWidth: screen.width,
    windowHeight: screen.height,
    isPortrait: screen.height > screen.width,
    wp : (percentage: number) => wp(percentage, screen.width),
    hp : (percentage: number) => hp(percentage, screen.height),
  };
};
