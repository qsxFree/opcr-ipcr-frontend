import { Table, Row, Col, Input, Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableActions from "../../component/action/TableActions";
import React from "react";
import useDrawerVisibility from "../../../service/hooks/useDrawerVisibility";
import CommonDrawer from "../../component/drawer/CommonDrawer";
import { EmployeeProfileAPI, OfficeAPI } from "../../../data/call/Resource";
import EmployeeForms from "./components/EmployeeForms";
import { DrawerVisiblityProvider } from "../../../service/context/DrawerVisiblityContext";
import { SelectedDataProvider } from "../../../service/context/SelectedDataContext";
import useTableCommons from "../../../service/hooks/useTableCommons";
import { useQuery } from "react-query";

const dataSource = [
  {
    key: "datasource1",
    account: "aas",
    role: "krezyl",
  },
];
const column = [
  // {
  //   title: "Username",
  //   dataIndex: "username",
  //   key: "username",
  // },
  {
    title: "Name",
    key: "head",
    render: (data, row) => {
      return row.last_name + ", " + row.first_name;
    },
  },
  {
    title: "Role",
    dataIndex: "_role",
    key: "role",
    render: (data, row) => {
      return data && data.role;
    },
  },

  {
    title: "Account",
    dataIndex: "_user",
    key: "account",
    width: 150,
    render: (data, row) => {
      return data ? (
        <Typography.Text strong>{data.username}</Typography.Text>
      ) : (
        <Button type="dashed" icon={<PlusOutlined />}>
          Create
        </Button>
      );
    },
  },
  {
    title: "Actions",
    fixed: "right",
    width: 100,
    render: (data, record) => {
      return <TableActions record={record} hasDelete />;
    },
  },
];
const EmployeePage = () => {
  const drawerVisibility = useDrawerVisibility();
  const commons = useTableCommons({
    first_name: null,
    last_name: null,
    middle_name: null,
    extension_name: null,
    _role: null,
    _office: null,
  });

  const queryEmployee = useQuery("employee", EmployeeProfileAPI.retrieveList, {
    onSuccess: (data) => {
      commons.tableData.setter(data.data);
    },
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
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
          <Table
            columns={column}
            dataSource={commons.tableData.state}
            loading={queryEmployee.isLoading}
          />
        </div>
        <CommonDrawer.Add
          visible={drawerVisibility.add.visible}
          onClose={() => drawerVisibility.add.setVisible(false)}
          entityName="Employee"
          API={EmployeeProfileAPI}
          FormComponent={EmployeeForms.Add}
        />
        <CommonDrawer.Edit
          visible={drawerVisibility.edit.visible}
          onClose={() => drawerVisibility.edit.setVisible(false)}
          entityName="Employee"
          API={EmployeeProfileAPI}
          FormComponent={EmployeeForms.Edit}
        />
      </SelectedDataProvider>
    </DrawerVisiblityProvider>
  );
};

export default EmployeePage;
