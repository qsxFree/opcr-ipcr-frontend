import { Statistic, Card, Row, Col, Skeleton } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { AnalyisAPI } from "../../../data/call/Resource";
import React from "react";

const StatisticCards = () => {
  const [data, setData] = React.useState({});
  const statisticMutator = useMutation(AnalyisAPI.statistic, {
    onSuccess: (data) => {
      setData(data.data);
    },
  });

  React.useEffect(() => {
    statisticMutator.mutate();
  }, []);

  return statisticMutator.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <div className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic title="Total Employee" value={data.employee_count} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Active Accounts" value={data.use_count} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Approved Strategic Plan (OPCR) "
                value={data.ostrat_count}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Approved Strategic Plan (IPCR) "
                value={data.istrat_count}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default StatisticCards;
