import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography, Grid, Box, ButtonGroup, Button} from '@material-ui/core';
import {numberFormat} from '../../../../config/config'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function LoanApprovalCard(props) {
  const classes = useStyles();

  return (
    <div className="pt-7 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography variant="h6">{props.data.group_name}</Typography><br/>
          <Typography variant="subtitle" color="text-secondary font-bold">Loan Amount: {numberFormat(props.data.loan_amount)}</Typography><br/>
          <Typography variant="subtitle" color="text-secondary font-bold">Repayment Amount {numberFormat(props.data.repayment_amount)}</Typography><br/>
        </Grid>
        <div className="py-4" />
        
        <Grid item lg={12} md={12} sm={12} xs={12}>
        <ButtonGroup variant="outlined" color="primary" aria-label="text primary button group">
          <Button onClick={props.accept}>Accept</Button>
          <Button onClick={props.decline}>Decline</Button>
        </ButtonGroup>
        </Grid>
      </Grid>
    </div>
  );
}
