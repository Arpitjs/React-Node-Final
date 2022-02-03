import axios from "axios";
import { toast } from "react-toastify";
import AuthForm from "./authForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      await axios.post(
        "http://localhost:4200/register",
        values
      );
        toast.success(
          `Register successful! Redirecting you to Login...`
        );
        setTimeout(() => {
          navigate('/login');
        }, 3000)
    } catch (e) {
      toast.error(e.response.data.msg);
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
    />
  );
};

export default Register;
