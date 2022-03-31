import React from "react";
import { Form, Input } from "antd";

const Add = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Username:">
        <Input />
      </Form.Item>
      <Form.Item label="Name:">
        <Input />
      </Form.Item>
      <Form.Item label="Role:">
        <Input />
      </Form.Item>
      <Form.Item label="Office:">
        <Input />
      </Form.Item>
    </Form>
  );
};
const Edit = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Username:">
        <Input />
      </Form.Item>
      <Form.Item label="Name:">
        <Input />
      </Form.Item>
      <Form.Item label="Role:">
        <Input />
      </Form.Item>
      <Form.Item label="Office:">
        <Input />
      </Form.Item>
    </Form>
  );
};

const EmployeeForms = { Add, Edit };
export default EmployeeForms;
