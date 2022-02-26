import axios from "axios";
import { getData } from "./localStorage";

const refreshToken = getData('refreshToken');

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      //get new access token
      const { data } = await axios.post(
        "http://localhost:4200/renew-token",
        {
          token: refreshToken,
        }
      );
      prevRequest.headers['Authorization'] = `Bearer ${data.token}`;
      return prevRequest;
    }
    return Promise.reject(error);
  }
);