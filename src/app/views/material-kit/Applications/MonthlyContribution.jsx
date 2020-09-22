import React from "react";
import { Breadcrumb } from "matx";
import ApplicationsForm from "./ApplicationsForm"

const MonthlyContribution = () => {
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Monthly Contribution" }
          ]}
        />
      </div>
      <ApplicationsForm />
    </div>
  );
};

export default MonthlyContribution;
