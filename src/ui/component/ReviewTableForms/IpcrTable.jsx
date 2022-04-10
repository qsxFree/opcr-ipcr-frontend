import React from "react";
import { Table, Input, Button, Upload, Tag, Space } from "antd";
import {
  UploadOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const props = {
  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log(file, fileList);
    }
  },
};

const { Search } = Input;

const dataSource = [
  {
    key: "data1",
    date: "11/15/2022",
    department: (
      <div>
        <Tag color="red">VP Research and Extension</Tag>
      </div>
    ),
    name: "Royeen Lagumen",
    formname: "IPCR_Kwan",
  },
  {
    key: "data2",
    date: "11/30/2022",
    department: (
      <div>
        <Tag color="red">VP Administration and Finance</Tag>
      </div>
    ),
    name: "Crispy Jeysi",
    formname: "IPCR_Ano",
  },
  {
    key: "data2",
    date: "11/30/2022",
    department: (
      <div>
        <Tag color="red">VP Research and Extension</Tag>
      </div>
    ),
    name: "Edmond Esmalla",
    formname: "IPCR_Ano",
  },
  {
    key: "data2",
    date: "11/30/2022",
    department: (
      <div>
        <Tag color="red">VP Academic Affairs</Tag>
      </div>
    ),
    name: "Krezyl Joy Aye ",
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
    title: "Employee Name",
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
    title: "FormName",
    dataIndex: "formname",
    render: () => (
      <Space size="middle">
        <p>
          <EyeOutlined style={{ cursor: "pointer" }} />
        </p>
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
      </Space>
    ),
  },
];

const IpcrTable = () => {
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

export default IpcrTable;
