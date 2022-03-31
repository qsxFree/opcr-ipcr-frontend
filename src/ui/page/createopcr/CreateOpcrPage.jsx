import React, { useContext, useState } from "react";
import {
  Input,
  PageHeader,
  Table,
  Space,
  Button,
  Modal,
  Drawer,
  Tag,
  Row,
  Col,
} from "antd";
import NavigatorContext from "../../../service/context/NavigatorContext";
import DrawerOPCR from "./DrawerOPCR";

import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons/lib/icons";

const { Search } = Input;

const dataSource = [
  {
    key: "1",
    mfopap: "Software Development ",
    budget: "N/A",
    type: "Strategic Priority",
    responsibleoffice: (
      <div>
        <Tag color="geekblue">Institute of Computer Studies</Tag>
        <Tag color="blue">Management Information System</Tag>
      </div>
    ),
    targetyear: "2022",
    action: "",
  },
  {
    key: "2",
    mfopap: "MFO 2",
    budget: 25000,
    type: "Strategic Priority",
    responsibleoffice: (
      <div>
        <Tag color="geekblue">Institute of Computer Studies</Tag>
      </div>
    ),
    targetyear: "2023",
    action: "",
  },
  {
    key: "3",
    mfopap: "MFO 3",
    budget: 32000,
    type: "Core Function",
    responsibleoffice: (
      <div>
        <Tag color="geekblue">Institute of Computer Studies</Tag>
      </div>
    ),
    targetyear: "2022",
  },
  {
    key: "4",
    mfopap: "MFO 4",
    budget: 99000,
    type: "Core Function",
    responsibleoffice: (
      <div>
        <Tag color="geekblue">Institute of Computer Studies</Tag>
        <Tag color="red">College of Engineering</Tag>
      </div>
    ),
    targetyear: "2022",
  },
];

const CreateOpcrPage = () => {
  const navigatorContext = useContext(NavigatorContext);
  navigatorContext.setSelectedKey("createOpcr");

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

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
      title: "Responsible Office",
      dataIndex: "responsibleoffice",
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
            <EditOutlined onClick={showDrawer} style={{ cursor: "pointer" }} />
          </p>
        </Space>
      ),
    },
  ];
  return (
    <>
      <PageHeader
        title="Create OPCR"
        subTitle="Office Performance Commitment and Review"
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
          </p>
          <p>
            {" "}
            This will be sent to a higher office for approval. Are you sure you
            want to submit?
          </p>
        </Modal>

        <Drawer
          width={550}
          footer={
            <Row justify="end">
              <Col>
                <Button onClick={onClose} type="primary">
                  Save
                </Button>
              </Col>
            </Row>
          }
          title="Edit Success Indicator"
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          <DrawerOPCR />
        </Drawer>

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

export default CreateOpcrPage;
