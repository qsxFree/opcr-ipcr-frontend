import React, { useContext } from "react";
import { PageHeader, Timeline, Row, Col, Select } from "antd";
import NavigatorContext from "../../../service/context/NavigatorContext";

const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onSearch(val) {
  console.log("search:", val);
}

const OperationalPlanPage = () => {
  const navigatorContext = useContext(NavigatorContext);
  navigatorContext.setSelectedKey("operationalPlan");

  return (
    <>
      <PageHeader title="CNSC Operational Plan" subTitle="Operational Plan" />
      <div className="base-container">
        <Row gutter={15}>
          <Col span={11}> </Col>
          <h1>Year 2021-2024</h1>
        </Row>
        <Row gutter={15}>
          <Col span={11}> </Col>
          <Select
            showSearch
            placeholder="Select Year"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="2021">2021</Option>
            <Option value="2022">2022</Option>
            <Option value="2023">2023</Option>
            <Option value="2024">2024</Option>
            <Option value="All">All</Option>
          </Select>
        </Row>
        <br></br>
        <br></br>
        <Timeline mode="alternate">
          <Timeline.Item color="green">
            <b>Year 2021</b>
          </Timeline.Item>

          <Timeline.Item bordered={true} color="green">
            <b>
              FABMANLAB CREATION & FULL SWING OPERATION University of Camarines
              Norte (RA011399) SUPPORT HUB FOR SMART AGRICULTURE(USHSA)
            </b>
            <br></br>
            Agricultural Package Technologies.Controlled Greenhouse System, Food
            Processing Technologies, Non-food
          </Timeline.Item>

          <Timeline.Item color="green">
            <b>EDUCATIONAL TECHNOLOGY INNOVATION DEVELOPMENT CENTER (ETIDC)</b>
            <br></br>
            Innovation of Teaching-Learning Platform (Learning Modules, Film
            Video, Multimedia,Teaching Factory Concept,Online curriculum &
            course development and dispersion).
          </Timeline.Item>

          <Timeline.Item color="green">
            <b>FINANCIAL RESOURCES AUGMENTATION </b>
            <br></br>
            thru PPP, Income generating projects, Utilization of the State-of
            the -Art Facilities
          </Timeline.Item>

          <Timeline.Item color="green">
            <b>APPLICATION OF NEW PROGRAMS </b>
            <br></br>
            Master of Engineering,BS in Architecture, BS in Industrial Design,
            BS in Data Computing
          </Timeline.Item>

          <Timeline.Item color="green">
            <b>FACULTY AND STAFF DEVELOPMENT PROGRAM</b>
            <br></br>
            Professional Enhancement Program(PEP) includes Guidance and
            Counselling Program,Work Attitude and Values Enhancement Program,
            and Stress Management Program
          </Timeline.Item>

          <Timeline.Item color="green">
            <b>CREATION OF SIX COLLEGES AND AN INSTITUTE </b>
            <br></br>
            College of Engineering,College of Education,College of Trades and
            Technology, College Arts and Sciences,College of Architecture and
            Design, Colllege of Business Computing & Entrepreneurship and
            Institute of Health and Sciences
          </Timeline.Item>

          <Timeline.Item color="green">
            <b>ACCREDITATION OF PROGRAMS ISO 90001:2015</b>
          </Timeline.Item>
        </Timeline>
      </div>
    </>
  );
};

export default OperationalPlanPage;
