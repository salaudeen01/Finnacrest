import React from "react";
import { Breadcrumb, SimpleCard } from "matx";
import ApplicationsForm from "./ApplicationsForm";

const WalletContribution = () => {
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Wallet Contribution" }
          ]}
        />
      </div>
      <ApplicationsForm />
    </div>
  );
};

export default WalletContribution;
