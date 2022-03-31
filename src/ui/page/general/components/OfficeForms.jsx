import React from "react";
import { Form, Input, Checkbox } from "antd";
//import SelectedDataContext from "../../../../service/context/SelectedDataContext";

const Add = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Code:">
        <Input />
      </Form.Item>
      <Form.Item label="Office Name:">
        <Input />
      </Form.Item>
      <Form.Item label="Head:">
        <Input />
      </Form.Item>
      <Form.Item label="Parent Office:">
        <Input />
      </Form.Item>
      <Form.Item name="deliveryunit" valuePropName="checked">
        <Checkbox>Delivery Unit</Checkbox>
      </Form.Item>
    </Form>
  );
};

const Edit = ({ form }) => {
  //const selectedData = React.useContext(SelectedDataContext);
  //const data = selectedData.data;
  form.resetFields();
  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Code:">
        <Input />
      </Form.Item>
      <Form.Item label="Office Name:">
        <Input />
      </Form.Item>
      <Form.Item label="Head:">
        <Input />
      </Form.Item>
      <Form.Item label="Parent Office:">
        <Input />
      </Form.Item>
      <Form.Item name="deliveryunit" valuePropName="checked">
        <Checkbox>Delivery Unit</Checkbox>
      </Form.Item>
    </Form>
  );
};
const OfficeForms = { Add, Edit };
export default OfficeForms;
