import { PageHeader } from "antd";
import React, { useContext } from "react";
import ContentTab from "../../component/tabs/ContentTab";
import EmployeePage from "./EmployeePage";
import PeriodPage from "./PeriodPage";
import OfficePage from "./OfficePage";
import RolePage from "./RolePage";
import NavigatorContext from "../../../service/context/NavigatorContext";

const content = [
  {
    title: "Office",
    key: "office",
    content: <OfficePage />,
  },
  {
    title: "Employee",
    key: "employee",
    content: <EmployeePage />,
  },
  {
    title: "Role",
    key: "role",
    content: <RolePage />,
  },
  {
    title: "Period",
    key: "period",
    content: <PeriodPage />,
  },
];

const GeneralPage = () => {
  const navigatorContext = useContext(NavigatorContext);
  navigatorContext.setSelectedKey("general");
  return (
    <>
      <PageHeader title="General" />
      <ContentTab content={content} />
    </>
  );
};

export default GeneralPage;
