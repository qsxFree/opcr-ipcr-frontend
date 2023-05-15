import React from "react";
import { Form, Input, Checkbox } from "antd";
import CustomSelect from "../../../component/select/CustomSelect";
import {
  employeeProfileOptionMapper,
  officeOptionMapper,
} from "../../../component/select/OptionMapper";
import { EmployeeProfileAPI, OfficeAPI } from "../../../../data/call/Resource";
import SelectedDataContext from "../../../../service/context/SelectedDataContext";
//import SelectedDataContext from "../../../../service/context/SelectedDataContext";

const Add = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Code" name="code">
        <Input />
      </Form.Item>
      <Form.Item label="Office Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Head" name="head">
        <CustomSelect.SearchSelect
          optionMap={employeeProfileOptionMapper}
          retrieveFn={EmployeeProfileAPI.retrieveList}
        />
      </Form.Item>
      <Form.Item label="Parent Office" name="parent">
        <CustomSelect.SearchSelect
          optionMap={officeOptionMapper}
          retrieveFn={OfficeAPI.retrieveList}
          mode="multiple"
        />
      </Form.Item>
      <Form.Item name="is_delivery_unit" valuePropName="checked">
        <Checkbox>Delivery Unit</Checkbox>
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
      <Form.Item label="Code" name="code" initialValue={data.code}>
        <Input />
      </Form.Item>
      <Form.Item label="Office Name" name="name" initialValue={data.name}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Head"
        name="head"
        initialValue={data._head && data._head.id}
      >
        <CustomSelect.SearchSelect
          optionMap={employeeProfileOptionMapper}
          retrieveFn={EmployeeProfileAPI.retrieveList}
          initialOptions={data._head !== null ? [data._head] : []}
        />
      </Form.Item>
      <Form.Item
        label="Parent Office"
        name="parent"
        initialValue={data._parent && [...data._parent.map((item) => item.id)]}
      >
        <CustomSelect.SearchSelect
          optionMap={officeOptionMapper}
          retrieveFn={OfficeAPI.retrieveList}
          initialOptions={data._parent}
          mode="multiple"
        />
      </Form.Item>
      <Form.Item name="is_delivery_unit" valuePropName="checked">
        <Checkbox>Delivery Unit</Checkbox>
      </Form.Item>
    </Form>
  );
};
const OfficeForms = { Add, Edit };
export default OfficeForms;
