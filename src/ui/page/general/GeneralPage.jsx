import { PageHeader } from "antd";
import React from "react";
import ContentTab from "../../component/tabs/ContentTab";
import EmployeePage from "./EmployeePage";
import MileStonePage from "./MileStonePage";
import OfficePage from "./OfficePage";
import RolePage from "./RolePage";

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
    title: "Milestone",
    key: "milestone",
    content: <MileStonePage />,
  },
];

const GeneralPage = () => {
  return (
    <>
      <PageHeader title="General" />
      <ContentTab content={content} />
    </>
  );
};

export default GeneralPage;
