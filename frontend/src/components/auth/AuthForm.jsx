import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ onFinish, onFinishFailed, operation, submitting }) => {
  const navigate = useNavigate();
  const info = {
    display: "flex",
    justifyContent: "center",
    margin: "50px 0px",
  };

  return (
    <>
      <div style={info}>
        <h1>Please {operation} here</h1>
      </div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            {submitting ? "Submitting" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
      <Button
        type="link"
        onClick={() => navigate("/")}
        style={{ position: "absolute", top: "400px", left: "300px" }}
      >
        Go Back
      </Button>
    </>
  );
};

export default AuthForm;
