import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GroupCustomTab from "./components/GroupCustomTab";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
}));

export default function GroupTab(props) {
  const classes = useStyles();

  return (
    <div className="m-sm-10">
        <GroupCustomTab />
      </div>
  );
}
