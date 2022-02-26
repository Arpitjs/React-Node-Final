import axios from "axios";
import { getData } from "./localStorage";

const axiosConfigurations = () => {
  const token = getData("token");
  const rfToken = getData("refreshToken");

  axios.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${token}`;
        config.headers["x-refresh"] = rfToken;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default axiosConfigurations;
