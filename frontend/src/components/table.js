import { Table } from "antd";
import { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Nav from "./nav";
import axios from "axios";
import { toast } from "react-toastify";
import { getData } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import options from "../utils/options";

const TableComponent = () => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [contacts, setContacts] = useState([]);

  const iconStyle = { fontSize: '120%'};

  useEffect(() => {
    const { token, user } = getData("user");
    setAuthToken(token);
    setCurrentUser(user);
    fetchData();
  }, [authToken]);

  const fetchData = async () => {
    try {
      if (authToken) {
        const { data } = await axios.get("http://localhost:4200/api/contact", options(authToken));
        setContacts(data.allContacts);
      }
    } catch (e) {
      console.log(e);
      toast(e.response.data.err.msg);
    }
  };

  const columns = [
    {
      title: "Image",
      width: "15px",
      align: "center",
      key: "image",
      dataIndex: "image",
      render: (image) => (
        <img src={image ? image.url : "../public/default.jpg" } />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15px",
      align: "center",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      align: "center",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      align: "center",
      key: "address",
    },
    {
      title: "Favorite",
      align: "center",
      key: "favorite",
      render: (val) =>
        val.favorites.includes(currentUser._id)  ? (
          <HeartFilled onClick={() => handleUnfavorite(val)} style={iconStyle}/>
        ) : (
          <HeartOutlined onClick={() => handleFavorite(val)} style={iconStyle}/>
        ),
    },

    {
      title: "Actions",
      align: "center",
      key: "actions",
      render: (val) => (
        <>
        <DeleteOutlined onClick={() => handleDelete(val)} style={{...iconStyle, marginRight: '30px'}}/>
        
        <EditOutlined onClick={() => navigate(`/edit/${val.slug}`)} style={iconStyle}/>
        </>
      ),
    }
  ];

  async function handleDelete(val) {
    try {
      setContacts(contacts.filter((contact) => contact._id !== contact._id));
      await axios.delete(`http://localhost:4200/api/contact/${val.slug}`, options(authToken));
      toast.success("Contact deleted successfully.");
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.err.msg);
    }
  }

  async function handleFavorite(val) {
    try {
      await axios.post("http://localhost:4200/api/contact/favorite-contact", val, options(authToken));
      fetchData();
      toast.success("you have favorited this contact.");
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUnfavorite(val) {
    try {
      await axios.post("http://localhost:4200/api/contact/unfavorite-contact", val, options(authToken));
      fetchData();
      toast.success("you have unfavorited this contact.");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Nav />
      <Table
        columns={columns}
        dataSource={contacts}
        pagination={false}
        rowKey={(contacts) => contacts._id}
      />
    </>
  );
};

export default TableComponent;
