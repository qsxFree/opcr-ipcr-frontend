import { Table, Row, Col, Input, Button, Typography, Space } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import TableActions from "../../component/action/TableActions";
import React from "react";
import useDrawerVisibility from "../../../service/hooks/useDrawerVisibility";
import CommonDrawer from "../../component/drawer/CommonDrawer";
import { EmployeeProfileAPI, UserAPI } from "../../../data/call/Resource";
import EmployeeForms from "./components/EmployeeForms";
import DrawerVisibilityContext, {
  DrawerVisiblityProvider,
} from "../../../service/context/DrawerVisiblityContext";
import SelectedDataContext, {
  SelectedDataProvider,
} from "../../../service/context/SelectedDataContext";
import useTableCommons from "../../../service/hooks/useTableCommons";
import { useMutation } from "react-query";

// const characters =
//   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// function generateString(length) {
//   let result = " ";
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }

//   return result;
// }

const dataSource = [
  {
    key: "datasource1",
    account: "aas",
    role: "krezyl",
  },
];

const column = [
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
    render: (data, record) => (
      <CreateAccountAction data={data} record={record} />
    ),
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

const CreateAccountAction = ({ data, record }) => {
  const selectedData = React.useContext(SelectedDataContext);
  const drawerVisibility = React.useContext(DrawerVisibilityContext);

  const _handleClick = () => {
    selectedData.setData(record);
    drawerVisibility.view.set(true);
  };

  return data ? (
    <Typography.Text strong>{data.username}</Typography.Text>
  ) : (
    <Button type="dashed" onClick={_handleClick} icon={<PlusOutlined />}>
      Create
    </Button>
  );
};

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

  const employeeMutator = useMutation(EmployeeProfileAPI.retrieveList, {
    onSuccess: (data) => {
      commons.tableData.setter(data.data);
    },
  }); // pag may nakita kayo na useQuery, eto ipalit nyo

  const _handleAddButtonClick1 = () => {
    drawerVisibility.add.setVisible(true);
  };
  const _handleAddButtonClick2 = () => {
    drawerVisibility.add.setVisible(true);
  };
  React.useEffect(() => {
    employeeMutator.mutate();
  }, []);

  const _handleRefresh = () => {
    employeeMutator.mutate();
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
        view: {
          visible: drawerVisibility.view.visible,
          set: drawerVisibility.view.setVisible,
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
            <Space>
              <Input.Search placeholder="Search" allowClear />
              <Button icon={<ReloadOutlined />} onClick={_handleRefresh}>
                Refresh
              </Button>
            </Space>
            <Col>
              <Button
                type="primary"
                onClick={_handleAddButtonClick1}
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
            loading={employeeMutator.isLoading}
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

        <CommonDrawer.Add
          visible={drawerVisibility.view.visible}
          onClose={() => drawerVisibility.view.setVisible(false)}
          entityName="Account"
          API={UserAPI}
          FormComponent={EmployeeForms.Account}
        />
      </SelectedDataProvider>
    </DrawerVisiblityProvider>
  );
};

export default EmployeePage;
