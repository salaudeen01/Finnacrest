import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Breadcrumb, SimpleCard } from "matx";
import {Grid, Card, Icon, Typography } from "@material-ui/core"
import CustomTab from "./components/CustomTab";
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
}));

export default function FinanceTab(props) {
  const classes = useStyles();

  return (
    <div className="m-sm-10">
        <CustomTab />
    </div>
  );
}
