import React from "react";
import { Table, Row, Col, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableActions from "../../component/action/TableActions";
import useDrawerVisibility from "../../../service/hooks/useDrawerVisibility";
import CommonDrawer from "../../component/drawer/CommonDrawer";
import RoleForms from "./components/RoleForms";
import { EmployeeRoleAPI, OfficeAPI } from "../../../data/call/Resource";
import { DrawerVisiblityProvider } from "../../../service/context/DrawerVisiblityContext";
import { SelectedDataProvider } from "../../../service/context/SelectedDataContext";
import useTableCommons from "../../../service/hooks/useTableCommons";
import { useQuery } from "react-query";

const column = [
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },

    {
      title: "Office",
      dataIndex: "office",
      key: "office",
      
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
const RolePage = () => {
  const drawerVisibility = useDrawerVisibility();
  const commons = useTableCommons({
    code: null,
  });

  const queryEmployeeRole = useQuery(
    "employee-role",
    EmployeeRoleAPI.retrieveList,
    {
      onSuccess: (data) => {
        commons.tableData.setter(data.data);
      },
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    }
  );

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
                Add Role
              </Button>
            </Col>
          </Row>
          <br />
          <Table
            columns={column}
            dataSource={commons.tableData.state}
            loading={queryEmployeeRole.isLoading}
          />
        </div>
        <CommonDrawer.Add
          visible={drawerVisibility.add.visible}
          onClose={() => drawerVisibility.add.setVisible(false)}
          entityName="Role"
          API={EmployeeRoleAPI}
          FormComponent={RoleForms.Add}
        />
        <CommonDrawer.Edit
          visible={drawerVisibility.edit.visible}
          onClose={() => drawerVisibility.edit.setVisible(false)}
          entityName="Office"
          API={EmployeeRoleAPI}
          FormComponent={RoleForms.Edit}
        />
      </SelectedDataProvider>
    </DrawerVisiblityProvider>
  );
};

export default RolePage;
