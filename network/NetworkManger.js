import { store } from "@/store/store";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { router } from "expo-router";
import { logout, setToken } from "../store/reducers/userDataSlice";
import { api, BASE_URL } from "./Environment";
import { FlashAlert } from "@/components";

export const AUTHORIZE = "AUTHORIZE";
export const NETWORK_ERROR = "NETWORK ERROR";

export const Method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const Status = {
  SUCCESS: 200,
  ERROR: 400,
  AUTHENTICATION_FAIL: 401,
  NOT_FOUND: 400,
};

const getDeviceId = () => {
  // Implement or import this if used
  return "device-id-placeholder";
};
const isNetworkAvailable = async () => {
  const response = await NetInfo.fetch();

  return response.isConnected;
};

const getAuthSlice = () => {
  const state = store.getState();
  return state?.userData ?? state?.user ?? {};
};

const fullUrl = (endPoint) =>
  /^https?:\/\//i.test(endPoint)
    ? endPoint
    : `${BASE_URL}${endPoint.replace(/^\//, "")}`;

export const callApi = async (
  method,
  endPoint,
  bodyParams,
  onSuccess,
  onError,
  accessToken,
  multipart,
  _isRetry
) => {
  const online = await isNetworkAvailable();
  if (!online) {
    onError("No Internet Connection!");
    return;
  }
  console.log(
    "method->",
    method,
    "endPoint->",
    endPoint,
    "bodyParams->",
    bodyParams
  );
  const {
    token: tokenFromStore,
    refreshToken: refreshFromStore,
    fcmToken,
  } = getAuthSlice();
  const token = accessToken ?? tokenFromStore ?? null;
  const refreshToken = refreshFromStore ?? null;

  const headers = {
    Accept: "application/json",
  };

  if (!multipart) headers["Content-Type"] = "application/json";
  if (multipart) headers["Content-Type"] = "multipart/form-data";

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = fullUrl(endPoint);

  try {
    const res = await axios.request({
      url,
      method,
      headers,
      ...(method === "GET" || method === "DELETE"
        ? {}
        : { data: multipart ? bodyParams : bodyParams ?? undefined }),
      timeout: 30000,
    });

    onSuccess(typeof res.data === "undefined" ? null : res.data);
  } catch (e) {
    const err = e;

    const status = err.response?.status;
    const msg = err.response?.data?.message;
    console.log("status", status, msg);
    const shouldRefresh = status === 401 && !_isRetry && refreshToken;

    if (shouldRefresh) {
      try {
        const refreshEndpoint = `${BASE_URL}auth/refresh/${refreshToken}`;

        const refreshRes = await axios.post(
          refreshEndpoint,
          {
            refreshToken: refreshToken,
            device: {
              deviceToken: "123456",
              id: "123456",
            },
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            timeout: 30000,
          }
        );
        console.log(
          "refreshRes-----------------------------------",
          refreshRes
        );
        const newAccessToken = refreshRes.data?.data?.accessToken;
        console.log(
          "newAccessToken------------------------->>>>>>>>>>",
          newAccessToken
        );
        if (!newAccessToken) {
          onError(refreshRes.data ?? "Failed to refresh token");
          return;
        }

        store.dispatch(
          setToken({
            token: newAccessToken,
            refreshToken: refreshToken,
          })
        );

        await callApi(
          method,
          endPoint,
          bodyParams,
          onSuccess,
          onError,
          newAccessToken,
          multipart,
          true
        );
        return;
      } catch (refreshErr) {
        onError(
          refreshErr?.response?.data ??
            refreshErr.message ??
            "Token refresh failed"
        );
        console.log("yhor worked........", refreshErr?.response?.data?.status);
        if (
          refreshErr?.response?.data?.status === 403
        ) {
          store.dispatch(logout());
          router.replace({ pathname: "/auth/SignIn" });
          FlashAlert({
            type: "E",
            title: "Session Expired",
            description: "Please login again",
          });
        }
        return;
      }
    }

    onError(err.response?.data ?? err.message ?? err);
  }
};
