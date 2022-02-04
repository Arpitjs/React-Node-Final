import { Table } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, HeartOutlined } from "@ant-design/icons";
import Nav from './nav';
import axios from 'axios';
import { toast } from "react-toastify";
import { getData } from "../utils/localStorage";

const TableComponent = () => {
  const [authToken, setAuthToken] = useState('');
  const [contacts, setContacts] = useState([{
    name: "",
    address: "",
    image: "",
    phone: "",
    country: "",
    married: ""
  }]);
 
  useEffect(() => {
    const { token } = getData('user');
    setAuthToken(token);
    fetchData();
  }, [authToken]);

  const fetchData = async () => {
    try {
      if(authToken) {
        const { data } = await axios.get('http://localhost:4200/api/contact', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        })
      setContacts(data.allContacts);
      }
    } catch (e) {
      console.log(e);
      toast(e.response.data.err.msg);
    }
  }

  const columns = [
    {
      title: "Image",
      width: "15px",
      align: 'center',
      key: 'image',
      dataIndex: "image",
      render: (image) => (
          <img src={image ? image.url : '../public/default.jpg' } />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      align: 'center',
      key: 'name'

    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15px",
      align: 'center',
      key: 'email'
    },
    {
      title: "Phone",
      dataIndex: "phone",
      align: 'center',
      key: 'phone'
    },
    {
      title: "Address",
      dataIndex: "address",
      align: 'center',
      key: 'address'
    },
    {
      title: "Favorite",
      align: 'center',
      key: 'favorite',
      render: () => <HeartOutlined />,
    },

    {
      title: "Delete",
      align: 'center',
      key: 'delete',
      render: (val) => <DeleteOutlined onClick={() => handleDelete(val)} />,
    },
    {
      title: "Edit",
      align: 'center',
      key: 'edit',
      render: () => <EditOutlined />,
    }
  ];

  function handleDelete(val) {
    setContacts(contacts.filter((el) => el._id !== val._id));
  }
  return (
    <>
    <Nav/>
  <Table columns={columns} dataSource={contacts} pagination={false} rowKey={contacts => contacts._id}/>
  </>
  );
};

export default TableComponent;


