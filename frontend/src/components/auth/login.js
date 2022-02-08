import axios from "axios";
import { toast } from "react-toastify";
import AuthForm from "./AuthForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setData } from "../../utils/localStorage";
import { parseName } from "../../utils/parseName";
import { toastErrors } from "../../utils/toastErrors";

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      setSubmitting(true);
      const { data } = await axios.post(
        'http://localhost:4200/login',
        values
      );
      setSubmitting(false);
      setData("user", data.user);
      setData("token", data.token);
      setData("refreshToken", data.refreshToken);
      dispatch({
        type: "LOGGED_IN_USER",
        payload: data,
      });
      toast.success(`Login successful! Welcome ${parseName(data.user.email)}`);
      setTimeout(() => navigate("/contacts"), 3000);
    } catch (e) {
      setSubmitting(false);
      toastErrors(e.response.data);
    }
  };

  const onFinishFailed = (errorInfo) => {
    errorInfo.errorFields.forEach((error) => toast(error.errors.join("")));
  };

  return (
    <AuthForm
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      operation="login"
      submitting={submitting}
    />
  );
};

export default Login;
