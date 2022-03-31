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

const dataSource = [
  {
    code: "OP",
    name: "Office of the President",
    _head: "Adrian Rodriguez",
  },
  {
    code: "OVPRE",
    name: "Office of the Vice President",
    _head: "Joyjoy Yate",
    _parent: "OP Office opf the President",
  },
];

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
    /* render: (data, row) => {
      return data !== null ? data.first_name + " " + data.last_name : null;
    },*/
  },
  {
    title: "Parent",
    dataIndex: "_parent",
    key: "parent",
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

const OfficePage = () => {
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
                Add Office
              </Button>
            </Col>
          </Row>
          <br />
          <Table columns={column} dataSource={dataSource} />
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
