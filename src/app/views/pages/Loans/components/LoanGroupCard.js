import React,{useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography, Grid, Box, ButtonGroup, Button} from '@material-ui/core';

export default function LoanGroupCard(props) {
  let user = JSON.parse(localStorage.getItem('user'));
  const [id, setId] = useState(user.user_id)
  const {data} = props
  return (
    <div className="mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      <Grid container spacing={2}>
        <Grid className="pt-5" item lg={6} md={6} sm={12} xs={12}>
           <Typography variant="h6" className="font-bold"> {data.group_name} </Typography>
           <Typography variant="subtitle" className="font-bold">Status: <span style={{backgroundColor: data.group_status ==0? "red":"green", color:"#fff", padding:3, borderRadius:5}}> {props.data.group_status ==0? "Pending": "Active"}</span> </Typography>
        </Grid>
        <div className="py-4" />
        
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <ButtonGroup variant="outlined" color="primary" aria-label="text primary button group">
            {/* <Button onClick={props.actions}>Actions</Button> */}
            <Button onClick={props.approval}>Approval</Button>
            {props.data.user_id  == id && <Button onClick={props.manage}>Manage</Button>}
            <Button onClick={props.details}>Group Details</Button>
          </ButtonGroup>
          {data.request_status != 1 && <>
            <Button variant="outlined" color="primary" onClick={props.join}>Accept</Button>
            <Button variant="outlined" color="primary" onClick={props.reject}>Reject</Button>
          </>}
          {(data.member_status != 0) && (data.member_status != null)  &&
            <Button variant="outlined" color="primary" onClick={props.exit}>Exit</Button>
          }
        </Grid>
      </Grid>
    </div>
  );
}
