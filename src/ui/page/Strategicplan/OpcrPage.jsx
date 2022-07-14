import React from "react";
import {
  Table,
  Row,
  Col,
  Input,
  Button,
  Space,
  Typography,
  Tag,
  Modal,
  notification,
} from "antd";
import { SendOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import TableActions from "../../component/action/TableActions";
import useDrawerVisibility from "../../../service/hooks/useDrawerVisibility";
import useTableCommons from "../../../service/hooks/useTableCommons";
import { DrawerVisiblityProvider } from "../../../service/context/DrawerVisiblityContext";
import { SelectedDataProvider } from "../../../service/context/SelectedDataContext";
import CommonDrawer from "../../component/drawer/CommonDrawer";
import OpcrTypeTags from "../../component/tags/OpcrTypeTags";
import { StrategicPlanAPI } from "../../../data/call/Resource";
import StrategicPlanForm from "./component/StrategicPlanForm";
import useRoleChecker from "../../../service/hooks/useRoleChecker";
import { useMutation } from "react-query";

const column = [
  {
    title: "Major Final Output",
    dataIndex: "_mfo",
    key: "mfo",
    render: (data, record) => {
      return (
        <Typography.Text>
          <Typography.Text strong>{data.code}</Typography.Text>-{data.name}
        </Typography.Text>
      );
    },
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (data, record) => <OpcrTypeTags data={data} />,
  },

  {
    title: "Success Indicator",
    dataIndex: "success_indicator",
    key: "success_indicator",
  },

  {
    title: "Allotted Budget",
    dataIndex: "budget",
    key: "budget",
  },

  {
    title: "Office",
    dataIndex: "_office",
    key: "budget",
    render: (data, record) => {
      return data.code;
    },
  },
];

const OpcrPage = () => {
  const drawerVisibility = useDrawerVisibility();
  const commons = useTableCommons({});
  const headCheck = useRoleChecker(["ADMIN", "HEAD"]);
  const canEdit = headCheck.check();

  const strategicPlanMutator = useMutation(StrategicPlanAPI.retrieveList, {
    onSuccess: (data) => {
      commons.tableData.setter(
        data.data.map((item) => {
          return { key: item.id, ...item };
        })
      );
    },
  });

  const sendForApprovalMutator = useMutation(StrategicPlanAPI.updateOpcr, {
    onSuccess: (data) => {
      commons.selectedIndex.setter([]);
      notification.success({
        message: "Success",
        description: "Strategic Plan has been sent for approval",
        placement: "bottomRight",
      });
    },
    onError: (err) => {
      notification.error({
        message: "Error",
        description: "Error on sending request",
        placement: "bottomRight",
      });
    },
  });

  const propsAddDrawer = {
    visible: drawerVisibility.add.visible,
    onClose: () => drawerVisibility.add.setVisible(false),
    API: StrategicPlanAPI,
    entityName: "Strategic Plan",
    FormComponent: StrategicPlanForm.Add,
    width: "80%",
  };

  const propsEditDrawer = {
    visible: drawerVisibility.edit.visible,
    onClose: () => drawerVisibility.edit.setVisible(false),
    API: StrategicPlanAPI,
    entityName: "Strategic Plan",
    FormComponent: StrategicPlanForm.Add,
    width: "60%",
  };

  const extendedColumn = canEdit
    ? {
        title: "Actions",
        fixed: "right",
        width: 100,
        render: (data, record) => {
          return <TableActions hasDelete />;
        },
      }
    : {};

  React.useEffect(() => {
    strategicPlanMutator.mutate();
  }, []);

  const _handleAddButtonClick = () => drawerVisibility.add.setVisible(true);

  const _handleRefresh = () => {
    strategicPlanMutator.mutate();
  };
  const _handleSearch = (value) => {
    strategicPlanMutator.mutate({
      search: value,
    });
  };

  const _handleRowSelect = (selected, selectedRows, changeRows) => {
    commons.selectedIndex.setter(selectedRows.map((row) => row.id));
  };

  const _handleSendApproval = () => {
    if (commons.selectedIndex.state.length > 0) {
      Modal.confirm({
        title: `Send request for approval for ${commons.selectedIndex.state.length} item/s?`,
        content:
          "Once confirmed, changes cannot be undone. Do you want to proceed?",
        onOk: () =>
          sendForApprovalMutator.mutateAsync({
            id: 1, // 1 stands for "PENDING"
            data: commons.selectedIndex.state,
          }),
      });
    }
  };

  const utilityButtons = canEdit && (
    <>
      <Button
        type="primary"
        onClick={_handleSendApproval}
        icon={<SendOutlined />}
      >
        Send Approval{" "}
        {commons.selectedIndex.state.length !== 0 &&
          `(${commons.selectedIndex.state.length})`}
      </Button>

      <Button
        type="primary"
        onClick={_handleAddButtonClick}
        icon={<PlusOutlined />}
      >
        Add Strategic Plan
      </Button>
    </>
  );

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
                  onSearch={_handleSearch}
                />
                <Button icon={<ReloadOutlined />} onClick={_handleRefresh}>
                  Refresh
                </Button>
              </Space>
            </Col>
            <Col>
              <Space>{utilityButtons}</Space>
            </Col>
          </Row>
          <br />
          <Table
            columns={[...column, extendedColumn]}
            rowSelection={{
              onChange: _handleRowSelect,
              selectedRowKeys: commons.selectedIndex.state,
            }}
            dataSource={commons.tableData.state}
            loading={strategicPlanMutator.isLoading}
          />
        </div>

        {canEdit && <CommonDrawer.Add {...propsAddDrawer} />}
      </SelectedDataProvider>
    </DrawerVisiblityProvider>
  );
};

export default OpcrPage;
