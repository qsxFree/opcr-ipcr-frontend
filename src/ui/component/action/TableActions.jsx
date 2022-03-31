import { DeleteOutlined, EditOutlined } from "@ant-design/icons/lib/icons";
import { Button, Modal, Space } from "antd";
import React from "react";
import DrawerVisiblityContext from "../../../service/context/DrawerVisiblityContext";
import SelectedDataContext from "../../../service/context/SelectedDataContext";

const TableActions = ({ data, record, hasDelete }) => {
  const drawerVisible = React.useContext(DrawerVisiblityContext);
  const selectedData = React.useContext(SelectedDataContext);

  return (
    <Space align="center">
      <Button
        type="default"
        icon={<EditOutlined />}
        onClick={() => {
          selectedData.setData(record);
          drawerVisible.edit.set(true);
        }}
      />
      {hasDelete ? (
        <Button
          type="default"
          danger
          icon={<DeleteOutlined />}
          onClick={() =>
            Modal.confirm({
              title: "Please confirm",
              content: "Do you really want to delete this data?",
            })
          }
        />
      ) : null}
    </Space>
  );
};

export default TableActions;
