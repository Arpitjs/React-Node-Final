import { Outlet, Navigate } from "react-router-dom";
import { getData } from "../utils/localStorage";
import { UserContext } from "../context";
import { useContext, useState, useEffect } from "react";

const Auth = () => {
  const [ok, setOk] = useState(false)
  const [state] = useContext(UserContext)
  
  useEffect(() => {
    if (state && state.token) setOk(true);
  }, [state && state.token])

  return ok ? <Outlet /> : <Navigate to="/login" />;
};

export default Auth;
