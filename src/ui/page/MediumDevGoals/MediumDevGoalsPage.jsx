import react, { useContext } from "react";
import { PageHeader } from "antd";
import NavigatorContext from "../../../service/context/NavigatorContext";

const MediumDevGoalsPage = () => {
  const navigatorContext = useContext(NavigatorContext);
  navigatorContext.setSelectedKey("mediumdevGoals");

  return (
    <>
      <PageHeader title="CNSC Development Goals" subTitle="Development Goals" />

      <div className="base-container"></div>
    </>
  );
};

export default MediumDevGoalsPage;
