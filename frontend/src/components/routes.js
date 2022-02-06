import { Outlet, Navigate } from "react-router-dom";
import { getData } from "../utils/localStorage";

const Auth = () => {
  const token = getData("token");

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default Auth;
