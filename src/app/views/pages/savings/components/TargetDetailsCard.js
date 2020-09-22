import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography, Divider, Grid, Box, ButtonGroup, Button} from '@material-ui/core';
import {numberFormat} from '../../../../config/config'
import TableCard from './TableCard';

export default function TargetDetailsCard(props) {
  return (
    <>
      <Typography variant="h6" className="font-bold text-green">Loan Repayment Transactions </Typography>
      <TableCard transactions={props.data} />
    </>
  );
}
