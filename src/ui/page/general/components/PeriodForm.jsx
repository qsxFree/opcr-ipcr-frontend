import React from "react";
import { Form, Input } from "antd";

const Add = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Code" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
};
const PeriodForm = { Add };
export default PeriodForm;
