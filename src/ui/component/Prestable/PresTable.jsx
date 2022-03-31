import React, { useContext, useState } from "react";
import {
  Table,
  Space,
  Drawer,
  Button,
  Input,
  Select,
  Tag,
  Row,
  Col,
} from "antd";
import TryPrestable from "./TryPrestable";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

//table ito

const { TextArea } = Input;
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
  console.log(`TextArea ${value}`);
  console.log(`Input ${value}`);
}
const dataSource = [
  {
    key: "data1",
    mfopap: "Computer Programming",
    tagtype: "Support Function",
    targetyear: "2023",
    officeaccountable: (
      <div>
        <Tag color="geekblue">Management Information System</Tag>
      </div>
    ),
    Estimatedbudget: "50,000.00",
  },
  {
    key: "data2",
    mfopap: "Software Dev",
    tagtype: "Core Function",
    targetyear: "2022",
    officeaccountable: (
      <div>
        <Tag color="geekblue">Management Information System</Tag>
      </div>
    ),
    Estimatedbudget: "100,000.00",
  },
];

const PresTable = () => {
  const [visible, setVisible] = useState(false);
  const [SecondVisibility, ShowLayer] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const LayerTwo = () => {
    ShowLayer(true);
  };
  const LayerTwoClose = () => {
    ShowLayer(false);
  };
  const column = [
    {
      title: "MFO/PAP",
      dataIndex: "mfopap",
      key: "mfoPap",
    },
    {
      title: "Tag/Type",
      dataIndex: "tagtype",
      key: "tagType",
      sorter: (a, b) => a.tagtype.length - b.tagtype.length,
    },
    {
      title: "Target Year",
      dataIndex: "targetyear",
      key: "targetYear",
      sorter: (a, b) => a.targetyear - b.targetyear,
    },

    {
      title: "Office Accountable",
      dataIndex: "officeaccountable",
      key: "Officeaccountable",
      sorter: (a, b) => a.officeaccountable.length - b.officeaccountable.length,
    },

    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <Space size="middle">
          <p>
            <EditOutlined onClick={showDrawer} style={{ cursor: "pointer" }} />
          </p>
          <p>
            <DeleteOutlined style={{ cursor: "pointer" }} />
          </p>
        </Space>
      ),
    },
  ];

  const drawerdataSource = [
    {
      si: "One (1) program revised as member of the comittee on revision",
      budget: "100,000",
      acc: "ICS",
    },
    {
      si: "Three (3) updated syllabi submitted withn 1st of the week of June",
      budget: "220,000",
      acc: "CoEng",
    },
  ];
  const drawercolumn = [
    {
      title: "Success Indicator",
      dataIndex: "si",
      key: "si",
    },
    {
      title: "Alloted Budget",
      dataIndex: "budget",
      key: "budget",
    },
    {
      title: "Office Accountable",
      dataIndex: "acc",
      key: "acc",
    },
  ];

  const SecondDrawer = ({ visible, onClose }) => {
    return (
      <>
        <Drawer
          title="Success Indicator"
          width={500}
          placement="right"
          onClose={LayerTwoClose}
          visible={visible}
          footer={
            <Row justify="end">
              <Col>
                <Button onClick={onClose} type="primary">
                  Save
                </Button>
              </Col>
            </Row>
          }
        >
          <div>
            <TextArea
              placeholder="Success Indicator"
              style={{ margin: 5 }}
              onChange={handleChange}
            />
            <Input
              placeholder="Budget"
              style={{ margin: 5, width: 150 }}
              onChange={handleChange}
            />
            <Select
              mode="multiple"
              style={{ marginright: 150, width: 150 }}
              placeholder="Choose Accountable Office"
              onChange={handleChange}
              optionLabelProp="label"
            >
              <Option value="cas">CAS </Option>
              <Option value="mis">MIS </Option>
              <Option value="coed">CoEd </Option>
              <Option value="coeng">CoEng </Option>
              <Option value="cbpa">CBPA </Option>
              <Option value="canr">CANR </Option>
            </Select>
          </div>

          <div>
            <TextArea
              placeholder="Success Indicator"
              style={{ margin: 5 }}
              onChange={handleChange}
            />
            <Input
              placeholder="Budget"
              style={{ margin: 5, width: 150 }}
              onChange={handleChange}
            />

            <Select
              mode="multiple"
              style={{ marginright: 150, width: 150 }}
              placeholder="Choose Accountable Office"
              onChange={handleChange}
              optionLabelProp="label"
            >
              <Option value="cas">CAS </Option>
              <Option value="mis">MIS </Option>
              <Option value="coed">CoEd </Option>
              <Option value="coeng">CoEng </Option>
              <Option value="cbpa">CBPA </Option>
              <Option value="canr">CANR </Option>
            </Select>
          </div>
        </Drawer>
      </>
    );
  };
  return (
    <>
      <div className="basecontainer">
        <TryPrestable />

        <Drawer
          width={650}
          footer={
            <Row justify="end">
              <Col>
                <Button onClick={onClose} type="primary">
                  Save
                </Button>
              </Col>
            </Row>
          }
          title="Edit MFO/PAP"
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          <div>
            <TextArea
              placeholder="MFO/PAP"
              style={{ margin: 5 }}
              onChange={handleChange}
            />
            <Select
              placeholder="Tag/Type"
              style={{ marginLeft: 150, width: 150 }}
              onChange={handleChange}
              allowClear
            >
              <Select.Option value="SP">Strategic Priority</Select.Option>
              <Select.Option value="CF">Core Function</Select.Option>
              <Select.Option value="SF">Support Function </Select.Option>
            </Select>
            <Input
              placeholder="Target Year"
              style={{ margin: 5, width: 150 }}
              onChange={handleChange}
            />
          </div>

          <br></br>

          <Table columns={drawercolumn} dataSource={drawerdataSource} />
          <div>
            <Button
              type="primary"
              style={{ float: "right", cursor: "pointer" }}
              onClick={LayerTwo}
            >
              Edit Success Indicator
            </Button>
          </div>
        </Drawer>

        <br></br>

        <Table dataSource={dataSource} columns={column} />
      </div>
      <SecondDrawer visible={SecondVisibility} onClose={LayerTwoClose} />
    </>
  );
};

export default PresTable;
