import { PageHeader, Select, Row, Input } from "antd";
import React, { useContext } from "react";
import ContentTab from "../../component/tabs/ContentTab";
import NavigatorContext from "../../../service/context/NavigatorContext";

const OptionPage = () => {
  const navigatorContext = useContext(NavigatorContext);
  navigatorContext.setSelectedKey("option");

  const { Option } = Select;

  return (
    <>
      <PageHeader title="Option" />

      <div className="base-container">
        <Input.Group>
          <Row gutter={5}>
            <h1>Current Period:</h1>

            <Select
              style={{ width: 150 }}
              placeholder="Select Month"
              allowClear
            >
              <Option value="">Jan-June</Option>
              <Option value="">July-Dec</Option>
            </Select>
          </Row>
        </Input.Group>
      </div>
    </>
  );
};

export default OptionPage;
