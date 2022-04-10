import React from "react";
import { Avatar, Button, Dropdown, Menu, Space, Tag, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons/lib/icons";
import UserContext from "../../../service/context/UserContext";
import { useNavigate } from "react-router-dom";

const CustomAvatar = () => {
  const navigate = useNavigate();
  const user = React.useContext(UserContext);

  const _logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const _handleClick = (e) => {
    if (e.key === "logout") _logout();
  };

  const avatarMenu = (
    <Menu onClick={_handleClick}>
      <Menu.Item key="logout" danger>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Tag color="green">{user.user._level.name}</Tag>
      <Dropdown
        arrow
        placement="bottomCenter"
        overlay={avatarMenu}
        trigger={["click"]}
      >
        <Button type="text" style={{ height: "100%" }}>
          <Space size="small">
            <Avatar>{user.user.username.charAt(0)}</Avatar>
            <Typography.Text strong>{user.user.username}</Typography.Text>
          </Space>
        </Button>
      </Dropdown>
    </>
  );
};

export default CustomAvatar;
