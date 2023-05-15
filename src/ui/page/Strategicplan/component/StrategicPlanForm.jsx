import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";
import {
  EmployeeProfileAPI,
  EmployeeRoleAPI,
  MfoAPI,
} from "../../../../data/call/Resource";
import CustomSelect from "../../../component/select/CustomSelect";
import {
  employeeProfileOptionMapper,
  employeeRoleOptionMapper,
  mfoOptionMapper,
} from "../../../component/select/OptionMapper";

const Add = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Row gutter={8}>
        <Col span={16}>
          <Form.Item label="MFO" name="mfo">
            <CustomSelect.SearchSelect
              optionMap={mfoOptionMapper}
              retrieveFn={MfoAPI.retrieveList}
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Tags/Type" name="type">
            <Select>
              <Select.Option value={1}>Strategic Priority</Select.Option>
              <Select.Option value={2}>Core Functionality</Select.Option>
              <Select.Option value={3}>Supporting Functionality</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.List name="details">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={8} align="middle">
                <Col span={6}>
                  <Form.Item
                    {...restField}
                    label="Success Indicator"
                    name={[name, "success_indicator"]}
                  >
                    <Input.TextArea />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item
                    {...restField}
                    label="Accountable (Unit/Section/Individual) "
                    name={[name, "accountable-person"]}
                  >
                    <CustomSelect.SearchSelect
                      optionMap={employeeProfileOptionMapper}
                      retrieveFn={EmployeeProfileAPI.retrieveList}
                      mode="multiple"
                    />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item
                    {...restField}
                    label="Accountable(By Roles) "
                    name={[name, "accountable-role"]}
                  >
                    <CustomSelect.SearchSelect
                      optionMap={employeeRoleOptionMapper}
                      retrieveFn={EmployeeRoleAPI.retrieveList}
                      mode="multiple"
                    />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item
                    {...restField}
                    label="Allotted Budget"
                    name={[name, "budget"]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={1}>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Success Indicator
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

const StrategicPlanForm = {
  Add,
};

export default StrategicPlanForm;
