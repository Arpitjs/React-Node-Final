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
import { useDispatch } from "react-redux";
// import { tokenProcess } from "../../utils/tokenProcess";
import { toastErrors } from "../../utils/toastErrors";
const { EXPAND_COLUMN } = Table;

const ViewContacts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  
  const user = getData("user");
  const [currentUser, setCurrentUser] = useState({});
  const [contacts, setContacts] = useState([]);
  const iconStyle = { fontSize: "120%" };

  useEffect(() => {
    setCurrentUser(user);
    fetchData();
  }, []);

  const fetchData = async () => {
    // const token = await tokenProcess(setAuthToken);
    try {
        const { data } = await axios.get(
          process.env.REACT_APP_API,
         options(getData('token'))
        );
        dispatch({
          type: "LIST_OF_CONTACTS",
          payload: data.allContacts,
        });

        const exists = data.allContacts.filter((c) =>
          c.favorites.includes(user._id) ? true : false
        );
        const doesntExist = data.allContacts.filter((c) =>
          !c.favorites.includes(user._id) ? true : false
        );
        setContacts([...exists, ...doesntExist]);
    } catch (e) {
      toastErrors(e.response.data);
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
      width: '1%',
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
      width: '10%',
      key: "address",
    },
    {
      title: "Country",
      dataIndex: "country",
      align: "center",
      key: "country",
    },
    {
      title: "Favorite",
      align: "center",
      key: "favorite",
      render: (val) =>
        val.favorites.includes(currentUser._id) ? (
          <HeartFilled
            onClick={() => handleUnfavorite(val)}
            style={{ ...iconStyle, color: "#e75480" }}
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
            <DeleteOutlined
              onClick={() => handleDelete(val)}
              style={{ ...iconStyle, marginRight: "30px" }}
            />

            <EditOutlined
              onClick={() => navigate(`/edit/${val.slug}`)}
              style={iconStyle}
            />
        </>
      ),
    },
  ];

  async function handleDelete(val) {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/${val.slug}`,
        options(getData('token'))
      );
      fetchData();
      toast.success("Contact deleted successfully.");
    } catch (e) {
      toastErrors(e.response.data);
    }
  }

  async function handleFavorite(val) {
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/favorite-contact`,
        val,
        options(getData('token'))
      );
      fetchData();
      toast.success(`you have favorited ${val.name}'s contact.`);
    } catch (e) {
      toastErrors(e.response.data);
    }
  }

  async function handleUnfavorite(val) {
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/unfavorite-contact`,
        val,
        options(getData('token'))
      );
      fetchData();
      toast.success(`you have unfavorited ${val.name}'s contact.`);
    } catch (e) {
      toastErrors(e.response.data);
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
