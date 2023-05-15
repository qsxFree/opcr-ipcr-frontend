import { Drawer, Space, Button, Row } from "antd";

const Add = ({
  visible,
  onClose,
  children,
  to,
  onCancel,
  onSubmit,
  isLoading,
  width = 500,
  ...restProps
}) => {
  return (
    <Drawer
      title={`Add ${to}`}
      visible={visible}
      onClose={onClose}
      destroyOnClose={true}
      width={width}
      footer={
        <Row justify="end">
          <Space>
            <Button type="default" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" onClick={onSubmit} loading={isLoading}>
              Submit
            </Button>
          </Space>
        </Row>
      }
      {...restProps}
    >
      {children}
    </Drawer>
  );
};

const Edit = ({
  visible,
  onClose,
  children,
  to,
  onCancel,
  onSubmit,
  isLoading,
  width = 500,
  ...restProps
}) => {
  return (
    <Drawer
      title={`Edit ${to}`}
      visible={visible}
      onClose={onClose}
      width={width}
      destroyOnClose={true}
      footer={
        <Row justify="end">
          <Space>
            <Button type="default" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" onClick={onSubmit} loading={isLoading}>
              Update
            </Button>
          </Space>
        </Row>
      }
      {...restProps}
    >
      {children}
    </Drawer>
  );
};

const View = ({
  visible,
  onClose,
  children,
  to,
  width = 500,
  ...restProps
}) => {
  return (
    <Drawer
      title={`View ${to}`}
      width={width}
      visible={visible}
      onClose={onClose}
      {...restProps}
    >
      {children}
    </Drawer>
  );
};

const Custom = ({
  visible,
  onClose,
  children,
  onCancel,
  onSubmit,
  isLoading,
  title,
  onOkText = "Save",
  onCancelText = "Cancel",
  width = 500,
  ...restProps
}) => {
  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      width={width}
      destroyOnClose={true}
      title={title}
      footer={
        <Row justify="end">
          <Space>
            {onCancel && (
              <Button type="default" onClick={onCancel}>
                {onCancelText}
              </Button>
            )}

            {onSubmit && (
              <Button type="primary" onClick={onSubmit} loading={isLoading}>
                {onOkText}
              </Button>
            )}
          </Space>
        </Row>
      }
      {...restProps}
    >
      {children}
    </Drawer>
  );
};

const BaseDrawer = { Add, Edit, View, Custom };

export default BaseDrawer;
