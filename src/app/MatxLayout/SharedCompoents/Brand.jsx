import React from "react";
import logo from "../../../assets/sesis.jpg"
import {Link} from "react-router-dom";

const Brand = ({ children }) => {
  return (
    <div className="flex items-center justify-center brand-area">
      <div className="flex items-center brand">
      <Link to="/"><img src={logo} alt="company-logo" /></Link>
      </div>
      {children}
    </div>
  );
};

export default Brand;
