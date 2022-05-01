import React from "react";
import { PageHeader, Row, Space, Tag, Typography } from "antd";
import { useContext } from "react/cjs/react.development";
import NavigatorContext from "../../../service/context/NavigatorContext";
import ContentTab from "../../component/tabs/ContentTab";
import MfoPage from "./MfoPage";
import IpcrPage from "./IpcrPage";
import OpcrPage from "./OpcrPage";
import PrintPage from "../DesignPrintpage/PrintPage";
import UserContext from "../../../service/context/UserContext";
import IpcrPrint from "../DesignPrintpage/IpcrPrint";
//import PresTable from "../../component/Prestable/PresTable";

const StrategicPlanPage = () => {
  const navigatorContext = useContext(NavigatorContext);
  navigatorContext.setSelectedKey("strategicPlan");
  const user = React.useContext(UserContext);

  const content = [
    {
      title: "MFO",
      key: "mfo",
      content: <MfoPage />,
    },
    {
      title: "OPCR",
      key: "opcr",
      content: <OpcrPage />,
    },
    {
      title: "IPCR",
      key: "ipcr",
      content: <IpcrPage />,
    },
    {
      title: "Print",
      key: "print",
      content: <PrintPage />,
    },
    {
      title: "PrintIpcr",
      key: "printipcr",
      content: <IpcrPrint />,
    },
  ];

  return (
    <>
      <PageHeader
        title="CNSC Strategic Plan"
        subTitle="Strategic Priorities"
        extra={
          <Space direction="vertical">
            <Tag color="gold">
              <Typography.Text strong>Office : </Typography.Text>
              {user.user._office.name}
            </Tag>
            <Tag color="volcano">
              <Typography.Text strong>Role : </Typography.Text>{" "}
              {user.user._role.name}
            </Tag>
          </Space>
        }
      />
      <ContentTab content={content} />
    </>
  );
};

export default StrategicPlanPage;
