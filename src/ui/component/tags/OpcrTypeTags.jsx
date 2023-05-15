import { Tag } from "antd";
import React from "react";

const OpcrTypeTags = ({ data }) => {
  let type = null;
  if (data === 1) type = <Tag color="geekblue">Strategic Priority</Tag>;
  else if (data === 2) type = <Tag color="cyan">Core Functionality</Tag>;
  else if (data === 3)
    type = <Tag color="volcano">Supporting Functionality</Tag>;
  return type;
};

export default OpcrTypeTags;
