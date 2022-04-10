import React from "react";
import { Form, Input } from "antd";
import SelectedDataContext from "../../../../service/context/SelectedDataContext";
import CustomSelect from "../../../component/select/CustomSelect";
import { EmployeeRoleAPI, OfficeAPI } from "../../../../data/call/Resource";
import {
  officeOptionMapper,
  employeeRoleOptionMapper,
} from "../../../component/select/OptionMapper";

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
      <Form.Item label="Office" name="office">
        <CustomSelect.SearchSelect
          optionMap={officeOptionMapper}
          retrieveFn={OfficeAPI.retrieveList}
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

const EmployeeForms = { Add, Edit };
export default EmployeeForms;
