import { getData } from "./localStorage";
import { checkJWTValid } from "./newAccessToken";

const token = getData("token");
const refreshToken = getData('refreshToken');

export const tokenProcess = async (setAuthToken) => {
    const newAccessToken = await checkJWTValid(token, refreshToken);
    newAccessToken ? setAuthToken(newAccessToken) : setAuthToken(token);
    console.log('token', token);
    console.log('new access token', newAccessToken);
    return newAccessToken ? newAccessToken : token;
  }