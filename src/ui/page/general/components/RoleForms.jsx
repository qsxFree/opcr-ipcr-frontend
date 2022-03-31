import React from "react";
import { Form, Input } from "antd";

const Add = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Role:">
        <Input />
      </Form.Item>
    </Form>
  );
};

const Edit = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Role:">
        <Input />
      </Form.Item>
    </Form>
  );
};
const RoleForms = { Add, Edit };
export default RoleForms;
