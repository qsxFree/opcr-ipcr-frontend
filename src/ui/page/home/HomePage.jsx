import { PageHeader } from "antd";
import React, { useContext } from "react";
import ContentTab from "../../component/tabs/ContentTab";
import NavigatorContext from "../../../service/context/NavigatorContext";

const HomePage = () => {
  const navigatorContext = useContext(NavigatorContext);
  navigatorContext.setSelectedKey("home");

  return (
    <>
      <PageHeader title="Dashboard" subTitle="Visualization and Insights" />
      <div className="base-container">Content Here</div>
    </>
  );
};

export default HomePage;
