import axios from "axios";
import { toast } from "react-toastify";
import AuthForm from "./authForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setSubmitting(true);
      await axios.post(
        'http://localhost:4200/register',
        values
      );
      setSubmitting(false);
        toast.success(
          `Register successful! Redirecting you to Login...`
        );
        setTimeout(() => {
          navigate('/login');
        }, 3000)
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
      operation="register"
      submitting={submitting}
    />
  );
};

export default Register;
