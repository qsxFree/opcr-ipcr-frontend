import React from "react";
import { Pie } from "@ant-design/charts";
import { useMutation } from "react-query";
import { AnalyisAPI } from "../../../data/call/Resource";
import { Skeleton } from "antd";

const UserTypePie = () => {
  const [data, setData] = React.useState([]);

  const userTypeMutator = useMutation(AnalyisAPI.userType, {
    onSuccess: (data) => {
      setData(data.data);
    },
  });

  React.useEffect(() => {
    userTypeMutator.mutate();
  }, []);

  const config = {
    appendPadding: 10,
    data,
    angleField: "count",
    colorField: "type",
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return userTypeMutator.isLoading ? <Skeleton /> : <Pie {...config} />;
};

export default UserTypePie;
