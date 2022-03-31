import React from "react";
import { Form, Input, Select, Button, Space, Tooltip } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16 },
};

/* eslint-enable no-template-curly-in-string */

const FormAddMfo = () => {
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  const { Option } = Select;

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <Form
      {...layout}
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name={["MFO/PAP"]}
        label="MFO/PAP"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item name={["Success Indicator"]} label="Success Indicator">
        <Input.TextArea />
      </Form.Item>

      <Form.Item name={["Budget"]} label="Alloted Budget">
        <Input />
      </Form.Item>

      <Form.Item name={["Office"]} label="Accountable Office">
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
      </Form.Item>
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
                    { required: true, message: "Missing Success Indicator" },
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
                    { required: true, message: "Missing Accountable Office" },
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
                style={{ marginLeft: 135, float: "left" }}
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

      <Form.Item rules={[{ required: true }]} label="Tag/Type">
        <Select defaultValue="" allowClear>
          <Select.Option value="SP">Strategic Priority</Select.Option>
          <Select.Option value="CF">Core Function</Select.Option>
          <Select.Option value="SF">Support Function </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={["Targetyear"]}
        label="Target Year"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
export default FormAddMfo;
