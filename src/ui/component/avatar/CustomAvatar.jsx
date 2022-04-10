import React from "react";
import { Avatar, Button, Dropdown, Menu, Space, Tag, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons/lib/icons";
import UserContext from "../../../service/context/UserContext";

const avatarMenu = (
  <Menu>
    <Menu.Item key="logout" danger>
      <LogoutOutlined /> Logout
    </Menu.Item>
  </Menu>
);

const CustomAvatar = () => {
  const user = React.useContext(UserContext);

  return (
    <>
      <Tag color="green">{user.user._role.name}</Tag>
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
