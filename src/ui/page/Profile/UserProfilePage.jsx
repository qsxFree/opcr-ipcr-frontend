import React, { useContext } from "react";
import { Descriptions, Typography, Tag, PageHeader } from "antd";
import NavigatorContext from "../../../service/context/NavigatorContext";
import UserContext from "../../../service/context/UserContext";

const UserProfilePage = () => {
  const navigatorContext = useContext(NavigatorContext);
  navigatorContext.setSelectedKey("profile");
  const user = React.useContext(UserContext);
  const userData = user.user;

  return (
    <>
      <PageHeader
        avatar={{
          icon: userData.username.charAt(0),
          size: "large",
        }}
        title={userData.username}
        tags={<Tag color="green">{userData._level.name}</Tag>}
      />

      <div className="base-container">
        <Descriptions
          title="Information"
          bordered={true}
          layout="horizontal"
          column={1}
          // extra={
          //   <Button icon={<EditOutlined />} type="primary">
          //     Edit
          //   </Button>
          // }
        >
          <Descriptions.Item label="Name">
            {userData._employee_profile.name}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            <Tag color="orange">{userData._role.name}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Office">
            <Typography.Text>
              <Typography.Text strong>{userData._office.code}</Typography.Text>{" "}
              - {userData._office.name}
            </Typography.Text>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
};

export default UserProfilePage;
