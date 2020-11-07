import React, { Component } from "react";

import AppAppBar from "./shared/AppBar";
import { Grid, Typography, Backdrop, Button } from "@material-ui/core";
import CustomSlider from "./shared/CustomSlider";
import Section1 from "./shared/Section1";
import Section2 from "./shared/Section2";
import Section3 from "./shared/Section3";
import Section4 from "./shared/Section4";
import Footer from "./shared/Footer";
import Section5 from "./shared/Section5";
import img1 from "../../../assets/sesis-shareholding.jpg";
import img2 from "../../../assets/sesis-shareholding2.jpg";
import img3 from "../../../assets/sesis-shareholding3.jpg";
import product from "../../../assets/sesis3.jpeg";
import invest from "../../../assets/sesis4.jpeg";
import loan from "../../../assets/sesis6.jpeg";
import CardBanners from "./shared/CardBanners";
import { makeStyles } from '@material-ui/core/styles';
import { getConfig } from "app/config/config";
import { authHeader } from "app/redux/logic";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
class Landing extends Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(localStorage.getItem("user"));
    this.state = {
      showLogin: false,
      user: user,
      products:[],
    };
  }

  componentDidMount(){
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json' },
    };
    fetch(getConfig('getAllProducts'), requestOptions)
      .then(async response => {
      const data = await response.json();
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      if(data.success == false){
        this.setState({products: []});
      }else{
        this.setState({products: data.products.data});
      }console.log(data)
    })
    .catch(error => {
      // if (error === "Unauthorized") {
      //   this.props.timeOut()
      // }
      console.log(error)
    });
  }

  render() {
    let item = [
      {id:1, name:"", img:img1},
      {id:2, name:"", img:img2},
      {id:3, name:"", img:img3}
    ]
    const {products} = this.state
    return (
      <div >
        {/* <Backdrop style={{zIndex: theme.zIndex.drawer + 1, color: '#fff'}}> */}
        <AppAppBar user={this.state.user} />
        <div className='' />
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <CustomSlider items={item
            }/>
          </Grid>
        </Grid>
        <div className='py-6' />
        <Grid container direction="row" justify="space-around" alignItems="center" spacing={2}>
            <CardBanners color={"#3E89BF"} name={"Product finance"} description={"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"} img={product}/>
            <CardBanners color={"#43e25e"} name={"Product finance"} description={"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"}img={invest}/>
            <CardBanners color={"#a5ad2a"} name={"Product finance"} description={"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"} img={loan}/>
        </Grid>
        <div className='py-4' />
        <Grid container>
          <Section3 />
        </Grid>
        <div className='py-4' />
        {/* <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant='h4' className='text-dark text-center pt-3'>
              Products Finance.
            </Typography>
          </Grid>
          {/* <Section4 products={products}/> */}
        {/* </Grid> */}
        <Footer />
        {/* </Backdrop> */}
      </div>
    );
  }
}

export default Landing;
