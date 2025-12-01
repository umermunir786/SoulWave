import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet } from "react-native";

import { hp, wp } from "@/services";
import { BlurView } from "expo-blur";

interface MusicPlayerBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  bottomSheetRef: React.RefObject<BottomSheet>;
  snapPoints: (string | number)[];
}

const MusicPlayerBottomSheet: React.FC<MusicPlayerBottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  bottomSheetRef,
  snapPoints = [hp(30)],
}) => {
  return (
    <BottomSheet
      // backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: "transparent",
      }}
      handleStyle={{ display: "none" }} // Hide the handle bar
      enableDynamicSizing={false}
      // onChange={handleSheetChanges}
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      enableOverDrag={false}
      onClose={onClose}
    >
      <BlurView
        intensity={30}
        tint="dark"
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: wp(6),
            overflow: "hidden",
            backgroundColor: "#101010CC",
          },
        ]}
      >
        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>
      </BlurView>
    </BottomSheet>
  );
};

export default MusicPlayerBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: wp(5),
    paddingTop: hp(2),
  },
});
