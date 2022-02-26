import { Menu } from "antd";
import { SettingOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {parseName} from "../utils/parseName";
import { getData, removeData } from "../utils/localStorage";

const { SubMenu } = Menu;

const Nav = () => {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const user = getData('user')
    setEmail(user.email);
  }, []);

  const [current, setCurrent] = useState("mail");
  const navigate = useNavigate();
  const handleClick = (e) => setCurrent(e.key);
  
  const handleLogout = () => {  
      removeData('user');
      removeData('token');
      removeData('refreshToken');
      navigate('/');
  }

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="mail" icon={<MailOutlined />}>
        All Contacts
      </Menu.Item>

      <Menu.Item key="plus" icon={<PlusOutlined />} onClick={() => navigate('/create')}>
        Create Contact
      </Menu.Item>
      <SubMenu key="SubMenu" icon={<SettingOutlined />} title={email ? parseName(email) : ''}>
        <Menu.ItemGroup title="Actions">
          <Menu.Item key="setting:1" onClick={() => handleLogout()}>
            Logout
          </Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
};

export default Nav;
