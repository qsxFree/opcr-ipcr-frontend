import React from "react";
import {
  Table,
  Input,
  Button,
  Tag,
  Space,
  Tooltip,
  Typography,
  Row,
  Col,
  Modal,
  notification,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PrinterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import useTableCommons from "../../../service/hooks/useTableCommons";
import { useMutation } from "react-query";
import { StrategicPlanAPI } from "../../../data/call/Resource";
import { useSessionStorageState } from "ahooks";
import createIpcrPdf from "../../../service/utils/report/ipcrReport";

const column = [
  {
    title: "Employee Name",
    dataIndex: "_employee",
    key: "_employee",
    sorter: (a, b) => a.last_name - b.last_name,
    render: (data, record) => {
      return `${data.last_name}, ${data.first_name}`;
    },
  },
  {
    title: "Role",
    dataIndex: "_employee",
    key: "_role",
    sorter: (a, b) => a.name - b.name,
    render: (data, record) => {
      return <Tag color="volcano">{data._role.role}</Tag>;
    },
  },
];

const IpcrTable = () => {
  const [mainDataSource, setMainDataSource] = React.useState([]);
  const commons = useTableCommons();
  const [activePeriod, setActivePeriod] =
    useSessionStorageState("activePeriod");

  const expandedRowRender = (record, index, indent, expanded) => {
    const columns = [
      {
        title: "MFO",
        dataIndex: "_mfo",
        key: "mfo",
        render: (data, record) => (
          <Typography.Text>
            <Typography.Text strong>{data.code}</Typography.Text> - {data.name}
          </Typography.Text>
        ),
      },
      {
        title: "Success Indicator",
        dataIndex: "success_indicator",
        key: "success_indicator",
      },
    ];

    const data = [];
    mainDataSource.forEach((value, index) => {
      if (value._employee.id === record._employee.id)
        data.push(value._strategic_plan);
    });
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const ipcrMutator = useMutation(StrategicPlanAPI.retrieveToBeApprovedIPCR, {
    onSuccess: (data) => {
      setMainDataSource(data.data);

      commons.tableData.setter(
        data.data
          .filter(
            (value, index, self) =>
              self.findIndex((v) => v._employee.id === value._employee.id) ===
              index
          )
          .map((value, index) => {
            return { ...value, key: index };
          })
      );
    },
  });

  const updateStrategicPlanMutator = useMutation(StrategicPlanAPI.updateIpcr, {
    onSuccess: (data) => {
      _handleRefresh();
      notification.success({
        message: "Success",
        description: "Strategic Plan has been updated",
        placement: "bottomRight",
      });
    },
    onError: (err) => {
      notification.error({
        message: "Error",
        description: "Error on updating strategic plan",
        placement: "bottomRight",
      });
    },
  });

  React.useEffect(() => {
    ipcrMutator.mutate();
  }, []);

  const _handleRefresh = () => {
    ipcrMutator.mutate();
  };

  const _handleApprove = (record) => {
    return () => {
      Modal.confirm({
        title: `Are you sure you want to approve ${record._employee.last_name}'s IPCR?`,
        content:
          "Once approved, changes cannot be undone. Do you want to proceed?",
        onOk: () =>
          updateStrategicPlanMutator.mutateAsync({
            id: 2,
            data: mainDataSource
              .filter((value) => value._employee.id === record._employee.id)
              .map((value) => value.id),
          }),
      });
    };
  };
  const _handleReject = (record) => {
    return () => {
      Modal.confirm({
        title: `Are you sure you want to reject ${record._employee.last_name}'s IPCR?`,
        content:
          "Once approved, changes cannot be undone. Do you want to proceed?",
        onOk: () =>
          updateStrategicPlanMutator.mutateAsync({
            id: 0,
            data: mainDataSource
              .filter((value) => value._employee.id === record._employee.id)
              .map((value) => value.id),
          }),
      });
    };
  };
  const _handleOnPrint = (record) => {
    return () => {
      console.log(record);
      const employee = record[0]._employee;
      const office = employee._role._office;

      createIpcrPdf({
        completeName: `${employee.last_name} ${
          employee.middle_name ? `${employee.middle_name.charAt(0)}.` : ""
        } ${employee.first_name}`,
        positionRank: employee._role.role,
        officeName: office.name,
        period: activePeriod.description,
        _approved_by: record[0]._approved_by,
        date_approved: record[0].date_approved,
        record: record,
      });
    };
  };

  const colExtension = [
    ...column,

    {
      title: "Actions",
      width: 50,
      render: (data, record) => {
        const filteredStratPlan = mainDataSource.filter(
          (value) => value._employee.id === record._employee.id
        );
        const toBePrint =
          filteredStratPlan.filter((value) => value.status === 1).length > 0;
        return !toBePrint ? (
          <Button
            type="primary"
            icon={<PrinterOutlined />}
            onClick={_handleOnPrint(filteredStratPlan)}
          >
            Print
          </Button>
        ) : (
          <Space>
            <Tooltip title="Approve">
              <Button
                style={{ borderColor: "#73d13d" }}
                icon={<CheckCircleOutlined style={{ color: "#73d13d" }} />}
                onClick={_handleApprove(record)}
              />
            </Tooltip>

            <Tooltip title="Reject">
              <Button
                icon={<CloseCircleOutlined />}
                danger
                onClick={_handleReject(record)}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <div className="base-container">
        <Row>
          <Col>
            <Space>
              <Input.Search placeholder="Search" allowClear />
              <Button icon={<ReloadOutlined />} onClick={_handleRefresh}>
                Refresh
              </Button>
            </Space>
          </Col>
        </Row>
        <br />

        <Table
          dataSource={commons.tableData.state}
          expandable={{ expandedRowRender }}
          loading={ipcrMutator.isLoading}
          columns={colExtension}
        />
      </div>
    </>
  );
};

export default IpcrTable;
