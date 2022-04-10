import React, { useContext } from "react";
import {
  Descriptions,
  Avatar,
  Typography,
  Space,
  Tag,
  Button,
  Row,
  Col,
} from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import NavigatorContext from "../../../service/context/NavigatorContext";

const UserProfilePage = () => {
  const { Title } = Typography;
  const navigatorContext = useContext(NavigatorContext);
  navigatorContext.setSelectedKey("profile");

  return (
    <>
      <div className="base-container">
        <Space align="center" size="large" direction="horizontal">
          <Row gutter={10} align="middle">
            <Col>
              <Avatar size={64} icon={<UserOutlined />} />
            </Col>
            <Col>
              <Title level={3} style={{ paddingTop: "6px" }}>
                Adrian Rodriguez
              </Title>
            </Col>
            <Col>
              <Tag color="blue">Admin</Tag>
            </Col>
          </Row>
        </Space>
      </div>

      <div className="base-container">
        <Descriptions
          title="User Profile"
          bordered={true}
          layout="horizontal"
          column={1}
          extra={
            <Button icon={<EditOutlined />} type="primary">
              Edit
            </Button>
          }
        >
          <Descriptions.Item label="UserName:">
            Adrian Rodriguez
          </Descriptions.Item>
          <Descriptions.Item label="Password:">Secret</Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
};

export default UserProfilePage;
