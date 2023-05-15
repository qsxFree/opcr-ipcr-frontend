import { Form, notification } from "antd";
import React from "react";
import { useMutation } from "react-query";
import SelectedDataContext from "../../../service/context/SelectedDataContext";
import BaseDrawer from "./_base/BaseDrawer";

const Add = ({
  visible,
  onClose,
  API,
  entityName,
  FormComponent,
  transform = null,
  validate = false,
  ...restProps
}) => {
  const [form] = Form.useForm();

  const _mutation = useMutation(API.create, {
    onSuccess: (data) => {
      form.resetFields();
      notification.success({
        title: "Success",
        description: `${entityName} has been added`,
        placement: "bottomRight",
      });
    },
    onError: (error) => {
      notification.error({
        title: "An error has occured",
        description: `Error on adding ${entityName.toLowerCase()}`,
        placement: "bottomRight",
      });
    },
  });

  const _submit = () => {
    if (validate) {
      form.validateFields().then(() => {
        _mutation.mutate(
          transform !== null
            ? transform(form.getFieldsValue())
            : form.getFieldsValue()
        );
      });
    } else {
      _mutation.mutate(
        transform !== null
          ? transform(form.getFieldsValue())
          : form.getFieldsValue()
      );
    }
  };

  const _cancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <BaseDrawer.Add
      visible={visible}
      onClose={onClose}
      to={entityName}
      onCancel={_cancel}
      onSubmit={_submit}
      isLoading={_mutation.isLoading}
      {...restProps}
    >
      <FormComponent form={form} />
    </BaseDrawer.Add>
  );
};

const Edit = ({
  visible,
  onClose,
  API,
  entityName,
  FormComponent,
  transform = null,
  validate = false,
  ...restProps
}) => {
  const selectedData = React.useContext(SelectedDataContext);
  const [form] = Form.useForm();
  const _mutation = useMutation(API.update, {
    onSuccess: (data) => {
      form.resetFields();
      notification.success({
        title: "Success",
        description: `${entityName} has been updated`,
        placement: "bottomRight",
      });
    },
    onError: (error) => {
      notification.error({
        title: "An error has occured",
        description: `Error on updating ${entityName.toLowerCase()}`,
        placement: "bottomRight",
      });
    },
  });

  const _submit = () => {
    console.log(form.getFieldValue());
    if (validate) {
      form.validateFields().then(() => {
        _mutation.mutate(
          transform !== null
            ? { id: selectedData.data.id, ...transform(form.getFieldsValue()) }
            : {
                ...form.getFieldsValue(),
                id: selectedData.data.id,
              }
        );
      });
    } else {
      _mutation.mutate(
        transform !== null
          ? { id: selectedData.data.id, ...transform(form.getFieldsValue()) }
          : {
              ...form.getFieldsValue(),
              id: selectedData.data.id,
            }
      );
    }
  };

  const _cancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <BaseDrawer.Edit
      visible={visible}
      onClose={onClose}
      to={entityName}
      onCancel={_cancel}
      onSubmit={_submit}
      isLoading={_mutation.isLoading}
      {...restProps}
    >
      <FormComponent form={form} />
    </BaseDrawer.Edit>
  );
};

const CommonDrawer = {
  Add,
  Edit,
};

export default CommonDrawer;
