import React from "react";
import { Table, Row, Col, Input, Button, Space } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import TableActions from "../../component/action/TableActions";
import { useQuery } from "react-query";
import { MfoAPI } from "../../../data/call/Resource";
import CommonDrawer from "../../component/drawer/CommonDrawer";
import useDrawerVisibility from "../../../service/hooks/useDrawerVisibility";
import useTableCommons from "../../../service/hooks/useTableCommons";
import MfoForm from "./component/MfoForm";
import MfoTransoformer from "../../../service/utils/transformer/mfoTransformer";
import { DrawerVisiblityProvider } from "../../../service/context/DrawerVisiblityContext";
import { SelectedDataProvider } from "../../../service/context/SelectedDataContext";
import moment from "moment";
import useRoleChecker from "../../../service/hooks/useRoleChecker";
import { useMutation } from "react-query";

const column = [
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    width: 120,
    fixed: "left",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
  },
];
const MfoPage = () => {
  const drawerVisibility = useDrawerVisibility();
  const commons = useTableCommons({
    id: null,
    code: null,
    name: null,
    year: null,
    description: null,
  });

  const _handleAddButtonClick = () => drawerVisibility.add.setVisible(true);

  const headCheck = useRoleChecker(["ADMIN"]);
  const canEdit = headCheck.check();

  const mfoMutator = useMutation(MfoAPI.retrieveList, {
    onSuccess: (data) => {
      commons.tableData.setter(data.data);
    },
  });

  const propsAddDrawer = {
    visible: drawerVisibility.add.visible,
    onClose: () => drawerVisibility.add.setVisible(false),
    API: MfoAPI,
    entityName: "Major Final Output",
    FormComponent: MfoForm.Add,
    transform: MfoTransoformer.tranformForRequest,
  };

  const propsEditDrawer = {
    visible: drawerVisibility.edit.visible,
    onClose: () => drawerVisibility.edit.setVisible(false),
    API: MfoAPI,
    entityName: "Major Final Output",
    FormComponent: MfoForm.Edit,
    transform: MfoTransoformer.tranformForRequest,
  };

  const extendedColumn = canEdit
    ? {
        title: "Actions",
        fixed: "right",
        width: 100,
        render: (data, record) => {
          return (
            <TableActions
              record={{
                ...record,
                year: moment().year(record.year),
              }}
              hasDelete
            />
          );
        },
      }
    : {};

  React.useEffect(() => {
    mfoMutator.mutate();
  }, []);

  const _handleRefresh = () => {
    mfoMutator.mutate();
  };

  const _onSearch = (value) => {
    mfoMutator.mutate({ search: value });
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
                <Input.Search
                  placeholder="Search"
                  allowClear
                  onSearch={_onSearch}
                />
                <Button icon={<ReloadOutlined />} onClick={_handleRefresh}>
                  Refresh
                </Button>
              </Space>
            </Col>

            <Col>
              <Space>
                {canEdit && (
                  <Button
                    type="primary"
                    onClick={_handleAddButtonClick}
                    icon={<PlusOutlined />}
                  >
                    Add MFO
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
          <br />
          <Table
            columns={[...column, extendedColumn]}
            dataSource={commons.tableData.state}
            loading={mfoMutator.isLoading}
          />
          {canEdit && (
            <>
              <CommonDrawer.Add {...propsAddDrawer} />
              <CommonDrawer.Edit {...propsEditDrawer} />
            </>
          )}
        </div>
      </SelectedDataProvider>
    </DrawerVisiblityProvider>
  );
};

export default MfoPage;
