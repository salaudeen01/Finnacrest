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
import img1 from "../../../../assets/image4.png";
import img from "../../../../assets/baner2.png";

class Section1 extends Component {
  render() {
    const style = {
      typo: {
        fontFamily: "Lobster, cursive",
      },
    };
    return (
      <Grid
        container
        spacing={2}
        className='px-4'
      >
        <Grid item lg={6} md={6} sm={10} xs={12} className='p-80'>
            <div style={{padding:100, fontSize:16, textAlign:'center',alignContent:'center'}}>
              <Typography variant="h4" className="text-center py-4">
                  <b>About Us</b>
              </Typography>
              <Typography className="text-center py-4" style={{fontSize:16}}>
                    But I must explain to you how all this is a mistaken <br/> idea of denouncing pleasure. 
                    But I must explain to you <br/> how all this is a mistaken idea of denouncing.
              </Typography>
              <Button style={{background: '#FFDF4D',}} className='text'>Get Started</Button>
            </div>
        </Grid>
        <Grid item lg={6} md={6} sm={10} xs={12}>
            <img src={img} style={{borderRadius:6}}/>
        </Grid>
      </Grid>
    );
  }
}

export default Section1;
