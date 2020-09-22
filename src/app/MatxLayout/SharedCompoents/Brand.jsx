import React from "react";
import logo from "../../../assets/cubeVest.png"
import {Link} from "react-router-dom";

const Brand = ({ children }) => {
  return (
    <div className="flex items-center justify-between brand-area">
      <div className="flex items-center brand">
      <Link to="/"><img src={logo} alt="company-logo" /></Link>
      </div>
      {children}
    </div>
  );
};

export default Brand;
