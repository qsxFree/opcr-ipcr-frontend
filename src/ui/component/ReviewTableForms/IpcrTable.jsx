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

  {
    title: "Actions",
    dataIndex: "action",
    width: 50,
    render: (data, record) => {
      return record.status === 1 ? (
        <Space>
          <Tooltip title="Approve">
            <Button
              style={{ borderColor: "#73d13d" }}
              icon={<CheckCircleOutlined style={{ color: "#73d13d" }} />}
            />
          </Tooltip>

          <Tooltip title="Reject">
            <Button icon={<CloseCircleOutlined />} danger />
          </Tooltip>
        </Space>
      ) : (
        <Button type="primary" icon={<PrinterOutlined />}>
          Print
        </Button>
      );
    },
  },
];

const IpcrTable = () => {
  const [mainDataSource, setMainDataSource] = React.useState([]);
  const commons = useTableCommons();

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

  React.useEffect(() => {
    ipcrMutator.mutate();
  }, []);

  const _handleRefresh = () => {
    ipcrMutator.mutate();
  };

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
          columns={column}
        />
      </div>
    </>
  );
};

export default IpcrTable;
