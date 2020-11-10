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

export default function CompleteRequest(props) {

  return (
    <div className="pt-7 mb-4 px-2 bg-default text-white" style={{flexGrow: 1, border:1, borderStyle:"solid", 
    borderColor:"#222943", borderRadius:10}}>
      
      <Grid container spacing={0}>      
        {/* <Divider variant="middle"/> */}
        <div className="py-2" />
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6" style={{fontSize:16}}><span>Business Name:</span> {props.title} </Typography>
        </Grid>
        {/* <Divider variant="middle"/> */}
        <div className="py-2" />
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6" style={{fontSize:16}}><span>Requested Amount:</span> {props.amount} </Typography>
        </Grid>
        <div className="py-2" /> 
       { props.status != 0 ?
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6" style={{fontSize:16}}><span>Payeable Amount:</span> {props.admin_price} </Typography>
        </Grid>:
        <></>}
        <div className="py-2 " />
        <Grid item lg={6} md={6} sm={12} xs={12}>
        {props.status == 0 ?
           <Typography className="mb-2">
           <span className="mb-4 py-1 px-3" style={{background:'orange', fontSize:12, color:'white', borderRadius:14}}>PENDING</span>
         </Typography>
        : props.status == 3 ?
        <div>
          <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography className="mb-2">
            <span className="mb-4 py-1 px-3" style={{background:'green',fontSize:12, color:'white', borderRadius:14}}>Completed</span>
          </Typography>
         {/* <Badge className="mb-4 px-3"  badgeContent={'Approved'} {...defaultProps}/> */}
        </Grid>       
        </div>
       :props.status == 9 ?
       <div>
         <Grid item lg={6} md={6} sm={12} xs={12}>
         <Typography className="mb-2">
            <span className="mb-4 py-1 px-3" style={{background:'red',fontSize:12, color:'white', borderRadius:14}}>Cancelled</span>
          </Typography>
       </Grid>
       </div>      
       : ""
        }
       </Grid>
       <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button className="mb-4"  size='small' variant="outlined" 
            onClick={this.props.viewTrans}
            >Transaction Detail</Button>               
      </ButtonGroup>
      </Grid>

    </div>
  );
}
