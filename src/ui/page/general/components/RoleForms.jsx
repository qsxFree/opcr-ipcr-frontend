import React from "react";
import { Form, Input } from "antd";
import SelectedDataContext from "../../../../service/context/SelectedDataContext";

const Add = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Role" name="role">
        <Input />
      </Form.Item>
    </Form>
  );
};

const Edit = ({ form }) => {
  const selectedData = React.useContext(SelectedDataContext);
  const data = selectedData.data;
  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Role" name="role" initialValue={data.role}>
        <Input />
      </Form.Item>
    </Form>
  );
};
const RoleForms = { Add, Edit };
export default RoleForms;
