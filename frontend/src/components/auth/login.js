import axios from "axios";
import { toast } from "react-toastify";
import AuthForm from "./authForm";

const Login = () => {
  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4200/login",
        values
      );
      console.log(data);
        toast.success(
          `Login successful! Welcome ${data.user.email.split("@")[0]}`
        );
    } catch (e) {
        console.log(e.response.data);
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
      operation="login"
    />
  );
};

export default Login;
