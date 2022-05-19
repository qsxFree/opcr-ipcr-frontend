import React from "react";
import {
  Table,
  Space,
  Row,
  Col,
  Input,
  Button,
  Drawer,
  Data,
  Typography,
  column,
  Tag,
} from "antd";
import TableActions from "../../component/action/TableActions";
import useDrawerVisibility from "../../../service/hooks/useDrawerVisibility";
import { DrawerVisiblityProvider } from "../../../service/context/DrawerVisiblityContext";
import {
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import CommonDrawer from "../../component/drawer/CommonDrawer";
import PeriodForm from "./components/PeriodForm";
import useTableCommons from "../../../service/hooks/useTableCommons";
import { useMutation } from "react-query";
import { PeriodAPI } from "../../../data/call/Resource";

const columns = [
  {
    title: "Code",
    dataIndex: "name",
    key: "code",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "desc",
  },

  {
    title: "Action",
    width: 120,
    render: (data, record) => <TableActions hasDelete />,
  },
];

const PeriodPage = () => {
  const drawerVisibility = useDrawerVisibility();
  const commons = useTableCommons();
  const _handleAddButtonClick = () => {
    drawerVisibility.add.setVisible(true);
  };

  const periodMutator = useMutation(PeriodAPI.retrieveList, {
    onSuccess: (data) => {
      commons.tableData.setter(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  React.useEffect(() => {
    periodMutator.mutate();
  }, []);
  const _handleRefresh = () => {
    periodMutator.mutate();
  };

  return (
    <DrawerVisiblityProvider
      value={{
        add: {
          visible: drawerVisibility.add.visible,
          set: drawerVisibility.add.setVisible,
        },
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
              onClick={_handleAddButtonClick}
              icon={<PlusOutlined />}
            >
              Add Period
            </Button>
          </Col>
        </Row>
        <br />
        <Table
          dataSource={commons.tableData.state}
          columns={columns}
          loading={periodMutator.isLoading}
        />
      </div>

      <CommonDrawer.Add
        visible={drawerVisibility.add.visible}
        onClose={() => drawerVisibility.add.setVisible(false)}
        entityName="Period"
        API={PeriodAPI}
        FormComponent={PeriodForm.Add}
      />
    </DrawerVisiblityProvider>
  );
};

export default PeriodPage;
