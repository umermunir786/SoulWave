export const Socket_URL = "https://api.circleukgroup.co.uk/";
export const BASE_URL = "https://soulwave.txdynamics.io/api/v1/";
// export const BASE_URL = "http://192.168.0.39:4500/api/v1/";
// export const BASE_URL = "https://777f0e1436de.ngrok-free.app/api/v1/";
export const WEB_CLIENT_ID =
  "841830590679-mn4gqbpreebgvja2v2es4vag64m33q3m.apps.googleusercontent.com";
// export const Socket_URL = "http://192.168.0.42:4600/";

export const api = {
  signup: BASE_URL + "auth/signup",
  verifyotp: BASE_URL + "auth/verify",
  signin: BASE_URL + "auth/login",
  forgotPassword: BASE_URL + "auth/forgotPassword",
  resetPassword: BASE_URL + "auth/resetPassword",
  updatePassword: BASE_URL + "user/update-password",
  deleteUser: BASE_URL + "user/verify-and-delete",
  resendOtp: BASE_URL + "auth/sendOTP",
  verifyOtpResetPassword: BASE_URL + "auth/verifyOTPResetPassword",
  updateProfile: BASE_URL + "user/update-me",
  socialLogin: BASE_URL + "auth/socialLogin",
  logout: BASE_URL + "auth/logout",
  upload: BASE_URL + "auth/upload",
  
  //playlists
  playlists: BASE_URL + "playlists",
  playlistsStats: BASE_URL + "playlists/stats",
  //subscription
  verifySubscription: BASE_URL + "subscription/verify-subscription",
  
  //meditation
  getMeditations: BASE_URL  + "meditations/category"
};
