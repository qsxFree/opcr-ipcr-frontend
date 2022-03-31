import React, { useContext, useState } from "react";
import {
  Input,
  PageHeader,
  Table,
  Space,
  Button,
  Tag,
  Modal,
  Drawer,
} from "antd";

import NavigatorContext from "../../../service/context/NavigatorContext";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons/lib/icons";
const { Search } = Input;

const IpcrCreatePage = () => {
  const columns = [
    {
      title: "MFO/PAP",
      dataIndex: "mfopap",
    },
    {
      title: "Estimated Budget",
      dataIndex: "budget",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Unit/Section/Individual Accountable",
      dataIndex: "accountable",
    },
    {
      title: "Target Year",
      dataIndex: "targetyear",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <Space size="middle">
          <p>
            <EyeOutlined style={{ cursor: "pointer" }} />
          </p>
          <p>
            <EditOutlined style={{ cursor: "pointer" }} />
          </p>
        </Space>
      ),
    },
  ];
  const dataSource = [
    {
      key: "1",
      mfopap: "Software Development ",
      budget: "N/A",
      type: "Strategic Priority",
      accountable: (
        <div>
          <Tag color="default">Juan Carlos Sendon</Tag>
        </div>
      ),
      targetyear: "2022",
      action: "",
    },
    {
      key: "2",
      mfopap: "MFO 2",
      budget: "42M",
      type: "Strategic Priority",
      accountable: (
        <div>
          <Tag color="default">Juan Carlos Sendon</Tag>
        </div>
      ),
      targetyear: "2023",
      action: "",
    },
    {
      key: "3",
      mfopap: "MFO 3",
      budget: "32M",
      type: "Core Function",
      accountable: (
        <div>
          <Tag color="default">Juan Carlos Sendon</Tag>
        </div>
      ),
      targetyear: "2022",
      action: "",
    },
    {
      key: "4",
      mfopap: "MFO 4",
      budget: "99M",
      type: "Core Function",
      accountable: (
        <div>
          <Tag color="default">Juan Carlos Sendon</Tag>
        </div>
      ),
      targetyear: "2022",
      action: <EditOutlined />,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  const navigatorContext = useContext(NavigatorContext);
  navigatorContext.setSelectedKey("createIpcr");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <PageHeader
        title="Create IPCR"
        subTitle="Individual Performance Commitment and Review"
      ></PageHeader>

      <div className="base-container">
        <Search
          placeholder="input search text"
          style={{ width: 250, margin: 18 }}
          allowClear
        />

        <div style={{ float: "right", margin: 20 }}>
          <Button type="primary" onClick={showModal}>
            Send for Approval
          </Button>
        </div>
        <Modal
          title="Send for Approval?"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>
            <ExclamationCircleOutlined
              style={{ color: "orange", fontSize: 19 }}
            />{" "}
            <b>Confirm</b>
          </p>{" "}
          <p>
            {" "}
            This will be sent to a higher office for approval. Are you sure you
            want to submit?
          </p>
        </Modal>

        <br></br>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowSelection={rowSelection}
        />
      </div>
    </>
  );
};

export default IpcrCreatePage;
