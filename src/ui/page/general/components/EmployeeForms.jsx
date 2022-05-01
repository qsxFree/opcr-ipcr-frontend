import React from "react";
import { useState } from "react";
import { Form, Input, Button, Typography, Divider, Select } from "antd";
import SelectedDataContext from "../../../../service/context/SelectedDataContext";
import CustomSelect from "../../../component/select/CustomSelect";
import { EmployeeRoleAPI } from "../../../../data/call/Resource";
import { employeeRoleOptionMapper } from "../../../component/select/OptionMapper";

// const Create = ({ form }) => {
//   const [pass, setPassword] = useState("***");

//   const generatePassword = () => {
//     const randomPassword =
//       Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
//     setPassword(randomPassword);
//     if (navigator.clipboard.writeText(randomPassword)) {
//       alert("Text copied");
//     }
//   };
//   return (
//     <Form form={form} layout="vertical">
//       <Form.Item label="UserName" name="user_name">
//         <Input />
//       </Form.Item>
//       <Form.Item label="Password" name="password">
//         <Input prefix={pass} value={pass} disabled />
//       </Form.Item>
//       <Button onClick={generatePassword}>Generate</Button>
//     </Form>
//   );
// };
const Add = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      {/* <Form.Item label="Username:">
        <Input />
      </Form.Item> */}
      <Form.Item label="First Name" name="first_name">
        <Input />
      </Form.Item>
      <Form.Item label="Middle Name" name="middle_name">
        <Input />
      </Form.Item>
      <Form.Item label="Last Name" name="last_name">
        <Input />
      </Form.Item>
      <Form.Item label="Extension Name" name="extension_name">
        <Input />
      </Form.Item>
      <Form.Item label="Role" name="role">
        <CustomSelect.SearchSelect
          optionMap={employeeRoleOptionMapper}
          retrieveFn={EmployeeRoleAPI.retrieveList}
        />
      </Form.Item>
    </Form>
  );
};

const Edit = ({ form }) => {
  const selectedData = React.useContext(SelectedDataContext);
  const data = selectedData.data;
  form.resetFields();
  return (
    <Form form={form} layout="vertical">
      {/* <Form.Item label="Username:">
        <Input />
      </Form.Item> */}
      <Form.Item
        label="First Name"
        name="first_name"
        initialValue={data.first_name}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Middle Name"
        name="middle_name"
        initialValue={data.middle_name}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="last_name"
        initialValue={data.last_name}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Extension Name"
        name="extension_name"
        initialValue={data.extension_name}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Role"
        name="role"
        initialValue={data._role && data._role.id}
      >
        <CustomSelect.SearchSelect
          optionMap={employeeRoleOptionMapper}
          retrieveFn={EmployeeRoleAPI.retrieveList}
          initialOptions={[data._role]}
        />
      </Form.Item>
    </Form>
  );
};

const Account = ({ form }) => {
  const selectedData = React.useContext(SelectedDataContext);
  const data = selectedData.data;
  form.resetFields();
  return (
    <>
      <Typography.Text strong>
        Employee : {data.last_name} {data.first_name}
      </Typography.Text>
      <Divider />
      <Form form={form} layout="vertical">
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input />
        </Form.Item>

        <Form.Item label="Access Level" name="role" initialValue={3}>
          <Select>
            <Select.Option value={3}>General</Select.Option>
            <Select.Option value={2}>Head</Select.Option>
            <Select.Option value={1}>Admin</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="employee_id" initialValue={data.id}></Form.Item>
      </Form>
    </>
  );
};

const EmployeeForms = { Add, Edit, Account };
export default EmployeeForms;
