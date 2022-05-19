import React from "react";
import {
  Table,
  Input,
  Button,
  Typography,
  Row,
  Space,
  Tag,
  Col,
  Tooltip,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import useTableCommons from "../../../service/hooks/useTableCommons";
import { useMutation } from "react-query";
import { StrategicPlanAPI } from "../../../data/call/Resource";
import OpcrTypeTags from "../tags/OpcrTypeTags";

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
};

const column = [
  {
    title: "Office",
    dataIndex: "_office",
    key: "_office",
    render: (data, record) => (
      <Typography.Text>
        <Typography.Text strong>{data.code}</Typography.Text> - {data.name}
      </Typography.Text>
    ),
  },
  {
    title: "Head",
    key: "_head",
    sorter: (a, b) => a.name - b.name,
    render: (data, record) =>
      `${record._office._head.last_name} ${record._office._head.first_name}`,
  },

  {
    title: "Action",
    dataIndex: "action",
    width: 120,
    render: () => (
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
    ),
  },
];

const OpcrTable = () => {
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
        title: "Budget",
        dataIndex: "budget",
        key: "budget",
      },
    ];

    const data = [];
    mainDataSource.forEach((value, index) => {
      if (value._office.id === record._office.id) data.push(value);
    });
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const opcrMutator = useMutation(StrategicPlanAPI.retrieveToBeApprovedOPCR, {
    onSuccess: (data) => {
      console.log(data.data);
      setMainDataSource(data.data);

      commons.tableData.setter(
        data.data
          .filter(
            (value, index, self) =>
              self.findIndex((v) => v._office.id === value._office.id) === index
          )
          .map((value, index) => {
            return { ...value, key: index };
          })
      );
    },
  });

  React.useEffect(() => {
    opcrMutator.mutate();
  }, []);

  const _handleRefresh = () => {
    opcrMutator.mutate();
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
          loading={opcrMutator.isLoading}
          columns={column}
        />
      </div>
    </>
  );
};

export default OpcrTable;
