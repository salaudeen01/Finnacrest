import React from "react";
import { Grid, Card, Icon, Fab } from "@material-ui/core";
import {numberFormat} from '../../../config/config'

const StatCards2 = (props) => {
  return (
    <Grid container spacing={3} className="mb-6">
      <Grid item xs={12} md={6}>
        <Card elevation={3} className="p-4">
          <div className="flex items-center">
            <Fab
              size="medium"
              className="circle-44 box-shadow-none"
              style={{backgroundColor: props.color}}
            >
              <Icon >{props.icon}</Icon>
            </Fab>
            <h5 className="font-medium m-0 ml-3">{props.title}</h5>
          </div>
          <div className="pt-4 flex items-center">
            <h2 className={"m-0 flex-grow text-primary"}>{props.amount == numberFormat(0)? "" : props.amount}</h2>
          </div><br/>
            {props.other_title && <>
            <h5 className="font-medium m-0">{props.other_title}</h5><br/>
            <h2 className={"m-0 flex-grow text-primary"}>{props.investment_amount == numberFormat(0)? "" : props.investment_amount }</h2></>}
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatCards2;
