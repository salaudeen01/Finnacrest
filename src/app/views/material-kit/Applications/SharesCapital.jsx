import React from "react";
import { Breadcrumb, SimpleCard } from "matx";
import ApplicationsForm from "./ApplicationsForm";

const SharesCapital = () => {
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Shares Capital" }
          ]}
        />
      </div>
      <ApplicationsForm />
    </div>
  );
};

export default SharesCapital;
