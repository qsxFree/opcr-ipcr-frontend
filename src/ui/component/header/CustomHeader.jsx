import { Affix, Layout, Row, Space, Typography, Tag } from "antd";
import React from "react";
import Logo from "../logo/Logo";
import APP_CONFIG from "../../../data/static/config";
import CustomAvatar from "../avatar/CustomAvatar";
import { useMutation } from "react-query";
import { PeriodAPI } from "../../../data/call/Resource";
import { useSessionStorageState } from "ahooks";

const CustomHeader = () => {
  const [activePeriod, setActivePeriod] = useSessionStorageState(
    "activePeriod",
    {}
  );
  const activePeriodMutator = useMutation(PeriodAPI.getActivePeriod, {
    onSuccess: (data) => {
      setActivePeriod(data.data);
    },
  });

  React.useEffect(() => {
    activePeriodMutator.mutate({ id: "-" });
  }, []);

  return (
    <Affix offsetTop={0}>
      <Layout.Header>
        <Row justify="space-between">
          <Space size="large">
            <Logo.Md />
            <Typography.Title level={3}>
              {APP_CONFIG.applicationName.toUpperCase()}
            </Typography.Title>

            <Tag>PERIOD : {activePeriod.description}</Tag>
          </Space>

          <Space size="large">
            <CustomAvatar />
          </Space>
        </Row>
      </Layout.Header>
    </Affix>
  );
};

export default CustomHeader;
