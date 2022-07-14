import React from "react";
import { PageHeader } from "antd";
import NavigatorContext from "../../../service/context/NavigatorContext";
import ContentTab from "../../component/tabs/ContentTab";
import { useContext } from "react/cjs/react.development";
import IpcrTable from "../../component/ReviewTableForms/IpcrTable";
import OpcrTable from "../../component/ReviewTableForms/OpcrTable";
import UserContext from "../../../service/context/UserContext";

const ReviewPmtPage = () => {
  const navigatorContext = useContext(NavigatorContext);
  navigatorContext.setSelectedKey("reviewForms");
  const user = React.useContext(UserContext);

  let content = [
    {
      title: "IPCR",
      key: "tab2",
      content: <IpcrTable />,
    },
  ];

  if (user.user._office.is_parent) {
    content = [
      {
        title: "OPCR",
        key: "tab1",
        content: <OpcrTable />,
      },
      ...content,
    ];
  }

  return (
    <>
      <PageHeader title="Forms Review" subTitle="Review OPCR and IPCR Forms" />

      <ContentTab content={content} />
    </>
  );
};

export default ReviewPmtPage;
