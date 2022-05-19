import React from "react";
import { Table, Row, Col, Input, Button, Typography, Space } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import TableActions from "../../component/action/TableActions";
import useDrawerVisibility from "../../../service/hooks/useDrawerVisibility";
import CommonDrawer from "../../component/drawer/CommonDrawer";
import RoleForms from "./components/RoleForms";
import { EmployeeRoleAPI, OfficeAPI } from "../../../data/call/Resource";
import { DrawerVisiblityProvider } from "../../../service/context/DrawerVisiblityContext";
import { SelectedDataProvider } from "../../../service/context/SelectedDataContext";
import useTableCommons from "../../../service/hooks/useTableCommons";
import { useQuery } from "react-query";
import { RoleAPI } from "../../../data/call/Resource";
import { useMutation } from "react-query";

const column = [
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },

  {
    title: "Office",
    dataIndex: "_office",
    key: "office",
    render: (data, record) => {
      return (
        data && (
          <Typography.Text>
            <Typography.Text strong>{data.code}</Typography.Text> - {data.name}
          </Typography.Text>
        )
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
const RolePage = () => {
  const drawerVisibility = useDrawerVisibility();
  const commons = useTableCommons({
    code: null,
  });
  const _handleAddButtonClick = () => {
    drawerVisibility.add.setVisible(true);
  };
  const RoleMutator = useMutation(EmployeeRoleAPI.retrieveList, {
    onSuccess: (data) => {
      console.log(data.data);
      commons.tableData.setter(data.data);
    },
  });

  React.useEffect(() => {
    RoleMutator.mutate();
  }, []);

  const _handleRefresh = () => {
    RoleMutator.mutate();
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
              <Space>
                <Input.Search placeholder="Search" allowClear />
                <Button icon={<ReloadOutlined />} onClick={_handleRefresh}>
                  Refresh
                </Button>
              </Space>
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
            loading={RoleMutator.isLoading}
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
