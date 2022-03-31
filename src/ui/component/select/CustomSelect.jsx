import React from "react";
import { Select, Spin } from "antd";
import { useMutation } from "react-query";

/*----------------------------------------------------------------------------------------------
 * A collection of a customized Select component
 *==============================================================================================
 *  CustomSelect consists of different customized Select component from antd.
 ----------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------
 * SearchSelect : It is a Select component with search functionality.
 *==============================================================================================
 * It retrieves data from the API and displays the data in the dropdown based on the input.
 * This component requires the following props:
 * @params - retrieveFn: a function that retrieves data from the API.
 *                       (can be found in Resource.js file)
 * 
 * @params - optionMap: a function that maps the data to the dropdown.
 *                        (can be found in OptionMapper.jsx file)
 ----------------------------------------------------------------------------------------------*/
export const SearchSelect = ({
  retrieveFn,
  optionMap,
  initialOptions = [],
  ...restProps
}) => {
  const [selection, setSelections] = React.useState([...initialOptions]);

  const options = selection.map(optionMap);

  const mutator = useMutation(retrieveFn, {
    onSuccess: (data) => {
      setSelections(data.data);
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const _handleOnChange = (value) => {
    if (value.length > 2) {
      mutator.mutate({ search: value });
    }
  };

  const _handleOnSearch = (value) => {
    if (value.length > 2) {
      mutator.mutate({ search: value });
    }
  };

  return (
    <Select
      showSearch
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      notFoundContent={mutator.isLoading ? <Spin size="small" /> : "Not Found"}
      onChange={_handleOnChange}
      onSearch={_handleOnSearch}
      {...restProps}
    >
      {options}
    </Select>
  );
};

const CustomSelect = {
  SearchSelect,
};

export default CustomSelect;
