import { Table } from "antd";
import { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Nav from "../Nav";
import axios from "axios";
import { toast } from "react-toastify";
import { getData } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import options from "../../utils/options";
import { useDispatch, useSelector } from "react-redux";
import { tokenProcess } from "../../utils/tokenProcess";
const { EXPAND_COLUMN } = Table;

const ViewContacts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contactsFromRedux = useSelector((state) => state.contacts);

  const user = getData("user");

  const [authToken, setAuthToken] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [contacts, setContacts] = useState([]);
  const iconStyle = { fontSize: "120%" };

  useEffect(() => {
    setCurrentUser(user);
    fetchData();
  }, [authToken]);

  const fetchData = async () => {
    const token = await tokenProcess(setAuthToken);
    try {
      if (authToken) {
        const { data } = await axios.get(
          process.env.REACT_APP_API,
          options(token)
        );
        dispatch({
          type: "LIST_OF_CONTACTS",
          payload: data.allContacts,
        });
        const exists = data.allContacts.filter(c => c.favorites.includes(user._id) ? true : false);

        const doesntExist = data.allContacts.filter(c => !c.favorites.includes(user._id) ? true : false);

        setContacts([...exists, ...doesntExist]);
      }
    } catch (e) {
      console.log(e);
      toast(e.response.data.err.msg);
    }
  };

  const columns2 = [
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Work",
      dataIndex: "work",
      key: "work",
    },
    {
      title: "Home",
      dataIndex: "home",
      key: "home",
    },
  ];

  const columns = [
    {
      title: "Image",
      width: "15px",
      align: "center",
      key: "image",
      dataIndex: "image",
      render: (image) => (
        <img
          src={
            image ? image.url : process.env.PUBLIC_URL + "/images/default.png"
          }
          alt="profile_pic"
        />
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
      title: "Contact Number",
      dataIndex: ["contactNumber", "0", "mobile"],
      align: "center",
      key: "mobile",
    },
    EXPAND_COLUMN,
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
        val.favorites.includes(currentUser._id) ? (
          <HeartFilled
            onClick={() => handleUnfavorite(val)}
            style={iconStyle}
          />
        ) : (
          <HeartOutlined
            onClick={() => handleFavorite(val)}
            style={iconStyle}
          />
        ),
    },

    {
      title: "Actions",
      align: "center",
      key: "actions",
      render: (val) => (
        <>
          {val.createdBy === user._id && (
            <DeleteOutlined
              onClick={() => handleDelete(val)}
              style={{ ...iconStyle, marginRight: "30px" }}
            />
          )}

          {val.createdBy === user._id && (
            <EditOutlined
              onClick={() => navigate(`/edit/${val.slug}`)}
              style={iconStyle}
            />
          )}
        </>
      ),
    },
  ];

  async function handleDelete(val) {
    try {
      const token = await tokenProcess(setAuthToken);
      await axios.delete(
        `${process.env.REACT_APP_API}/${val.slug}`,
        options(token)
      );
      fetchData();
      toast.success("Contact deleted successfully.");
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.err.msg);
    }
  }

  async function handleFavorite(val) {
    const token = await tokenProcess(setAuthToken);
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/favorite-contact`,
        val,
        options(token)
      );
      fetchData();
      toast.success(`you have favorited ${val.name}'s contact.`);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.err.msg);
    }
  }

  async function handleUnfavorite(val) {
    const token = await tokenProcess(setAuthToken);
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/unfavorite-contact`,
        val,
        options(token)
      );
      fetchData();
      toast.success(`you have unfavorited ${val.name}'s contact.`);
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
        expandable={{
          expandedRowRender: (record) => (
            <Table
              bordered={true}
              columns={columns2}
              pagination={false}
              size="small"
              dataSource={record.contactNumber}
              rowKey={(contacts) => contacts._id}
            />
          ),
        }}
      />
    </>
  );
};

export default ViewContacts;
