import { Outlet, Navigate } from "react-router-dom";
import { getData } from "../../utils/localStorage";

const Auth = () => {
  const result = getData('user');
    return result && result.token ? <Outlet /> : <Navigate to="/login" />;
};

export default Auth;
