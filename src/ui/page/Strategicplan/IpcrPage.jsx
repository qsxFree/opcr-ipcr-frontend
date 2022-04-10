import React from "react";
import { Table, Row, Col, Input, Button, Space, Typography, Tag } from "antd";
import { SendOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import TableActions from "../../component/action/TableActions";
import useDrawerVisibility from "../../../service/hooks/useDrawerVisibility";
import useTableCommons from "../../../service/hooks/useTableCommons";
import { DrawerVisiblityProvider } from "../../../service/context/DrawerVisiblityContext";
import { SelectedDataProvider } from "../../../service/context/SelectedDataContext";
import CommonDrawer from "../../component/drawer/CommonDrawer";
import { StrategicPlanAPI } from "../../../data/call/Resource";
import StrategicPlanForm from "./component/StrategicPlanForm";
import { useQuery } from "react-query";


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
    render: (data, record) => {
      console.log(data);
      let type = null;
      if (data === 1) type = <Tag color="geekblue">Strategic Priority</Tag>;
      else if (data === 2) type = <Tag color="cyan">Core Functionality</Tag>;
      else if (data === 3)
        type = <Tag color="volcano">Supporting Functionality</Tag>;
      return type;
    },
  },
  {
    title: "Success Indicator",
    dataIndex: "success_indicator",
    key: "success_indicator",
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
const IpcrPage = () => {
  const drawerVisibility = useDrawerVisibility();
  const commons = useTableCommons({});

  const queryStrategicPlan = useQuery(
    "strategic-plan",
    StrategicPlanAPI.retrieveList,
    {
      onSuccess: (data) => {
        console.log(data.data);
        commons.tableData.setter(data.data);
      },
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    }
  );
  const _handleAddButtonClick = () => drawerVisibility.add.setVisible(true);
  const propsAddDrawer = {
    visible: drawerVisibility.add.visible,
    onClose: () => drawerVisibility.add.setVisible(false),
    API: StrategicPlanAPI,
    entityName: "Strategic Plan",
    FormComponent: StrategicPlanForm.Add,
    width: "60%",
  };

  const propsEditDrawer = {
    visible: drawerVisibility.edit.visible,
    onClose: () => drawerVisibility.edit.setVisible(false),
    API: StrategicPlanAPI,
    entityName: "Strategic Plan",
    FormComponent: StrategicPlanForm.Add,
    width: "60%",
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
              <Space>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={() => queryStrategicPlan.refetch()}
                >
                  Refresh
                </Button>
                <Button
                  type="primary"
                  //onClick={_handleAddButtonClick}
                  icon={<SendOutlined />}
                >
                  Send Approval
                </Button>

              
              </Space>
            </Col>
          </Row>
          <br />
          <Table columns={column} dataSource={commons.tableData.state} />
        </div>

        <CommonDrawer.Add {...propsAddDrawer} />
      </SelectedDataProvider>
    </DrawerVisiblityProvider>
  );
};

export default IpcrPage;
