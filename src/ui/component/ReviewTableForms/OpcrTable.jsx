import React from "react";
import { Table, Input, Button, Upload, Tag, Space, Tooltip } from "antd";
import {
  UploadOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
};
const { Search } = Input;

const dataSource = [
  {
    key: "data1",
    date: "10/16/2022",
    department: (
      <div>
        <Tag color="geekblue">Institute of Computer Studies</Tag>
      </div>
    ),
    name: "Jocelyn Torio",
    formname: "OPCR_Kwan",
  },
  {
    key: "data2",
    date: "10/25/2022",
    department: (
      <div>
        <Tag color="pink">College of Arts and Sciences</Tag>
      </div>
    ),
    name: "Cassie Cassie",
    formname: "IPCR_Ano",
  },
  {
    key: "data2",
    date: "10/25/2022",
    department: (
      <div>
        <Tag color="purple">National Service Training Program OFfice</Tag>
      </div>
    ),
    name: "Cassie Cassie",
    formname: "IPCR_Ano",
  },
  {
    key: "data2",
    date: "10/25/202  2",
    department: (
      <div>
        <Tag color="yellow">
          Intellectual Property Rights and Protection Unit
        </Tag>
      </div>
    ),
    name: "Cassie Cassie",
    formname: "IPCR_Ano",
  },
];

const column = [
  {
    title: "Date Received",
    dataIndex: "date",
    key: "date",
    sorter: (a, b) => a.date - b.date,
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "Office Head Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name - b.name,
  },
  {
    title: "FormName",
    dataIndex: "formname",
    key: "formname",
  },
  {
    title: "Action",
    dataIndex: "action",
    width: 120,
    render: () => (
      <Space>
        <Tooltip title="View">
          <Button type="dashed" icon={<EyeOutlined />} />
        </Tooltip>

        <Tooltip title="Approve">
          <Button icon={<CheckCircleOutlined />} />
        </Tooltip>

        <Tooltip title="Reject">
          <Button icon={<CloseCircleOutlined />} danger />
        </Tooltip>
      </Space>
    ),
  },
];

const OpcrTable = () => {
  return (
    <>
      <div className="base-container">
        <Search
          placeholder="Search"
          style={{ width: 250, margin: 20 }}
          allowClear
        />

        <Table dataSource={dataSource} columns={column} />
      </div>
    </>
  );
};

export default OpcrTable;
