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
import { SendOutlined, ReloadOutlined } from "@ant-design/icons";
import useDrawerVisibility from "../../../service/hooks/useDrawerVisibility";
import useTableCommons from "../../../service/hooks/useTableCommons";
import { DrawerVisiblityProvider } from "../../../service/context/DrawerVisiblityContext";
import { SelectedDataProvider } from "../../../service/context/SelectedDataContext";
import { StrategicPlanAPI } from "../../../data/call/Resource";
import { useMutation } from "react-query";
import UserContext from "../../../service/context/UserContext";

const column = [
  {
    title: "Major Final Output",
    key: "mfo",
    render: (data, record) => {
      return (
        <Typography.Text>
          <Typography.Text strong>
            {record._strategic_plan._mfo.code}
          </Typography.Text>
          -{record._strategic_plan._mfo.name}
        </Typography.Text>
      );
    },
  },
  {
    title: "Type",
    key: "type",
    render: (data, record) => {
      let type = null;
      if (record._strategic_plan.type === 1)
        type = <Tag color="geekblue">Strategic Priority</Tag>;
      else if (record._strategic_plan.type === 2)
        type = <Tag color="cyan">Core Functionality</Tag>;
      else if (record._strategic_plan.type === 3)
        type = <Tag color="volcano">Supporting Functionality</Tag>;
      return type;
    },
  },
  {
    title: "Success Indicator",
    dataIndex: "success_indicator",
    key: "success_indicator",
    render: (data, record) => {
      return record._strategic_plan.success_indicator;
    },
  },
];
const IpcrPage = () => {
  const drawerVisibility = useDrawerVisibility();
  const commons = useTableCommons({});
  const user = React.useContext(UserContext);

  const strategicPlanMutator = useMutation(StrategicPlanAPI.retrieveList, {
    onSuccess: (data) => {
      console.log("IPCR DATA ", data.data);
      commons.tableData.setter(
        data.data.map((item) => {
          return { key: item.id, ...item };
        })
      );
    },
  });

  const sendForApprovalMutator = useMutation(StrategicPlanAPI.updateIpcr, {
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

  const _handleAddButtonClick = () => drawerVisibility.add.setVisible(true);

  React.useEffect(() => {
    strategicPlanMutator.mutate({
      employee_id: user.user._employee_profile.id,
    });
  }, []);

  const _handleRefresh = () => {
    strategicPlanMutator.mutate({
      employee_id: user.user._employee_profile.id,
    });
  };

  const _handleRowSelect = (selected, selectedRows, changeRows) => {
    commons.selectedIndex.setter(selectedRows.map((row) => row.id));
  };

  const _handleSearch = (value) => {
    strategicPlanMutator.mutate({
      employee_id: user.user._employee_profile.id,
      search: value,
    });
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
              <Space>
                <Button
                  type="primary"
                  onClick={_handleSendApproval}
                  icon={<SendOutlined />}
                >
                  Send Approval{" "}
                  {commons.selectedIndex.state.length !== 0 &&
                    `(${commons.selectedIndex.state.length})`}
                </Button>
              </Space>
            </Col>
          </Row>
          <br />
          <Table
            columns={column}
            rowSelection={{
              onChange: _handleRowSelect,
              selectedRowKeys: commons.selectedIndex.state,
            }}
            dataSource={commons.tableData.state}
            loading={strategicPlanMutator.isLoading}
          />
        </div>
      </SelectedDataProvider>
    </DrawerVisiblityProvider>
  );
};

export default IpcrPage;
