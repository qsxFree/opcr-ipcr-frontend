import { Select, Tooltip, Typography } from "antd";

/*----------------------------------------------------------------------------------------------
 * A collection of callback for CustomSelect.SearchSelect
 *==============================================================================================
 *    This Select sub-component converts the array of data into an array of Select.Option for 
 * CustomSelect.SearchSelect. This sub-components is actually a callback to be passed in the 
 * CustomSelect children.
 * 
 *    An array of data needs to be passed in as an argument.
 ----------------------------------------------------------------------------------------------*/

// Mapping for office data
export const officeOptionMapper = (data) => (
  <Select.Option key={data.id} value={data.id} data={data}>
    <Tooltip placement="topLeft" title={`${data.code}-${data.name}`}>
      <Typography.Text>
        <Typography.Text strong>{data.code}</Typography.Text> - {data.name}
      </Typography.Text>
    </Tooltip>
  </Select.Option>
);

// Mapping for office data
export const employeeProfileOptionMapper = (data) => (
  <Select.Option key={data.id} value={data.id} data={data}>
    <Tooltip
      placement="topLeft"
      title={`${data.first_name} ${data.middle_name} ${data.last_name} ${data.extension_name}`}
    >
      <Typography.Text>
        {`${data.first_name} ${data.middle_name} ${data.last_name} ${data.extension_name}`}
      </Typography.Text>
    </Tooltip>
  </Select.Option>
);

// Mapping for office data
export const employeeRoleOptionMapper = (data) => (
  <Select.Option key={data.id} value={data.id} data={data}>
    <Tooltip placement="topLeft" title={`${data.name}`}>
      <Typography.Text>{data.role}</Typography.Text>
    </Tooltip>
  </Select.Option>
);
