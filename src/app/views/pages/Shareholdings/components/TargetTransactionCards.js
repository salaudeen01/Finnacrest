import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography, Grid, Box, ButtonGroup, Button, Switch, Divider} from '@material-ui/core';

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

export default function TargetTransactionCard(props) {

  return (
    <div className="pt-7 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#e74398", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography variant="h6"> {props.title} </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
        <Switch
            checked={props.auto_status? true:false}
            onChange={props.autoSave}
            value="checked"
            color="secondary"
          />
          <Typography variant="h6">
            {props.auto_status? "Turn OFF Auto save": "Turn ON Auto save"}
          </Typography>
        </Grid>
        <Divider variant="middle"/>
        <div className="py-4" />
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography variant="h6"> {props.amount} </Typography>
          <Typography variant="caption" color="text-secondary">{`${Math.round(
                props.value,
              )}% Complete`}</Typography>
        </Grid>
        <div className="py-4" />
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <BorderLinearProgress variant="determinate" value={props.value} />
            </Box>
          </Box>
        </Grid>
        <div className="py-4" />
        <Grid item lg={6} md={6} sm={12} xs={12}>
        {!props.status ?
        <ButtonGroup variant="outlined" color="primary" aria-label="text primary button group">
          <Button onClick={props.view}>View</Button>
          <Button onClick={props.edit}>Edit</Button>
          <Button onClick={props.stop}>Stop Plan</Button>
        </ButtonGroup>:
        <ButtonGroup variant="outlined" color="primary" aria-label="text primary button group">
          <Button onClick={props.view}>View</Button>
        </ButtonGroup>
        }
        
        </Grid>
      </Grid>
    </div>
  );
}
