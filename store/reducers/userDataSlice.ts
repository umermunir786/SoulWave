import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  splash: null,
  user: {},
  token: null,
  refreshToken: null,
  isSurvey: false,
  login: false,
  isOnboarding: false,
  isRemember: false,
  device: null,
  unreadNotificationCount: 0,
  notificationPermission: null,
  socialLogin: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSplash: (state, action) => {
      state.splash = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload || {};
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    setRememberMe: (state, action) => {
      state.isRemember = action.payload;
    },
    setIsSurvey: (state, action) => {
      state.isSurvey = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setOnboarding: (state, action) => {
      state.isOnboarding = action.payload;
    },
    setDeviceInfo: (state, action) => {
      state.device = action.payload;
    },
    setUnreadNotificationCount: (state, action) => {
      state.unreadNotificationCount = action.payload ?? 0;
    },
    setNotificationPermission: (state, action) => {
      state.notificationPermission = action.payload; // true/false
    },
    setSocialLogin: (state, action) => {
      state.socialLogin = action.payload; // { provider, profile }
    },
    logout: (state) => {
      state.user = {};
      state.isSurvey = false;
      state.login = false;
      state.device = null;
      state.unreadNotificationCount = 0;
      state.socialLogin = null;
      state.isRemember = false;
    },
  },
});

export const {
  setSplash,
  setUser,
  setToken,
  setRememberMe,
  setIsSurvey,
  setLogin,
  setOnboarding,
  setDeviceInfo,
  setUnreadNotificationCount,
  setNotificationPermission,
  setSocialLogin,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
