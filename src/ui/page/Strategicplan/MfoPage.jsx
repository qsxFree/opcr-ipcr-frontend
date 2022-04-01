import React from "react";
import { Table, Row, Col, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableActions from "../../component/action/TableActions";
import { useQuery } from "react-query";
import { MfoAPI } from "../../../data/call/Resource";
import useDrawerVisibility from "../../../service/hooks/useDrawerVisibility";
import useTableCommons from "../../../service/hooks/useTableCommons";

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
  {
    title: "Actions",
    fixed: "right",
    width: 100,
    render: (data, record) => {
      return <TableActions hasDelete />;
    },
  },
];
const MfoPage = () => {
  const drawerVisibility = useDrawerVisibility();
  const commons = useTableCommons({
    code: null,
  });

  const queryEmployee = useQuery("mfo", MfoAPI.retrieveList, {
    onSuccess: (data) => {
      commons.tableData.setter(data.data);
    },
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="base-container">
        <Row justify="space-between">
          <Col>
            <Input.Search />
          </Col>
          <Col>
            <Button
              type="primary"
              //onClick={_handleAddButtonClick}
              icon={<PlusOutlined />}
            >
              Add MFO
            </Button>
          </Col>
        </Row>
        <br />
        <Table columns={column} dataSource={commons.tableData.state} />
      </div>
    </>
  );
};

export default MfoPage;
