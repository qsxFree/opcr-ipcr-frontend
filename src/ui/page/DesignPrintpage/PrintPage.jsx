import React, { Component } from "react";
import { Card, Col, Row, Table, Input, Button } from "antd";
import ReactToPrint from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";

const column1 = [
  {
    title: "MFO/PAP",
    dataIndex: "mfo-pap",
    key: "mfo-pap",
  },
  {
    title: "SUCCESS INDICATOR (TARGET + MEASURES)",
    dataIndex: "success-indicators",
    key: "success-indicators",
  },
  {
    title: "Allotted Budget",
    dataIndex: "alloted-budget",
    key: "alloted-budget",
  },
  {
    title: "Unit/Section/Individuals Accountable",
    dataIndex: "usi",
    key: "usi",
  },
  {
    title: "Actual Accomplishment",
    dataIndex: "actual-accomplishment",
    key: "actual-accomplishment",
  },
  {
    title: "RATING",
    children: [
      {
        title: "Q1",
        dataIndex: "q1",
        key: "q1",
      },
      {
        title: "E2",
        dataIndex: "e2",
        key: "e2",
      },
      {
        title: "T3",
        dataIndex: "t3",
        key: "t3",
      },
      {
        title: "A4",
        dataIndex: "a4",
        key: "a4",
      },
    ],
  },
  {
    title: "REMARKS",
    dataIndex: "remarks",
    key: "remarks",
  },
];
const column2 = [
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "MFO",
    dataIndex: "mfo",
    key: "mfo",
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
  },
];
class PrintPage extends Component {
  render() {
    return (
      <>
        <div className="base-container">
          <ReactToPrint
            trigger={() => {
              return (
                <Button type="primary" icon={<PrinterOutlined />}>
                  Print
                </Button>
              );
            }}
            content={() => this.componentRef}
            documentTitle="new document"
            pageStyle="print"
            copyStyles="true"
          />
        </div>

        <div ref={(el) => (this.componentRef = el)}>
          <div className="base-container">
            <Input.Group>
              <Row gutter={1}>
                <Col span={8}></Col>
                <h1>OFFICE PERFORMANCE COMMITMENT AND REVIEW (OPCR) </h1>
              </Row>
              <br></br>

              <Row gutter={1}>
                <Col span={1}></Col>
                <p>I, </p>
                <Col span={4}>
                  <Input style={{ height: 25 }} placeholder="Complete Name" />
                </Col>

                <Col span={0.5}>
                  <p>,</p>
                </Col>
                <Col span={4}>
                  <Input style={{ height: 25 }} placeholder="Position/Rank" />
                </Col>
                <Col span={0.5}></Col>

                <Col span={0.5}>
                  <p>Head of the</p>
                </Col>

                <Col span={4}>
                  <Input style={{ height: 25 }} placeholder="Name of Office" />
                </Col>

                <Col span={0.5}>
                  <p>
                    commit to deliver and agree to be rated on the attainment of
                    the following
                  </p>
                </Col>
                <Col span={0.5}>
                  targets in accordance with the indicated measures for the
                  period
                </Col>
                <Col span={0.5}></Col>
                <Col span={3}>
                  <Input style={{ height: 25 }} placeholder="Month" />
                </Col>
                <Col span={0.5}></Col>
                <Col span={0.5}>
                  <p>to</p>
                </Col>
                <Col span={0.5}></Col>
                <Col span={3}>
                  <Input style={{ height: 25 }} placeholder="Month" />
                </Col>

                <Col span={0.5}>
                  <p>,</p>
                </Col>
                <Col span={0.5}></Col>
                <Col span={0.5}>
                  <p>20</p>
                </Col>
                <Col span={0.5}></Col>
                <Col span={1}>
                  <Input style={{ height: 25 }} />
                </Col>
                <Col span={0.5}>
                  <p>.</p>
                </Col>
              </Row>
              <br></br>
              <Row gutter={12}>
                <Col span={19}></Col>
                <Col>
                  <p>Ratee:</p>
                  <Col span={0.5}></Col>
                </Col>
                <Col span={4}>
                  <Input style={{ height: 25 }} />
                </Col>
              </Row>
              <Row gutter={20}>
                <Col span={19}></Col>
                <Col>
                  <p>Date:</p>
                  <Col span={0.5}></Col>
                </Col>
                <Col span={4}>
                  <Input style={{ height: 25 }} />
                </Col>
              </Row>
            </Input.Group>
            <div className="site-card-wrapper">
              <Row gutter={5}>
                <Col span={8}>
                  <Card size="small" title="Reviewed by:" bordered={true}>
                    <Card style={{ height: 50 }}></Card>
                    <Card style={{ height: 17, marginTop: 5 }}></Card>
                  </Card>
                </Col>
                <Col span={4}>
                  <Card size="small" title="Date" bordered={true}>
                    <div style={{ height: 72 }}></div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card size="small" title="Approved by:" bordered={true}>
                    <Card style={{ height: 50 }}></Card>

                    <Card style={{ height: 17, marginTop: 5 }}></Card>
                  </Card>
                </Col>
                <Col span={4}>
                  <Card size="small" title="Date" bordered={true}>
                    <div style={{ height: 72 }}></div>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
          <div className="base-container">
            <Table columns={column1} />
          </div>
          <h1 style={{ marginLeft: 30 }}>Average Rating</h1>
          <div className="base-container">
            <Table columns={column2} />
          </div>
          <div className="base-container">
            <div className="site-card-wrapper">
              <Row gutter={5}>
                <Col span={5}>
                  <Card size="small" title="Assessed by:" bordered={true}>
                    <Card style={{ height: 50 }}></Card>
                    <Card style={{ height: 17, marginTop: 5 }}></Card>
                  </Card>
                </Col>
                <Col span={3}>
                  <Card size="small" title="Date" bordered={true}>
                    <div style={{ height: 72 }}></div>
                  </Card>
                </Col>
                <Col span={5}>
                  <Card size="small" title=".." bordered={true}>
                    <Card style={{ height: 50 }}></Card>

                    <Card style={{ height: 17, marginTop: 5 }}></Card>
                  </Card>
                </Col>
                <Col span={3}>
                  <Card size="small" title="Date" bordered={true}>
                    <div style={{ height: 72 }}></div>
                  </Card>
                </Col>
                <Col span={5}>
                  <Card size="small" title="Final Rating by:" bordered={true}>
                    <Card style={{ height: 50 }}></Card>

                    <Card style={{ height: 17, marginTop: 5 }}></Card>
                  </Card>
                </Col>
                <Col span={3}>
                  <Card size="small" title="Date" bordered={true}>
                    <div style={{ height: 72 }}></div>
                  </Card>
                </Col>
              </Row>
            </div>
            <div className="base-container">
              <h5> Legend: 1-Quantity 2-Efficiency 3-Timeliness 4-Average</h5>
              <h5>
                Rating Scale: 5-Outstanding 4-Very Satisfactory 3-Satisfactory
                2-Unsatisfactory 1-Poor
              </h5>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default PrintPage;
