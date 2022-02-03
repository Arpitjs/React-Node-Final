import { Outlet, Navigate } from "react-router-dom";
import  { useSelector } from 'react-redux';

const Auth = () => {
const data = useSelector(state => state.auth);
  return data ? <Outlet /> : <Navigate to="/login" />;
};

export default Auth;
