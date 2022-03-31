import React from "react";
import { Table, Row, Col, Input, Button, Space } from "antd";
import { SendOutlined, PlusOutlined } from "@ant-design/icons";
import TableActions from "../../component/action/TableActions";
const dataSource = [
  {
    name: "sample",
    description: "sample",
    year: "sample",
  },
];

const column = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
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
const MfoPage = () => {
  return (
    <>
      <div className="base-container">
        <Row justify="space-between">
          <Col>
            <Input.Search />
          </Col>
          <Col>
            <Button
              type="primary"
              //onClick={_handleAddButtonClick}
              icon={<PlusOutlined />}
            >
              Add MFO
            </Button>
          </Col>
        </Row>
        <br />
        <Table columns={column} dataSource={dataSource} />
      </div>
    </>
  );
};

export default MfoPage;
