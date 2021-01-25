import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CustomSlider from "./CustomSlider";
import {
  Divider,
  ListItem,
  ListItemText,
  List,
  ListSubheader,
} from "@material-ui/core";
import logo from "../../../../assets/logo1.jpeg";

function Copyright() {
  return (
    <React.Fragment>
      {"© "}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#000",
    color: 'white'
  },
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: "flex",
  },
  icon: {
    width: 48,
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: "none",
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
  const date = new Date();
  return (
    <div component='footer' className={classes.root} className="bg-primary">
      <Container className={classes.container}>
        <Grid container justify='space-between' spacing={5} className='mb-10 py-5'>
          <Grid item xs={6} sm={6} md={3} lg={3} className='p-5 text-white'>
            <Typography variant='h6' className="text-white" style={{ fontStyle: "underline"}}>
              Links
            </Typography>
            <br />
            <Typography variant='p'>Contact</Typography>
            <br />
            <Typography variant='p'>FAQ</Typography>
            <br />
            <Typography variant='p'>About Us</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3} className='p-5 text-white'>
            <Typography variant='h6' className="text-white">Features</Typography>
            <br />
            <Divider variant='inset' />
            <Typography variant='p'>Savings</Typography>
            <br />
            <Typography variant='p'>Investment</Typography>
            <br />
            <Typography variant='p'>Free interest loan</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3} className='p-5 text-white'>
            <Typography variant='h6' className="text-white">Social Media</Typography>
            
            <span style={{fontSize:26}} className="text-white px-2"><i class="fab fa-facebook-square"></i></span>
            
            <span style={{fontSize:26}} className="text-white px-2"><i class="fab fa-google-plus-square"></i></span>
            
            <span style={{fontSize:26}} className="text-white px-2"><i class="fab fa-twitter-square"></i></span>
            <Typography className="text-white"> 
                *Head office:* <br/>
                Suite 1, 2nd floor, 
                Alhaji safar jolaosho plaza, 
                First bank building, 107 Mafoluku Road, via Lagos international airport road, Mafoluku oshodi, Lagos
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3} className='p-15 text-white'>
            <img src={logo} width='100px' height='30px' alt='company-logo' />
          </Grid>
        </Grid>
        <Divider variant='fullWidth' style={{ backgroundColor: "#ffffff" }} />        
        <p className="text-white">&copy;  2021 Sesis Powered by Techend Limited . &middot; <a href="http://techend.com.ng">Privacy</a> &middot; <a href="http://techend.com.ng">Terms</a></p>
      </Container>
    </div>
  ); 
}
