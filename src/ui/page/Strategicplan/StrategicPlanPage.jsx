import React from "react";
import { PageHeader } from "antd";
import { useContext } from "react/cjs/react.development";
import NavigatorContext from "../../../service/context/NavigatorContext";
import ContentTab from "../../component/tabs/ContentTab";
import MfoPage from "./MfoPage";
import IpcrPage from "./IpcrPage";
import OpcrPage from "./OpcrPage";
//import PresTable from "../../component/Prestable/PresTable";

const StrategicPlanPage = () => {
  const navigatorContext = useContext(NavigatorContext);
  navigatorContext.setSelectedKey("strategicPlan");

  const content = [
    {
      title: "MFO",
      key: "mfo",
      content: <MfoPage />,
    },
    {
      title: "IPCR",
      key: "ipcr",
      content: <IpcrPage />,
    },
    {
      title: "OPCR",
      key: "opcr",
      content: <OpcrPage />,
    },
  ];

  return (
    <>
      <PageHeader title="CNSC Strategic Plan" subTitle="Strategic Priorities" />
      <ContentTab content={content} />
    </>
  );
};

export default StrategicPlanPage;
