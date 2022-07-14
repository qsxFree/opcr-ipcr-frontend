import { PageHeader, Tabs, Alert } from "antd";
import React, { useContext } from "react";
import NavigatorContext from "../../../service/context/NavigatorContext";
import UserTypePie from "./UserTypePie";
import StatisticCards from "./StatisticsCards";
import BudgetByPeriodGraph from "./BudgetByPeriodGraph";
import { useSessionStorageState } from "ahooks";

const HomePage = () => {
  const navigatorContext = useContext(NavigatorContext);
  navigatorContext.setSelectedKey("home");
  const [activePeriod, setActivePeriod] =
    useSessionStorageState("activePeriod");

  return (
    <>
      <PageHeader title="Dashboard" subTitle="Visualization and Insights" />
      <div className="base-container">
        <Alert
          message="Current Period"
          description={activePeriod.description}
          type="info"
          showIcon
        />
        <br />
        <StatisticCards />

        <Tabs defaultActiveKey="user-type">
          <Tabs.TabPane tab="User Type" key="user-type">
            <UserTypePie />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Budget By Period">
            <BudgetByPeriodGraph />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default HomePage;
