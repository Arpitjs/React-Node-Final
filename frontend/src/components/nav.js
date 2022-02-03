import { Menu } from "antd";
import { SettingOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { SubMenu } = Menu;

const Nav = () => {
  const [current, setCurrent] = useState("mail");
  const navigate = useNavigate();
  const data = useSelector(state => state.auth);

  const handleClick = (e) => setCurrent(e.key);
  
  const handleNavigation = (dest) => navigate(dest);

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="mail" icon={<MailOutlined />} onClick={() => handleNavigation("/create")}>
        Create Contact
      </Menu.Item>

      <SubMenu key="SubMenu" icon={<SettingOutlined />} title={data.email.split("@")[0]}>
        <Menu.ItemGroup title="Actions">
          <Menu.Item key="setting:1" onClick={() => handleNavigation("/logout")}>
            Logout
          </Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
};

export default Nav;
