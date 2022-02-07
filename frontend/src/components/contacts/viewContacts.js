import { Table } from "antd";
import { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Nav from "../nav";
import axios from "axios";
import { toast } from "react-toastify";
import { getData } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import options from "../../utils/options";
import { useDispatch, useSelector } from "react-redux";
import { checkJWTValid } from "../../utils/newAccessToken";
const { EXPAND_COLUMN } = Table;

const TableComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contactsFromRedux = useSelector(state => state.contacts);

  const [authToken, setAuthToken] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [contacts, setContacts] = useState([]);
  const iconStyle = { fontSize: "120%" };

  useEffect(() => {
    const token = getData("token");
    const refreshToken = getData('refreshToken');
    const user = getData("user");
    const tokenProcess = async () => {
      const newAccessToken = await checkJWTValid(token, refreshToken);
      newAccessToken ? setAuthToken(newAccessToken) : setAuthToken(token);
    }
    setCurrentUser(user);
    fetchData();
    tokenProcess();
  }, [authToken]);

  const fetchData = async () => {
    try {
      if (authToken) {
        const { data } = await axios.get(
          process.env.REACT_APP_API,
          options(authToken)
        );
        dispatch({
          type: "LIST_OF_CONTACTS",
          payload: data.allContacts,
        });
        setContacts(data.allContacts);
        console.log('contacts in state', contactsFromRedux);
        // setContacts(contactsFromState);
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
      dataIndex: ['contactNumber', '0', 'mobile'],
      align: "center",
      key: "contact number",
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
      setContacts(contacts.filter((contact) => contact._id !== val._id));
      await axios.delete(
        `${process.env.REACT_APP_API}/${val.slug}`,
        options(authToken)
      );
      toast.success("Contact deleted successfully.");
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.err.msg);
    }
  }

  async function handleFavorite(val) {
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/favorite-contact`,
        val,
        options(authToken)
      );
      fetchData();
      toast.success(`you have favorited ${val.name}'s contact.`);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUnfavorite(val) {
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/unfavorite-contact`,
        val,
        options(authToken)
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
        rowKey={contacts => contacts._id}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              bordered={true}
              columns={columns2}
              pagination={false}
              size="small"
              dataSource={record.contactNumber}
              rowKey={contacts => contacts._id}
            />
          ),
        }}
      />
    </>
  );
};

export default TableComponent;
