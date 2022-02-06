import axios from "axios";
import { setData } from "./localStorage";
import { toast } from 'react-toastify';

async function renewAccessToken(refreshToken) {
  try {
    const { data } = await axios.post("http://localhost:4200/renew-token", {
      token: refreshToken,
    });
    return data.token;
  } catch (e) {
    toast.warning('token expired. you need to login again!');
  }
}

export const checkJWTValid = async (accessToken, refreshToken) => {
    const { data } = await axios.post("http://localhost:4200/check-jwt-valid", {
      token: accessToken,
    });
    if (data.msg === "ok") return;   
    const newAccessToken = await renewAccessToken(refreshToken);
    setData("token", newAccessToken);
    return newAccessToken;
};
