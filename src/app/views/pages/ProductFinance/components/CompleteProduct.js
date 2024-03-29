import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography, Grid, Box, ButtonGroup, Button, Switch, Divider, Badge} from '@material-ui/core';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#e74398',
  },
}))(LinearProgress);

const defaultProps = {
  color: 'secondary',
  textColor:'#fff'
};

export default function CompleteProduct(props) {

  return (
    <div className="pt-7 mb-4 px-2 bg-default text-white" style={{flexGrow: 1, border:1, borderStyle:"solid", 
    borderColor:"green", borderRadius:10}}>
      <Grid container spacing={0}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6" style={{fontSize:16}}>Order No: {props.title} </Typography>
        </Grid>
        <div className="py-2" />
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6" style={{fontSize:16}}>Total: {props.amount} </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6" style={{fontSize:16}}><span>Amount Repaid:</span> {props.amount_paid} </Typography>
        </Grid>       
        <div className="py-2" />
        <Grid item lg={12} md={12} sm={12} xs={12}>
        {props.status == 2 ?
           <Typography className="mb-2" style={{fontSize:16}}><span className="text-primary">Status:</span>
           <span className="mb-4 py-1 px-3" style={{background:'green', fontSize:12, color:'white', borderRadius:14}}>PAID</span>
         </Typography>
        : props.status == 6 ?
        <div>
          <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography className="mb-2" style={{fontSize:16}}><span className="text-primary">Status:</span>
            <span className="mb-2 py-1 px-3" style={{background:'red',fontSize:12, color:'white', borderRadius:14}}>CLOSED</span>
          </Typography>
        </Grid>
        </div>
       : "stop"
        }
          <Grid item lg={12} md={12} sm={12} xs={12}>
           {/* <ButtonGroup variant="outlined" color="primary" aria-label="text primary button group"> */}
          <Button className="mb-4" onClick={props.view} size='small' variant="outlined">Details</Button>
        {/* </ButtonGroup> */}
        </Grid>
        
        </Grid>
      </Grid>
    </div>
  );
}
