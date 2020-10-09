import React,{Component} from 'react';

import AppAppBar from './shared/AppBar'
import {Grid, Typography} from "@material-ui/core"
import Section1 from './shared/Section1';
import Section2 from './shared/Section2';
import Section3 from './shared/Section3';
import Section4 from './shared/Section4';
import Footer from './shared/Footer';
import Section5 from './shared/Section5';

class Landing extends Component {
  constructor(props){
    super(props)
    let user = JSON.parse(localStorage.getItem("user"));
    this.state ={
      showLogin:false,
      user:user
    }

  }

  render(){
    return (
      <div style={{
        backgroundImage: `url(${"/assets/images/new-bg.jpeg"})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100%"
        }}>
          <AppAppBar user={this.state.user} />
          <div className="py-4" />
          <Grid container >
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Section1 />
            </Grid>
          </Grid>
          <div className="py-6" />
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Section3 />
            </Grid>
          </Grid>
          <div className="py-4" />
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Section2 />
            </Grid>
          </Grid>
          <div className="py-4" />
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h4" className="text-white text-center pt-3">
                  Halal, secure and reliable investment just for you.
              </Typography>
            </Grid>
              <Section4 />
          </Grid>
          <div className="py-4" />
          <Grid container spacing={2} style={{backgroundColor:"#ffdf4d"}}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Section5 />
            </Grid>
          </Grid>
          <Footer/>
      </div>
    );
  }  
}
  

export default Landing;