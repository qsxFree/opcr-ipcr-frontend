import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import {
  PageHeader,
  Table,
  Button,
  Modal,
  Select,
  Form,
  Input,
  Checkbox,
  Row,
  Col,
  notification,
} from "antd";
import NavigatorContext from "../../../service/context/NavigatorContext";
import useTableCommons from "../../../service/hooks/useTableCommons";
import useDrawerVisiblity from "../../../service/hooks/useDrawerVisibility";
import { PlusOutlined } from "@ant-design/icons";
import CustomSelect from "../../component/select/CustomSelect";
import {
  employeeProfileOptionMapper,
  officeOptionMapper,
} from "../../component/select/OptionMapper";
import { EmployeeProfileAPI, OfficeAPI } from "../../../data/call/Resource";
import { useMutation } from "react-query";
import TableActions from "../../component/action/TableActions";

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16 },
};

const columns = [
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Office Name",
    dataIndex: "name",
    key: "officename",
  },
  {
    title: "Head",
    dataIndex: "_head",
    key: "head",
    render: (data, row) => {
      return data !== null ? data.first_name + " " + data.last_name : null;
    },
  },
  {
    title: "Parent",
    dataIndex: "_parent",
    key: "parent",
    render: (data, row) => {
      return data !== null ? data.code + " " + data.name : null;
    },
  },
  {
    title: "Actions",
    render: (data, record) => {
      return <TableActions hasDelete />;
    },
  },
];

const Offices = () => {
  const [form] = Form.useForm();
  const navigatorContext = useContext(NavigatorContext);
  navigatorContext.setSelectedKey("offices");
  const commons = useTableCommons({});
  const drawerVisiblity = useDrawerVisiblity();

  const mutation = useMutation(OfficeAPI.create, {
    onSuccess: (data) => {
      notification.success({
        message: "Office Created",
      });
      drawerVisiblity.add.setVisible(false);
      form.resetFields();
    },
    onError: (error) => {
      notification.error({
        message: "Office Creation Failed",
      });
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/office/list")
      .then((result) => {
        commons.tableData.setter(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showModal = () => {
    drawerVisiblity.add.setVisible(true);
  };

  const handleOk = () => {
    console.log(form.getFieldsValue());
    mutation.mutate(form.getFieldsValue());
  };

  const handleCancel = () => {
    drawerVisiblity.add.setVisible(false);
  };

  return (
    <>
      <PageHeader title="CNSC Offices" subTitle="Offices" />
      <div className="base-container">
        <Row justify="space-between">
          <Col>
            <Input.Search />
          </Col>
          <Col>
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
              Add Office
            </Button>
          </Col>
        </Row>
        <br />
        <Table dataSource={commons.tableData.state} columns={columns} />;
      </div>

      <Modal
        title="Add Office"
        visible={drawerVisiblity.add.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...layout} form={form} autoComplete="off">
          <Form.Item name="code" label="Code">
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Office Name">
            <Input />
          </Form.Item>
          <Form.Item name="head" label="Head">
            <CustomSelect.SearchSelect
              optionMap={employeeProfileOptionMapper}
              retrieveFn={EmployeeProfileAPI.retrieveList}
            />
          </Form.Item>

          <Form.Item
            rules={[{ required: true }]}
            name="parent"
            label="TParent Office"
            initialValue={null}
          >
            <CustomSelect.SearchSelect
              optionMap={officeOptionMapper}
              retrieveFn={OfficeAPI.retrieveList}
            />
          </Form.Item>
          <Form.Item
            name="is_delivery_unit"
            valuePropName="checked"
            initialValue={false}
            wrapperCol={{ offset: 8, span: 15 }}
          >
            <Checkbox style={{ float: "right" }}> Delivery Unit</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Offices;
