import React from "react";
import { Breadcrumb, SimpleCard } from "matx";
import ApplicationsForm from "./ApplicationsForm";

const TargetContribution = () => {
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Target Contribution" }
          ]}
        />
      </div>
      <ApplicationsForm />
    </div>
  );
};

export default TargetContribution;
