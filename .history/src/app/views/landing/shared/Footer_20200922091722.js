import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CustomSlider from './CustomSlider';
import { Divider, ListItem, ListItemText, List, ListSubheader } from '@material-ui/core';
import logo from "../../../../assets/cubeVest.png"

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: "#000",
  },
  container: {
    display: 'flex',
    flexDirection:"column",
    marginTop:10
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
}));

export default function Footer() {
  const classes = useStyles();
  const date = new Date()
  return (
    <div component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container justify="space-between" spacing={5} className="mb-10">
          <Grid item xs={6} sm={6} md={3} lg={3} className="p-5 text-white">
          <Typography variant="h6" style={{fontStyle:"underline"}}>Links</Typography><br/>
            <Typography variant="p">Contact</Typography><br/>
            <Typography variant="p">FAQ</Typography><br/>
            <Typography variant="p">About Us</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}  className="p-5 text-white">
            <Typography variant="h6">Features</Typography><br/>
            <Divider variant="inset"  />
            <Typography variant="p">Savings</Typography><br/>
            <Typography variant="p">Investment</Typography><br/>
            <Typography variant="p">Free interest loan</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}  className="p-5 text-white">
            <Typography variant="h6">Social Media</Typography><br/>
            <Typography variant="p">Savings</Typography><br/>
            <Typography variant="p">Investment</Typography><br/>
            <Typography variant="p">Free interest loan</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}  className="p-15 text-white">
            <img src={logo} alt="company-logo" />
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{backgroundColor:"#ffffff"}} />
        <Grid container className="p-5 text-center" >
          <Grid item xs={6} sm={6} md={6} lg={6} >Terems & Condition Apply</Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} >Cubevest {date.getFullYear()} </Grid>
        </Grid>
      </Container>
    </div>
  );
}