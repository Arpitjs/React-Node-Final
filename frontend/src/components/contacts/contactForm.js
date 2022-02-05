import { Form, Select, Input, Radio, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getData } from "../../utils/localStorage";

const { Option } = Select;

const wrapper = { margin: "50px 0px 0px 300px" };
const info = { margin: "10px 0px 20px 300px" };

const ContactForm = ({ slug, method, operation, validate }) => {
  const [authToken, setAuthToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const { token } = getData("user");
    setAuthToken(token);
    getAllCountries();
  }, [authToken, countries]);

  const getAllCountries = async () => {
    try {
      const { data } = await axios.get("https://restcountries.com/v3.1/all");
      const allCountries = data.map((c) => c.name.common);
      setCountries(allCountries.sort());
    } catch (e) {
      console.log(e);
    }
  };

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 6,
    },
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const onFinish = async (values) => {
    try {
      let url = "";
      method === "post"
        ? (url = "http://localhost:4200/api/contact")
        : (url = `http://localhost:4200/api/contact/${slug}`);
      if (authToken) {
        setSubmitting(true);
        await axios({
          method,
          url,
          data: values,
          headers: { Authorization: `Bearer ${authToken}` },
        });

        setSubmitting(false);
        toast.success(`Your record has been ${operation.toLowerCase()}ed.`);
        setTimeout(() => navigate("/contacts"), 3000);
      }
    } catch (e) {
      console.log(e);
      setSubmitting(false);
      toast.error(e.response.data.err.msg);
    }
  };

  return (
    <div style={wrapper}>
      <h1 style={info}>{operation} Your Details</h1>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          "input-number": 3,
          "checkbox-group": ["A", "B"],
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: validate ? true : false,
              message: validate ? "Please input your name!" : "",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: validate ? true : false,
              message: validate ? "Please input your email!" : "",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: validate ? true : false,
              message: validate ? "Please input your phone!" : "",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="country"
          label="Country"
          rules={[
            {
              required: validate ? true : false,
              message: validate ? "Please input your country!" : "",
            },
          ]}
          hasFeedback
        >
          <Select placeholder="Please select a country">
            {countries.map((name) => (
              <Option key={Math.random() * 100} value={name}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: validate ? true : false,
              message: validate ? "Please input your address!" : "",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="gender" label="Gender">
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="prefer not to say">Prefer not to say</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="image"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        {/* <Form.Item label="Dragger">
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger name="files">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item> */}

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={() => navigate('/contacts')}>Go Back</Button>
    </div>
  );
};

export default ContactForm;
