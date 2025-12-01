import { api, BASE_URL } from "@/network/Environment";
import { callApi, Method } from "@/network/NetworkManger";
import { store } from "@/store/store";
import * as AppleAuthentication from "expo-apple-authentication";
import * as ImagePicker from "expo-image-picker";
// import * as Location from "expo-location";
// import * as Notifications from "expo-notifications";

import { FlashAlert } from "@/components/flashMessage";
import axios from "axios";
import { Alert, Linking } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const { user } = store.getState().userData;
export const pickImageFromLibrary = async (
  allowsMultipleSelection = true,
  allowsEditing = false,
  mediaTypes = ImagePicker.MediaTypeOptions.Images,
  aspect = [4, 3],
  quality = 1
) => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      FlashAlert(
        "E",
        "Permission",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: mediaTypes,
      allowsEditing: allowsEditing,
      aspect: aspect,
      quality: quality,
      allowsMultipleSelection: allowsMultipleSelection,
    });

    if (result.canceled) {
      return null;
    }
    // console.log("results", result);
    const images = result?.assets?.map((image) => image.uri);
    // console.log("results", images);
    return images;
  } catch (error) {
    console.log("error", error);
  }
};

export const fromatDOBForInputField = (date) => {
  const cleaned = date?.replace(/\D/g, "");
  let formattedDate = cleaned?.slice(0, 2);

  if (cleaned?.length > 2) {
    formattedDate += "-" + cleaned.slice(2, 4);
  }

  if (cleaned?.length > 4) {
    formattedDate += "-" + cleaned.slice(4, 8);
  }

  return formattedDate;
};

export function formatTimeForInputField(time) {
  let formattedTime = time?.replace(/[^0-9]/g, "");
  if (formattedTime?.length > 2) {
    formattedTime =
      formattedTime?.slice(0, 2) + ":" + formattedTime?.slice(2, 4);
  }
  return formattedTime;
}

export function formatDateForInputField(date) {
  let formattedDate = date?.replace(/[^0-9]/g, "");

  if (formattedDate?.length > 2 && formattedDate?.length <= 4) {
    formattedDate = formattedDate.slice(0, 2) + "/" + formattedDate.slice(2);
  } else if (formattedDate?.length > 4) {
    formattedDate =
      formattedDate.slice(0, 2) +
      "/" +
      formattedDate.slice(2, 4) +
      "/" +
      formattedDate.slice(4, 8);
  }

  return formattedDate;
}

export function convertTimeToISO(inputTime) {
  const [inputHours, inputMinutes] = inputTime.split(":").map(Number);

  const hours = inputHours % 24;
  const daysToAdd = Math.floor(inputHours / 24);

  const now = new Date();

  now.setHours(hours);
  now.setMinutes(inputMinutes);
  now.setSeconds(0);

  now.setDate(now.getDate() + daysToAdd);

  return now.toISOString();
}

export const getCoordinates = async (latitude, longitude, type) => {
  await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${"AIzaSyAKxDFZP8N395fl0cp57W_w5HdCGXEDVss"}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      const address = result?.results[0].formatted_address;
      console.log("address", address);
    })
    .catch((error) => {
      console.log("error is", error);
    });
};

export const formattedDate = (createdAt) => {
  const dateObject = new Date(createdAt);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDateString = dateObject.toLocaleDateString("en-GB", options);
  return formattedDateString.replace(/\//g, "-");
};

export const formattedTime = (dateTime) => {
  const options = { hour12: true, hour: "2-digit", minute: "2-digit" };
  const formatted = new Date(dateTime);
  return formatted.toLocaleTimeString("en-US", options);
};

export const openGmail = (email) => {
  const mailtoURL = `mailto:${email}`;
  Linking.canOpenURL(mailtoURL)
    .then((supported) => {
      if (supported) {
        Linking.openURL(mailtoURL);
      } else {
        Alert.alert("Error", "Unable to open Gmail.");
      }
    })
    .catch((err) => console.error("Error opening Gmail:", err));
};

export const dialPhoneNumber = (phoneNumber) => {
  const telURL = `tel:${phoneNumber}`;
  Linking.canOpenURL(telURL)
    .then((supported) => {
      if (supported) {
        Linking.openURL(telURL);
      } else {
        Alert.alert("Error", "Unable to open dialer.");
      }
    })
    .catch((err) => console.error("Error opening dialer:", err));
};

export const openWebsite = (websiteURL) => {
  Linking.canOpenURL(websiteURL)
    .then((supported) => {
      if (supported) {
        Linking.openURL(websiteURL);
      } else {
        Alert.alert("Error", "Unable to open browser.");
      }
    })
    .catch((err) => console.error("Error opening website:", err));
};

export const uploadFileOnS3 = async (file) => {
  let splittedName = file.uri ? file.uri.split("/") : file.path.split("/");
  let extension = splittedName[splittedName.length - 1];
  let profileURI = {
    uri: file.uri ? file.uri : file.path,
    name: `image_${Math.floor(new Date().getTime())}.${extension}`,
    type: file?.mimeType ? file?.mimeType : "image/jpeg",
  };

  const formData = new FormData();
  formData.append("file", profileURI);
  let url = `${BASE_URL}${api.uploadFile}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = await response.json();

    if (response.ok && data?.url) {
      return data.url;
    } else {
      console.error("Error uploading file:", data);
    }
  } catch (error) {
    console.error("Error in upload:", error);
  }
};

const decodeAppleIdentityToken = (identityToken) => {
  try {
    const payload = identityToken.split(".")[1];

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding identity token:", error);
    return null;
  }
};

export const handleApple = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    if (!credential.identityToken) {
      throw new Error("Apple Sign-In failed - no identity token returned");
    }
    const decodedToken = decodeAppleIdentityToken(credential.identityToken);
    const userDataOutput = {
      identityToken: credential.identityToken,
      authorizationCode: credential.authorizationCode,
      email: credential.email, // Only available on first sign-in
      fullName: credential.fullName, // Only available on first sign-in
      user: credential.user, // Unique Apple user ID (always available)
    };
    return { userDataOutput, decodedToken };
    // signed in
  } catch (e) {
    if (e.code === "ERR_REQUEST_CANCELED" || e.code === "ERR_CANCELED") {
      // User canceled the sign-in flow
      console.log("User canceled Apple Sign-In");
      FlashAlert({
        type: "W", // Changed to Warning instead of Error
        title: "Sign-In Canceled",
        description: "You canceled the Apple Sign-In process",
      });
      return null;
    } else {
      // Actual error occurred
      console.error("Apple Sign-In Error:", e);
      FlashAlert({
        type: "E",
        title: "Sign-In Failed",
        description: e.message || "Unable to sign in with Apple",
      });
      return null;
    }
  }
};

// export const registerForPushNotificationsAsync = async () => {
//   console.log("🔔 Starting push notification setup...");

//   if (!Device.isDevice) {
//     console.warn("⚠️ Push notifications are not supported on emulators.");
//     return;
//   }

//   try {
//     let finalStatus = "undetermined";

//     // Step 1: Request notification permissions
//     if (Platform.OS === "android") {
//       const androidVersion = parseInt(Device.osVersion?.split(".")[0]) || 0;
//       console.log(`📱 Android version detected: ${androidVersion}`);

//       if (androidVersion >= 13) {
//         const { status } = await Notifications.getPermissionsAsync();
//         console.log("🔍 Existing Android notification permission:", status);

//         if (status !== "granted") {
//           const { status: newStatus } =
//             await Notifications.requestPermissionsAsync();
//           finalStatus = newStatus;
//           console.log("✅ New Android permission status:", finalStatus);
//         } else {
//           finalStatus = status;
//         }
//       } else {
//         console.log(
//           "✅ Android version < 13, assuming permissions are granted."
//         );
//         finalStatus = "granted";
//       }
//     } else {
//       const { status: existingStatus } =
//         await Notifications.getPermissionsAsync();
//       console.log("🔍 Existing iOS notification permission:", existingStatus);

//       if (existingStatus !== "granted") {
//         const { status: newStatus } =
//           await Notifications.requestPermissionsAsync();
//         finalStatus = newStatus;
//         console.log("✅ New iOS permission status:", finalStatus);
//       } else {
//         finalStatus = existingStatus;
//       }
//     }

//     if (finalStatus !== "granted") {
//       console.warn("❌ Notification permission not granted.");

//       Alert.alert(
//         "Permission Required",
//         "Push notifications require permission to keep you updated.",
//         [
//           { text: "Cancel", style: "cancel" },
//           { text: "Open Settings", onPress: () => Linking.openSettings() },
//         ]
//       );

//       return;
//     }

//     // Step 2: Get Expo Push Token
//     let pushTokenData = null;
//     const projectId =
//       Constants.expoConfig?.extra?.eas?.projectId ||
//       "258e68e9-fa6c-4525-a738-cc5e6f08ba50";

//     try {
//       if (Constants.appOwnership === "expo") {
//         console.log(
//           "🛠 Running inside Expo Go - fetching token without projectId..."
//         );
//         pushTokenData = (await Notifications.getExpoPushTokenAsync()).data;
//       } else {
//         console.log(
//           "🚀 Running inside a standalone app/dev client - fetching token with projectId..."
//         );
//         pushTokenData = (
//           await Notifications.getExpoPushTokenAsync({ projectId })
//         ).data;
//       }
//     } catch (tokenError) {
//       console.error("❗ Failed to get push token:", tokenError);
//     }

//     if (pushTokenData) {
//       console.log("🎯 Push Token retrieved successfully:", pushTokenData);
//       store.dispatch(deviceIdAndFCMToken(pushTokenData));
//     } else {
//       console.error(
//         "❗ Push token retrieval failed, falling back to dummy token."
//       );
//       store.dispatch(
//         deviceIdAndFCMToken("ExponentPushToken[fU04jdAClXMmeUhSt1JbIz]") // fallback token
//       );
//     }
//   } catch (error) {
//     console.error("🚨 Error during push notification setup:", error);
//     store.dispatch(
//       deviceIdAndFCMToken("ExponentPushToken[fU04jdAClXMmeUhSt1JbIz]") // fallback token
//     );
//   }
// };

export const UploadImageUrl = async (images, token, chat) => {
  console.log("token----------------token", images, token);
  try {
    if (!images || images.length === 0) {
      FlashAlert({ type: "E", title: "No images selected", description: "" });
      return [];
    }

    const uploadedUrls = [];

    for (let i = 0; i < images.length; i++) {
      const imageUri = images[i];
      const formdata = new FormData();

      formdata.append("file", {
        uri: imageUri,
        type: "image/jpeg", // assuming jpeg — you can enhance this if needed
        name: `image_${user?._id}`,
      });
      formdata.append("isChat", (chat && chat) || false);

      // console.log("Uploading file:", {
      //   uri: imageUri,
      //   type: "image/jpeg",
      //   name: `profile-upload-${i}-${user?._id}.jpg`,
      // });
      console.log(JSON.stringify(formdata), store.getState().userData.device);
      const response = await fetch(`${BASE_URL}${api.fileUploadKey}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Authorization
          Accept: "application/json", // Explicitly ask for JSON
          deviceToken: store.getState().userData.device,
        },
        body: formdata,
        ischat: chat,
      });
      // console.log(headers);
      const result = await response.json();
      console.log("Server Response:", result);
      const encodeKey = encodeURIComponent(result?.data?.key);
      console.log("-------------------------------", encodeKey);
      if (result?.success) {
        const body = {};
        await callApi(
          Method.GET,
          `${api.fileUpload}${encodeKey}`,
          body,
          (res) => {
            console.log("response file url", JSON.stringify(res));
            uploadedUrls.push(res?.url);
          },
          (err) => {
            console.log("error", err);
          }
        );
      } else {
        FlashAlert({
          type: "E",
          title: result?.message || "Failed to upload an image",
          description: "",
        });
      }
    }
    console.log("upload url return----->", uploadedUrls);
    return uploadedUrls;
  } catch (error) {
    FlashAlert({
      type: "E",
      title: error?.message || "Upload Error",
      description: "",
    });
    console.log("Error uploading images:", error);
    return [];
  }
};

export const fetchWeatherData = async (lat, lon) => {
  const apiKey = "c5bfa50bc3624056896114109250904"; // Replace with your key
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=5`;

  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      // console.log(response)
      const forecastDays = response.data.current.condition;

      return forecastDays;
    } else {
      throw new Error("Failed to load weather");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

// const helperAPI = async () => {
//   try {
//     const body = {};
//     const onSuccess = (res: any) => { };
//     const onError = (error: any) => { };
//     const endPoint = api.createProfile;
//     const method = Method.POST;

//     callApi(method, endPoint, body, onSuccess, onError);
//   } catch (error) {
//     console.log("Error during image uploads:", error);
//   }
// };

export const handleGoogleLogin = async () => {
  try {
    await GoogleSignin.signOut();
    await GoogleSignin?.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log(error);
      return null;
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log(error);
      return null;
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log(error);
      return null;
    } else {
      console.log(error);
    }
  }
};

export const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) return 'Good Morning';
  else if (currentHour < 18) return 'Good Afternoon';
  else return 'Good Evening';
};
