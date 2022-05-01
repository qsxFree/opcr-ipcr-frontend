import React, { Component } from "react";
import { Card, Col, Row, Table, Input, Button } from "antd";
import ReactToPrint from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";

const column1 = [
  {
    title: "OUTPUT",
    dataIndex: "output",
    key: "outPut",
  },
  {
    title: "SUCCESS INDICATOR (TARGET + MEASURES)",
    dataIndex: "success-indicators",
    key: "success-indicators",
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

class IpcrPrint extends Component {
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
        <div className="base-container" ref={(el) => (this.componentRef = el)}>
          <Input.Group>
            <Row gutter={1}>
              <Col span={7}></Col>
              <h1>INDIVIDUAL PERFORMANCE COMMITMENT AND REVIEW (IPCR) </h1>
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
                <p>of the</p>
              </Col>

              <Col span={4}>
                <Input style={{ height: 25 }} placeholder="Unit" />
              </Col>

              <Col span={0.5}>
                <p>
                  commit to deliver and agree to be rated on the attainment of
                  the following targets
                </p>
              </Col>
              <Col span={0.5}>
                in accordance with the indicated measures for the period
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
            <br></br>
            <Row gutter={15}>
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
            <div className="base-container">
              <Table columns={column1} />
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
                <h4> Legend: 1-Quantity 2-Efficiency 3-Timeliness 4-Average</h4>
                <h4>
                  Rating Scale: 5-Outstanding 4-Very Satisfactory 3-Satisfactory
                  2-Unsatisfactory 1-Poor
                </h4>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default IpcrPrint;
