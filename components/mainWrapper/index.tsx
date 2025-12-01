import { useOrientation } from "@/services";
import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../button";
import PaginationDots from "../paginatioDots";

interface ThemeColors {
  background: string;
  backgroundInverse: string;
  primaryThemeColor: string;
  secondaryThemeColor: string;
  linearGradientOrangeColor: string;
  linearGradientBlackColor: string;
  text: string;
  textGrey: string;
  redColor: string;
  transparent: string;
  disabled: string;
}

interface MainWrapperProps {
  children: ReactNode;
  colors: ThemeColors;
  showButton?: boolean;
  buttonTitle?: string;
  onButtonPress?: () => void;
  disableButton?: boolean;
  isLoading?: boolean;
  pagination: number;
  indicator: number;
  scrollEnabled: boolean;
  buttonContainer: object;
}

const MainWrapper: React.FC<MainWrapperProps> = ({
  children,
  colors,
  showButton,
  buttonTitle,
  onButtonPress,
  disableButton,
  isLoading,
  pagination,
  indicator,
  scrollEnabled = true,
  buttonContainer,
}) => {
  const { windowWidth, windowHeight, isPortrait, wp, hp } = useOrientation();
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        bottomOffset={62}
        showsVerticalScrollIndicator={false}
        extraKeyboardSpace={100}
        enabled={true}
        keyboardShouldPersistTaps="handled"
        // keyboardDismissMode="on-drag"
        // keyboardDismissMode="interactive"
        style={styles.scroll}
        contentContainerStyle={styles.content}
        scrollEnabled={scrollEnabled}
      >
        {/* <ScrollView showsVerticalScrollIndicator={true} style={{ flexGrow: 1 }}> */}
        {children}
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
      {pagination && <PaginationDots length={pagination} current={indicator} />}
      {showButton && (
        <Button
          changeMainContainerStyle={[buttonContainer, { marginBottom: bottom }]}
          isLoading={isLoading}
          colors={colors}
          onPress={onButtonPress}
          disable={disableButton}
        >
          {buttonTitle || "Next"}
        </Button>
      )}
      <KeyboardToolbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    // paddingBottom: wp(10),
  },
});

export default MainWrapper;
