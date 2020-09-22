import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LoanCustomTab from "./components/LoanCustomTab";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
}));

export default function LoanTab(props) {
  const classes = useStyles();

  return (
    <div className="m-sm-10">
        <LoanCustomTab />
      </div>
  );
}
