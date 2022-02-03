import axios from "axios";
import { toast } from "react-toastify";
import AuthForm from "./authForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      setSubmitting(true);
      const { data } = await axios.post("http://localhost:4200/login", values);
      setSubmitting(false);
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: data.user.email,
          token: data.token
        }
      })
      toast.success( 
        `Login successful! Welcome ${data.user.email.split("@")[0]}`
      );
      setTimeout(() => {
        navigate("/contacts");
      }, 3000);
      
    } catch (e) {
      console.log(e.response.data);
      setSubmitting(false);
      toast.error(e.response.data.err.msg);
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
