import { Table, Row, Col, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableActions from "../../component/action/TableActions";
import React from "react";
import useDrawerVisibility from "../../../service/hooks/useDrawerVisibility";
import CommonDrawer from "../../component/drawer/CommonDrawer";
import { OfficeAPI } from "../../../data/call/Resource";
import EmployeeForms from "./components/EmployeeForms";
import { DrawerVisiblityProvider } from "../../../service/context/DrawerVisiblityContext";
import { SelectedDataProvider } from "../../../service/context/SelectedDataContext";
import useTableCommons from "../../../service/hooks/useTableCommons";

const dataSource = [
  {
    username: "Adrii",
    name: "Adrian Rodriguez",
    role: "President",
    office: "Office of the President",
  },
  {
    username: "Yeye",
    name: "Joyjoy Yate",
    role: "Vice-President",
    office: "Office of the Vice President",
  },
];

const column = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "head",
    /* render: (data, row) => {
      return data !== null ? data.first_name + " " + data.last_name : null;
    },*/
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Office",
    dataIndex: "office",
    key: "office",
    /* render: (data, row) => {
      return data !== null ? data.code + " " + data.name : null;
    },*/
  },
  {
    title: "Actions",
    fixed: "right",
    width: 100,
    render: (data, record) => {
      return <TableActions hasDelete />;
    },
  },
];
const EmployeePage = () => {
  const drawerVisibility = useDrawerVisibility();
  const commons = useTableCommons({
    code: null,
  });
  const _handleAddButtonClick = () => {
    drawerVisibility.add.setVisible(true);
  };
  return (
    <DrawerVisiblityProvider
      value={{
        add: {
          visible: drawerVisibility.add.visible,
          set: drawerVisibility.add.setVisible,
        },
        edit: {
          visible: drawerVisibility.edit.visible,
          set: drawerVisibility.edit.setVisible,
        },
      }}
    >
      <SelectedDataProvider
        value={{
          data: commons.selectedData.state,
          setData: commons.selectedData.setter,
        }}
      >
        <div className="base-container">
          <Row justify="space-between">
            <Col>
              <Input.Search />
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={_handleAddButtonClick}
                icon={<PlusOutlined />}
              >
                Add Employee
              </Button>
            </Col>
          </Row>
          <br />
          <Table columns={column} dataSource={dataSource} />
        </div>
        <CommonDrawer.Add
          visible={drawerVisibility.add.visible}
          onClose={() => drawerVisibility.add.setVisible(false)}
          entityName="Employee"
          API={OfficeAPI}
          FormComponent={EmployeeForms.Add}
        />
        <CommonDrawer.Edit
          visible={drawerVisibility.edit.visible}
          onClose={() => drawerVisibility.edit.setVisible(false)}
          entityName="Employee"
          API={OfficeAPI}
          FormComponent={EmployeeForms.Edit}
        />
      </SelectedDataProvider>
    </DrawerVisiblityProvider>
  );
};

export default EmployeePage;
