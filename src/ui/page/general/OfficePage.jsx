import React from "react";
import { Table, Row, Col, Input, Button } from "antd";
import TableActions from "../../component/action/TableActions";
import { PlusOutlined } from "@ant-design/icons";
import useDrawerVisibility from "../../../service/hooks/useDrawerVisibility";
import useTableCommons from "../../../service/hooks/useTableCommons";
import { DrawerVisiblityProvider } from "../../../service/context/DrawerVisiblityContext";
import { SelectedDataProvider } from "../../../service/context/SelectedDataContext";
import CommonDrawer from "../../component/drawer/CommonDrawer";
import OfficeForms from "./components/OfficeForms";
import { OfficeAPI } from "../../../data/call/Resource";
import { useQuery } from "react-query";

const column = [
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    width: 100,
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
    width: 250,
    render: (data, row) => {
      return data && data.last_name + ", " + data.first_name;
    },
  },
  {
    title: "Parent",
    dataIndex: "_parent",
    key: "parent",
    render: (data, row) => {
      return data !== null ? data.map((item) => item.code).join(", ") : null;
    },
  },
  {
    title: "Actions",
    fixed: "right",
    width: 100,
    render: (data, record) => {
      return <TableActions hasDelete record={record} />;
    },
  },
];

const OfficePage = () => {
  const drawerVisibility = useDrawerVisibility();
  const commons = useTableCommons({
    code: null,
    name: null,
    _head: { id: null },
    _parent: { id: null },
  });

  const _handleAddButtonClick = () => {
    drawerVisibility.add.setVisible(true);
  };

  const queryOffice = useQuery("office", OfficeAPI.retrieveList, {
    onSuccess: (data) => {
      commons.tableData.setter(data.data);
    },
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });

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
                Add Office
              </Button>
            </Col>
          </Row>
          <br />
          <Table
            columns={column}
            dataSource={commons.tableData.state}
            loading={queryOffice.isLoading}
          />
        </div>

        <CommonDrawer.Add
          visible={drawerVisibility.add.visible}
          onClose={() => drawerVisibility.add.setVisible(false)}
          entityName="Office"
          API={OfficeAPI}
          FormComponent={OfficeForms.Add}
        />

        <CommonDrawer.Edit
          visible={drawerVisibility.edit.visible}
          onClose={() => drawerVisibility.edit.setVisible(false)}
          entityName="Office"
          API={OfficeAPI}
          FormComponent={OfficeForms.Edit}
        />
      </SelectedDataProvider>
    </DrawerVisiblityProvider>
  );
};

export default OfficePage;
