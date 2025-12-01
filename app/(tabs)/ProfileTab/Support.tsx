import { Header, MainWrapper, ParentWrapper } from "@/components";
import { FontFamily } from "@/constants/Fonts";
import { appImages, useTheme, wp } from "@/services";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const Support = () => {
  const { colors } = useTheme();

  const supportData = [
    {
      icon: appImages.chat,
      title: "Chat to us",
      description: "Our friendly team is here to help.",
      contact: "help@soulwave.com",
    },
    {
      icon: appImages.phone,
      title: "Phone",
      description: "Lorem ipsum dolor sit amet.",
      contact: "+1(555)  000-0000",
    },
  ];

  return (
    <ParentWrapper colors={colors}>
      <Header
        hideHeader={false}
        inVisibleHeader={false}
        centerTitle={"Help & Support"}
        colors={colors}
        statusBarColor={colors.transparent}
        barStyleWhiteColor={true}
        leftSideIcons={true}
        backIcon={true}
        extraMarginAtTop={true}
      />
      <MainWrapper colors={colors}>
        <View
          style={{
            marginHorizontal: wp(5),
            marginBottom: wp(35),
            marginTop: wp(15),
          }}
        >
          <Text
            style={{
              fontFamily: FontFamily?.appRegular,
              fontSize: responsiveFontSize(1.8),
              lineHeight: 27,
              color: colors.white,
            }}
          >
            {
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar bibendum magna Lorem ipsum dolor"
            }
          </Text>

          {supportData.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: wp(6),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <View
                  style={{
                    height: wp(14),
                    width: wp(14),
                    marginRight: wp(5),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: colors.white,
                    borderRadius: wp(4.5),
                    marginTop: wp(1),
                  }}
                >
                  <Image
                    source={item.icon}
                    style={{ height: wp(7.5), width: wp(7.5) }}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      fontFamily: FontFamily.appMedium,
                      fontSize: responsiveFontSize(2.0),
                      color: "white",
                      lineHeight: 30,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FontFamily.appRegular,
                      fontSize: responsiveFontSize(1.4),
                      color: "white",
                    }}
                  >
                    {item.description}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FontFamily.appMedium,
                      fontSize: responsiveFontSize(1.4),
                      color: "white",
                      lineHeight: 22,
                    }}
                  >
                    {item.contact}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default Support;

const styles = StyleSheet.create({});
