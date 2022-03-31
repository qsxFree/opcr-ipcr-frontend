import react, { useContext } from "react";
import { PageHeader } from "antd";
import NavigatorContext from "../../../service/context/NavigatorContext";

const OperationalPlanPage = () => {
  const navigatorContext = useContext(NavigatorContext);
  navigatorContext.setSelectedKey("operationalPlan");

  return (
    <>
      <PageHeader title="CNSC Operational Plan" subTitle="Operational Plan" />

      <div className="base-container"></div>
    </>
  );
};

export default OperationalPlanPage;
