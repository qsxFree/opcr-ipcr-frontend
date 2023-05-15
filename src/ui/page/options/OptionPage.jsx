import {
  PageHeader,
  Select,
  Row,
  Col,
  Space,
  Typography,
  Form,
  Button,
  Divider,
  Modal,
  notification,
  Alert,
} from "antd";
import React, { useContext } from "react";
import NavigatorContext from "../../../service/context/NavigatorContext";
import { PeriodAPI } from "../../../data/call/Resource";
import { useMutation } from "react-query";
import CustomSelect from "../../component/select/CustomSelect";
import { periodOptionMapper } from "../../component/select/OptionMapper";
import { SaveOutlined } from "@ant-design/icons";
import { useSessionStorageState } from "ahooks";

const OptionPage = () => {
  const navigatorContext = useContext(NavigatorContext);
  navigatorContext.setSelectedKey("option");

  const [activePeriod, setActivePeriod] =
    useSessionStorageState("activePeriod");

  let [form] = Form.useForm();

  const periodMutator = useMutation(PeriodAPI.activatePeriod, {
    onSuccess: (data) => {
      console.log(data.data);
      sessionStorage.removeItem("activePeriod");
      setActivePeriod(data.data);
      notification.success({
        message: "Success",
        description: "Settings updated successfully.",
        placement: "bottomRight",
      });
    },
    onError: (err) => {
      console.log(err);
      notification.error({
        message: "Error",
        description: "Cannot update settings.",
        placement: "bottomRight",
      });
    },
  });

  const _handleSave = () => {
    let changeId = form.getFieldValue("period");
    console.log("CHANGE ID", changeId);
    if (activePeriod.id !== changeId) {
      Modal.confirm({
        title: "You are about to save a new period",
        content: "Are you sure to change the current period?",
        onOk: () => {
          return periodMutator.mutateAsync({ id: changeId });
        },
      });
    }
  };

  return (
    <>
      <PageHeader title="Option" />

      <div className="base-container">
        <Form form={form} layout="vertical">
          <Alert
            type="warning"
            message="WARNING"
            showIcon
            description={
              <Typography.Text>
                When updating to new active period, all the unprocessed and
                processed data will be reset. Data in{" "}
                <Typography.Text strong>Strategic Plan</Typography.Text> and{" "}
                <Typography.Text strong>Forms Review</Typography.Text> are being
                filtered based on the active{" "}
                <Typography.Text code>period</Typography.Text>. In short, the
                whole system will be affected if you change the current period.
              </Typography.Text>
            }
          />
          <br />
          <Form.Item
            label="Active Period"
            name="period"
            initialValue={activePeriod.id}
          >
            <CustomSelect.SearchSelect
              optionMap={periodOptionMapper}
              retrieveFn={PeriodAPI.retrieveList}
              initialOptions={[activePeriod]}
            />
          </Form.Item>
        </Form>
        <Divider />
        <Button type="primary" icon={<SaveOutlined />} onClick={_handleSave}>
          Save
        </Button>
      </div>
    </>
  );
};

export default OptionPage;
