import React from "react";
import { PageHeader } from "antd";
import { useContext } from "react/cjs/react.development";
import NavigatorContext from "../../../service/context/NavigatorContext";
import PresTable from "../../component/Prestable/PresTable";

const StrategicPlanPage = () => {
  const navigatorContext = useContext(NavigatorContext);
  navigatorContext.setSelectedKey("strategicPlan");

  return (
    <>
      <PageHeader title="CNSC Strategic Plan" subTitle="Strategic Priorities" />

      <div className="base-container">
        <PresTable />
      </div>
    </>
  );
};

export default StrategicPlanPage;
