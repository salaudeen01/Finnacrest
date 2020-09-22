import React from "react";
import { classList } from "utils";
import {Grid, Card, Icon, Typography } from "@material-ui/core"
import  Notifications from '@material-ui/icons/Notifications';

const CustomCard = (props) => {
    const {colors, borderColor} = props
    const style = {
        card:{
             backgroundColor:colors,
             borderBottomRightRadius:20,
             borderTopLeftRadius:20,
             borderColor:borderColor,
             borderStyle:"solid"
        }
       
    }
  return (
    <div elevation={6} className="px-6 py-5 h-full" style={style.card} ref={element => { 
        if (element) element.style.setProperty('height', '200px', 'important'); 
      }} >
      <Grid container >
        <Grid item lg={12} md={12}>
        <Icon style={{ color: props.textcolor }}>{props.icon}</Icon>
        </Grid>
        <Grid item lg={12} md={12}>
        <h4 style={{color:"blue"}}>{props.title}</h4>
        </Grid>
        <Grid item lg={12} md={12}>
        <Typography variant="subtitle">{props.subtitle}</Typography>
        </Grid>
        <div className="py-8" />
        <Grid item lg={6} md={6} sm={12}>
        <Typography variant="h6">{props.amount}</Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12}>
        <Typography variant="h6">{props.investment_amount}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomCard;
