import React from "react";
import { Column } from "@ant-design/charts";
import { Skeleton } from "antd";
import { useMutation } from "react-query";
import { AnalyisAPI } from "../../../data/call/Resource";

const BudgetByPeriodGraph = () => {
  const [data, setData] = React.useState([]);

  const budgetByPeriodMutator = useMutation(AnalyisAPI.budgetByPeriod, {
    onSuccess: (data) => {
      setData(data.data);
    },
  });

  React.useEffect(() => {
    budgetByPeriodMutator.mutate();
  }, []);

  const config = {
    data,
    xField: "name",
    yField: "budget",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return budgetByPeriodMutator.isLoading ? (
    <Skeleton />
  ) : (
    <Column {...config} />
  );
};

export default BudgetByPeriodGraph;
