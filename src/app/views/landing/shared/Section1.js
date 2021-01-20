import React, { Component } from "react";
import {
  Typography,
  Grid,
  Card,
  Button,
  CardActions,
  Hidden,
} from "@material-ui/core";
import SimpleForm from "app/views/material-kit/forms/SimpleForm";
import CustomForm from "./CustomForm";
import img5 from "../../../../assets/image4.png";
import img from "../../../../assets/baner2.png";
import { Link } from "react-router-dom";

class Section1 extends Component {
  render() {
    const style = {
      typo: {
        fontFamily: "Lobster, cursive",
      },
    };
    return (
       <div className="site-section cta-big-image" id="about-section">
          <div className="container">
              <div className="row mb-5 justify-content-center">
                  <div className="col-md-8 text-center">
                      <h2 className="section-title m-5" data-bs-slide="fade-up" data-bs-delay="">About Us</h2>
                      {/* <p className="lead" data-bs-slide="fade-up" data-bs-delay="100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus minima neque tempora reiciendis.</p> */}
                  </div>
                  <Grid
                    container
                    spacing={4}
                    className='px-4'
                  >
                    <Grid item lg={6} md={6} sm={10} xs={12}>
                    <img src={img5} style={{borderRadius:6}}/>
                    </Grid>        
                    <Grid item lg={6} md={6} sm={10} xs={12}>
                      <div style={{paddingTop:40, fontSize:16, textAlign:'center',alignContent:'center'}}>
                        <Typography variant="h4" className="text-center py-4">
                            <b>We Solve Your Financial Problem</b>
                        </Typography>
                        <Typography className="text-center py-4" style={{fontSize:16}}>
                          SESIS cooperative is a zero interest cooperative that operate on 
                          Islamic principle and procedures registered with Lagos State Government,  
                          under Ministry of Cooperative and Commerce. 
                          Our mission is to empower the member financially through participatory 
                          contribution and we have  been in the business for years now.  
                        </Typography>
                        <Link to="/signin">
                          <Button style={{background: '#FFDF4D',}} className='text'>Get Started</Button>
                        </Link>
                      </div>
                  </Grid>
            
                </Grid>
              </div>
           </div>
      </div>

    );
  }
}

export default Section1;
