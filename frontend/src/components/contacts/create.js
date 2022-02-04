import {
  Form,
  Select,
  Input,
  Radio,
  Button,
  Upload,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getData } from "../../utils/localStorage";

const { Option } = Select;

const wrapper = {margin: "50px 0px 0px 300px"};
const info = { margin: "10px 0px 20px 300px"};

const Create = () => {
  const [authToken, setAuthToken] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const { token } = getData('user');
    setAuthToken(token);
    getAllCountries();
  }, [authToken, countries]);

  const getAllCountries = async () => {
    try {
      const { data } = await axios.get('https://restcountries.com/v3.1/all');
      const allCountries = data.map(c => c.name);
      setCountries(allCountries);
    } catch (e) {
      console.log(e);
    }
  }

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
      if(authToken) {
      setSubmitting(true);
      await axios.post(
        "http://localhost:4200/api/contact",
        values,
         {
    headers: {
      Authorization: `Bearer ${authToken}`
    },
  }
      );
      setSubmitting(false);
      toast.success('Your record has been saved.');
      setTimeout(() => navigate('/contacts'), 3000)
      }
    } catch (e) {
      console.log(e.response.data);
      setSubmitting(false);
      toast.error(e.response.data.err.message);
    }

  };

  return (
    <div style={wrapper}>
      <h1 style={info}>Fill Your Details</h1>
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
            required: true,
            message: "Please input your name!",
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
            required: true,
            message: "Please input your phone!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="country"
        label="Country"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please select your country!",
          },
        ]}
      >
        <Select placeholder="Please select a country">
         { countries.map(c => <Option key={c.common} value={c.common}>{c.common}</Option>) }
        </Select>
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: "Please input your address!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="married" label="Married">
        <Radio.Group>
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
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
          { submitting ? 'Submitting...' : 'Submit' }
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Create;
