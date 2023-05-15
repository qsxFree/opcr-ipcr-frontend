import { DatePicker, Form, Input } from "antd";
import React from "react";
import SelectedDataContext from "../../../../service/context/SelectedDataContext";

const Add = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Code" name="code" wrapperCol={{ span: 8 }}>
        <Input />
      </Form.Item>
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="Year" name="year">
        <DatePicker.YearPicker />
      </Form.Item>
    </Form>
  );
};

const Edit = ({ form }) => {
  const selectedData = React.useContext(SelectedDataContext);
  const data = selectedData.data;
  console.log(data);
  form.resetFields();
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Code"
        name="code"
        wrapperCol={{ span: 8 }}
        initialValue={data.code}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Name" name="name" initialValue={data.name}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        initialValue={data.description}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="Year" name="year" initialValue={data.year}>
        <DatePicker.YearPicker />
      </Form.Item>
    </Form>
  );
};

const MfoForm = {
  Add,
  Edit,
};

export default MfoForm;
