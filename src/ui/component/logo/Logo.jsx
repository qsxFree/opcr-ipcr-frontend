import React from "react";
import CNSCLogo from "../../../assets/cnsc-logo.png";

const Medium = () => {
  return (
    <img
      src={CNSCLogo}
      alt=""
      width="50px"
      height="50px"
      style={{ margin: 0 }}
    />
  );
};

const Large = () => {
  return (
    <img
      src={CNSCLogo}
      alt=""
      width="80px"
      height="80px"
      style={{ margin: 0 }}
    />
  );
};

const Logo = {
  Md: Medium,
  Lg: Large,
};

export default Logo;
