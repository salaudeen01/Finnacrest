import React from "react";
import { Breadcrumb, SimpleCard } from "matx";

const Settings = () => {
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Settings" }
          ]}
        />
      </div>
    </div>
  );
};

export default Settings;
