import React from "react";
import { classList } from "utils";
import {Grid, Card, Icon, Typography } from "@material-ui/core"
import  Notifications from '@material-ui/icons/Notifications';

const SavingsBalanceCard = (props) => {
    const {colors, children} = props
    const style = {
        card:{
             borderBottomRightRadius:20,
             borderTopLeftRadius:20,
        }
       
    }
  return (
    <div elevation={6} className="px-6 py-5 h-full" style={style.card} ref={element => { 
        if (element) element.style.setProperty('height', '150px', 'important'); 
      }} >
      <Grid container >
        <Grid item lg={12} md={12} sm={12} xs={12}>
        <h4 style={{color:"blue"}}>{props.title}</h4>
        </Grid>
        <div className="py-8" />
        <Grid item lg={12} md={12} sm={12} xs={12}>
        <Typography variant="h6">{props.amount}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default SavingsBalanceCard;
