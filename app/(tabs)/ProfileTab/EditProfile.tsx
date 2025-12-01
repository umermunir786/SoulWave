import { FlashAlert, Header, InputField, MainWrapper, ParentWrapper } from "@/components";
import { api } from "@/network/Environment";
import { callApi, Method } from "@/network/NetworkManger";
import {
  appImages,
  handleNameCheck,
  pickImageFromLibrary,
  useTheme,
  wp,
} from "@/services";
import { setUser } from "@/store/reducers/userDataSlice";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const EditProfile = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.userData);
  const [name, setName] = useState<string>(user?.name ?? "");
  const [image, setImage] = useState<string>(user?.image?.image ?? "");
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const uploadImageS3 = async () => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", {
        uri: image,
        name: "profilePic.jpg",
        type: "image/jpeg",
      });

      const onSuccess = (res: any) => {
        console.log("Image uploaded successfully:", res);
        resolve(res);
      };
      const onError = (error: any) => {
        console.log("Error during image uploads:", error);
        reject(error);
      };
      const endPoint = api.upload;
      const method = Method.POST;

      callApi(method, endPoint, formData, onSuccess, onError, null, true);
    });
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      const body = {
        name: name,
      };
      const onSuccess = (res: any) => {
        console.log('res :>> ', res);
        setIsLoading(false);
        dispatch(setUser(res?.data?.user));
        FlashAlert({
          title: "Profile updated successfully",
          type: "I",
          position: "bottom",
        });
        router.back();
      };
      const onError = (error: any) => {
        console.log('error :>> ', error);
        FlashAlert({
          title: error?.message ?? "Error updating profile",
          type: "E",
          position: "bottom",
        });
        setIsLoading(false);
      };
      const endPoint = api.updateProfile;
      const method = Method.PATCH;

      callApi(method, endPoint, body, onSuccess, onError);
    } catch (error) {
      console.log("Error during image uploads:", error);
    }
  };

  return (
    <ParentWrapper colors={colors}>
      <Header
        hideHeader={false}
        inVisibleHeader={false}
        centerTitle={"Edit Profile"}
        colors={colors}
        statusBarColor={colors.transparent}
        barStyleWhiteColor={true}
        leftSideIcons={true}
        backIcon={true}
        extraMarginAtTop={true}
      />
      <MainWrapper
        showButton
        buttonTitle="Save"
        disableButton={isLoading}
        isLoading={isLoading}
        onButtonPress={() => {
          handleUpdateProfile();
        }}
        colors={colors}
      >
        <View
          style={{
            marginHorizontal: wp(5),
            marginBottom: wp(35),
            marginTop: wp(6),
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: wp(8),
            }}
          >
            <ImageBackground
              source={image ? { uri: image } : appImages.profilePic}
              style={{ height: wp(30), width: wp(30) }}
              imageStyle={{ borderRadius: 100 }}
            >
              <Pressable
                style={{
                  backgroundColor: colors.primary,
                  position: "absolute",
                  bottom: wp(0),
                  right: wp(3),
                  height: wp(6.5),
                  width: wp(6.5),
                  borderRadius: wp(7),
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  const pickImage = pickImageFromLibrary(false, true);
                  pickImage.then((images) => {
                    if (images) {
                      setImage(images[0]);
                      console.log("------------", images);
                    }
                  });
                }}
              >
                <Image
                  source={appImages.camera}
                  style={{
                    height: wp(3),
                    width: wp(3),
                  }}
                />
              </Pressable>
            </ImageBackground>
          </View>
          <InputField
            colors={colors}
            title={"Enter Name"}
            value={name}
            // leftIcon={appImages?.apple}
            placeholder="Enter your name"
            keyboardType="default"
            onChangeText={(text) => {
              setName(text);
              handleNameCheck(text, errors, setErrors);
            }}
            errorText={errors?.name}
          />
        </View>
      </MainWrapper>
    </ParentWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
