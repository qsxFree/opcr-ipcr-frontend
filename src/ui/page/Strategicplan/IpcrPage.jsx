import React from "react";
import { Table, Row, Col, Input, Button, Space, Typography, Tag } from "antd";
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
];
const IpcrPage = () => {
  const drawerVisibility = useDrawerVisibility();
  const commons = useTableCommons({});
  const user = React.useContext(UserContext);

  const strategicPlanMutation = useMutation(StrategicPlanAPI.retrieveList, {
    onSuccess: (data) => {
      commons.tableData.setter(data.data);
    },
  });

  React.useEffect(() => {
    strategicPlanMutation.mutate({ employee_id: user.user.id });
  }, []);

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
                  onClick={() =>
                    strategicPlanMutation.mutate({ employee_id: user.user.id })
                  }
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
          <Table
            rowSelection={{ type: "checkbox" }}
            columns={column}
            dataSource={commons.tableData.state}
          />
        </div>
      </SelectedDataProvider>
    </DrawerVisiblityProvider>
  );
};

export default IpcrPage;
