import React from "react";
import logo from "../../../assets/logo3.png"
import {Link} from "react-router-dom";
import { Typography } from "@material-ui/core";

const Brand = ({ children }) => {
  return (
    <div className="flex items-center justify-center brand-area">
      <div className="flex items-center brand">
      <Link to="/"><img src={logo} alt="company-logo" /></Link>
      {/* <Typography variant='h4' color='primary' className=''>SESIS</Typography> */}
      </div>
      {children}
    </div>
  );
};

export default Brand;
