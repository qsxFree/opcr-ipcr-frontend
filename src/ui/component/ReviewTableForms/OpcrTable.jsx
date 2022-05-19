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
  notification,
  Modal,
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
import OpcrTypeTags from "../tags/OpcrTypeTags";
import createOpcrPdf from "../../../service/utils/report/opcrReport";
import { useSessionStorageState } from "ahooks";

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
];

const OpcrTable = () => {
  const [mainDataSource, setMainDataSource] = React.useState([]);
  const [activePeriod, setActivePeriod] =
    useSessionStorageState("activePeriod");
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

  const updateStrategicPlanMutator = useMutation(StrategicPlanAPI.updateOpcr, {
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
    opcrMutator.mutate();
  }, []);

  const _handleRefresh = () => {
    opcrMutator.mutate();
  };

  const _handleApprove = (record) => {
    return () => {
      Modal.confirm({
        title: `Are you sure you want to approve ${record._office.code}'s OPCR?`,
        content:
          "Once approved, changes cannot be undone. Do you want to proceed?",
        onOk: () =>
          updateStrategicPlanMutator.mutateAsync({
            id: 2,
            data: mainDataSource
              .filter((value) => value._office.id === record._office.id)
              .map((value) => value.id),
          }),
      });
    };
  };
  const _handleReject = (record) => {
    return () => {
      Modal.confirm({
        title: `Are you sure you want to reject ${record._office.code}'s OPCR?`,
        content:
          "Once approved, changes cannot be undone. Do you want to proceed?",
        onOk: () =>
          updateStrategicPlanMutator.mutateAsync({
            id: 0,
            data: mainDataSource
              .filter((value) => value._office.id === record._office.id)
              .map((value) => value.id),
          }),
      });
    };
  };

  const _handleOnPrint = (record) => {
    return () => {
      console.log(record);
      const office = record[0]._office;
      const head = office._head;
      const role = head._role;

      createOpcrPdf({
        completeName: `${head.last_name} ${
          head.middle_name && `${head.middle_name.charAt(0)}.`
        } ${head.first_name}`,
        positionRank: role.role,
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
      title: "Action",
      width: 120,
      render: (data, record) => {
        const filteredStratPlan = mainDataSource.filter(
          (value) => value._office.id === record._office.id
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
          loading={opcrMutator.isLoading}
          columns={colExtension}
        />
      </div>
    </>
  );
};

export default OpcrTable;
