import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography, Divider, Grid, Box, ButtonGroup, Button} from '@material-ui/core';
import {numberFormat} from '../../../../config/config'
// import moment from 'moment';
export default function ManageLoanCard(props) {
  return (
      <div className="pt-4 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      <Grid container spacing={2} >
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography variant="h6">Member Name</Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography variant="h6"> {props.name} </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Typography variant="subtitle" color="text-secondary" className="font-medium">Status </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Typography variant="subtitle" className={props.status==0? "text-gray":props.status==1?"text-green":"text-error"}>
            {props.status==0? "Pending Invite":props.status==1? "Active Member":props.status==2?"Reject Invite":"Exited"}
          </Typography>
        </Grid>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
          {/* <ButtonGroup variant="outlined" color="primary" aria-label="text primary button group"> */}
          {props.status == 0 || props.status == 2?
            <>
            <Button onClick={props.resend_notif} variant="outlined">Resend Notification</Button>
            <Button onClick={props.replace_invite} variant="outlined">Replace Invite</Button>
            </>:
            props.status != 0 &&
            <Button onClick={props.replace_member} variant="outlined">Replace Member</Button>
          }
          {/* </ButtonGroup> */}
        </Grid>
    </div>
  );
}
