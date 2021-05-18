import axios from "axios";
import { getCookie } from "../utils/cookies";

//App Settings
import { fullApiUrl } from "../utils/NetworkSettings";

const AxiosConfig = axios.create({
  baseURL: fullApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosConfig.interceptors.request.use(
  (config) => {
    let token = getCookie("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosConfig.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

export default AxiosConfig;
