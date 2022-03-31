import React, { useState } from "react";
import {
  Input,
  PageHeader,
  Table,
  Space,
  Button,
  Drawer,
  Select,
  Tooltip,
  Form,
  Row,
  Col,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const DrawerOPCR = () => {
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const [visibleLayer, visibility] = useState(false);
  const showLayer = () => {
    visibility(true);
  };
  const hideLayer = () => {
    visibility(false);
  };

  const { TextArea } = Input;
  const { Option } = Select;
  function handleChange(value) {
    console.log(`selected ${value}`);
    console.log(`TextArea ${value}`);
    console.log(`Input ${value}`);
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };
  const datasourcetable = [
    {
      key: "1",
      si: "One (1) program revised as member of the comittee on revision",
      budget: "100,000",
      acc: "ICS",
    },
    {
      key: "2",
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

  const LayerTwo = ({ visible, onClose }) => {
    return (
      <Drawer
        title="Success Indicator"
        width={500}
        placement="right"
        onClose={hideLayer}
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
        <Form
          {...layout}
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.List name="SI">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", margin: 5 }}
                    align="baseline"
                  >
                    <Form.Item
                      style={{ width: 200 }}
                      {...restField}
                      name={[name, "SI"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Success Indicator",
                        },
                      ]}
                    >
                      <Tooltip placement="topLeft" title="Success Indicator">
                        <Input.TextArea placeholder="Success Indicator" />
                      </Tooltip>
                    </Form.Item>

                    <Form.Item
                      style={{ width: 200, marginLeft: -50, marginTop: 5 }}
                      {...restField}
                      name={[name, "AllotedBudget"]}
                      rules={[
                        { required: true, message: "Missing Alloted Budget" },
                      ]}
                    >
                      <Tooltip placement="topLeft" title="Alloted Budget">
                        <Input placeholder="Alloted Budget" />
                      </Tooltip>
                    </Form.Item>

                    <Form.Item
                      style={{ width: 200, marginLeft: -50, marginTop: 5 }}
                      {...restField}
                      name={[name, "OfficeAccountable"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Accountable Office",
                        },
                      ]}
                    >
                      <Tooltip placement="topLeft" title="Accountable Office">
                        <Select
                          mode="multiple"
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
                      </Tooltip>
                    </Form.Item>

                    <MinusCircleOutlined
                      style={{ marginLeft: -70 }}
                      onClick={() => remove(name)}
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    style={{ marginLeft: 5, float: "left" }}
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Drawer>
    );
  };

  return (
    <>
      <Table
        columns={drawercolumn}
        dataSource={datasourcetable}
        rowSelection={rowSelection}
      />
      <div>
        <Button
          type="primary"
          onClick={showLayer}
          onClose={hideLayer}
          style={{ float: "right", cursor: "pointer" }}
        >
          Edit Success Indicator
        </Button>
      </div>
      <LayerTwo visible={visibleLayer} onClose={hideLayer} />
    </>
  );
};

export default DrawerOPCR;
