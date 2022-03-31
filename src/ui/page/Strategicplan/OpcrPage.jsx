import React from "react";
import { Table, Row, Col, Input, Button, Space } from "antd";
import { SendOutlined, PlusOutlined } from "@ant-design/icons";
import TableActions from "../../component/action/TableActions";

const dataSource = [
  {
    mfo: "sample",
    type: "sample",
  },
];

const column = [
  {
    title: "Major Final Output",
    dataIndex: "mfo",
    key: "mfo",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Details",
    dataIndex: "details",
    key: "details",
    width: 100,
    render: (data, record) => {
      return <Button>View Details</Button>;
    },
  },
  {
    title: "Actions",
    fixed: "right",
    width: 100,
    render: (data, record) => {
      return <TableActions hasDelete />;
    },
  },
];

const OpcrPage = () => {
  return (
    <>
      <div className="base-container">
        <Row justify="space-between">
          <Col>
            <Input.Search />
          </Col>
          <Col>
            <Space>
              <Button
                type="primary"
                //onClick={_handleAddButtonClick}
                icon={<SendOutlined />}
              >
                Send Approval
              </Button>

              <Button
                type="primary"
                //onClick={_handleAddButtonClick}
                icon={<PlusOutlined />}
              >
                Add Strategic Plan
              </Button>
            </Space>
          </Col>
        </Row>
        <br />
        <Table columns={column} dataSource={dataSource} />
      </div>
    </>
  );
};

export default OpcrPage;
