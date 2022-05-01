import React from "react";
<<<<<<< HEAD
import { Table, Input, Button, Upload, Tag, Space, Tooltip } from "antd";
=======
import { Table, Input, Button, Upload, Tag, Space } from "antd";
>>>>>>> b25662d05311683e5ad017480a59e07ff93295d8
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
<<<<<<< HEAD
    formname: "OPCR_Kwan",
=======
    formname: "OPCR_Torio",
>>>>>>> b25662d05311683e5ad017480a59e07ff93295d8
  },
  {
    key: "data2",
    date: "10/25/2022",
    department: (
      <div>
<<<<<<< HEAD
        <Tag color="pink">College of Arts and Sciences</Tag>
      </div>
    ),
    name: "Cassie Cassie",
    formname: "IPCR_Ano",
=======
        <Tag color="pink">Management Information System</Tag>
      </div>
    ),
    name: "Raymond Q. Zaratar",
    formname: "OPCR_Zaratar",
>>>>>>> b25662d05311683e5ad017480a59e07ff93295d8
  },
  {
    key: "data2",
    date: "10/25/2022",
    department: (
      <div>
<<<<<<< HEAD
        <Tag color="purple">National Service Training Program OFfice</Tag>
      </div>
    ),
    name: "Cassie Cassie",
    formname: "IPCR_Ano",
=======
        <Tag color="purple">National Service Training Program Office</Tag>
      </div>
    ),
    name: "Krezyl Joy Aye",
    formname: "OPCR_Aye",
>>>>>>> b25662d05311683e5ad017480a59e07ff93295d8
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
<<<<<<< HEAD
    name: "Cassie Cassie",
    formname: "IPCR_Ano",
=======
    name: "John Emmanuel Lagrisola",
    formname: "OPCR_Lagrisola",
>>>>>>> b25662d05311683e5ad017480a59e07ff93295d8
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
<<<<<<< HEAD
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
=======
    render: () => (
      <Space size="middle">
        <p>
          <CheckCircleOutlined
            style={{ cursor: "pointer", fontSize: 15, color: "green" }}
          />
        </p>
        <p>
          <CloseCircleOutlined
            style={{ cursor: "pointer", fontSize: 15, color: "red" }}
          />
        </p>
>>>>>>> b25662d05311683e5ad017480a59e07ff93295d8
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
