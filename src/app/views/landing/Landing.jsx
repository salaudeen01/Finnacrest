import React, { Component } from "react";

import AppAppBar from "./shared/AppBar";
import { Grid, Typography, Backdrop, Button, Card, CardHeader, CardMedia } from "@material-ui/core";
import CustomSlider from "./shared/CustomSlider";
import Section1 from "./shared/Section1";
import Section2 from "./shared/Section2";
import Section3 from "./shared/Section3";
import Section4 from "./shared/Section4";
import Footer from "./shared/Footer";
import Section5 from "./shared/Section5";
import product from "../../../assets/sesis3.jpeg";
import invest from "../../../assets/sesis4.jpeg";
import loan from "../../../assets/sesis6.jpeg";
import CardBanners from "./shared/CardBanners";
import { makeStyles } from '@material-ui/core/styles';
import { getConfig } from "app/config/config";
import { authHeader } from "app/redux/logic";
import SolidGameCardDemo from "./shared/CustomCard";
// import img1 from "../../../assets/television.jpg";
// import img2 from "../../../assets/shoe.jpg";
// import img3 from "../../../assets/jug.jpg";
// import img4 from "../../../assets/phone.jpg";

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

  // componentDidMount(){
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: {'Content-Type': 'application/json' },
  //   };
  //   fetch(getConfig('getAllProducts'), requestOptions)
  //     .then(async response => {
  //     const data = await response.json();
  //     if (!response.ok) {
  //         const error = (data && data.message) || response.statusText;
  //         return Promise.reject(error);
  //     }
  //     if(data.success == false){
  //       this.setState({products: []});
  //     }else{
  //       this.setState({products: data.products.data});
  //     }console.log(data)
  //   })
    // .catch(error => {
      // if (error === "Unauthorized") {
      //   this.props.timeOut()
      // }
  //     console.log(error)
  //   });
  // }

  render() {    
    const {products} = this.state
    // let item = [
    //   {id:1, title:"", subtitle:"", img:img1},
    //   {id:2, title:"", subtitle:"", img:img2},
    //   {id:3, title:"", subtitle:"", img:img3},
    //   {id:3, title:"", subtitle:"", img:img4}
    // ]
    return (
      <div >
        
            <AppAppBar user={this.state.user} />
        <div className="m-sm-30">    
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <CustomSlider />
              </Grid>
            </Grid>
            <div>
              <Grid container spacing={3} justify="flex-start" className="px-4">
                  <Grid item lg={3} md={3} sm={3} xs={12}>
                    <CardBanners color={"#3E89BF"} name={"Product finance"} 
                    description={"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"} 
                    img={product}/>
                  </Grid> 
                  <Grid item lg={3} md={3} sm={3} xs={12}>
                    <CardBanners color={"#3E89BF"} name={"Product finance"} 
                    description={"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"} 
                    img={invest}/>
                  </Grid> 
                  <Grid item lg={3} md={3} sm={3} xs={12}>
                    <CardBanners color={"#3E89BF"} name={"Product finance"} 
                    description={"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"} 
                    img={loan}/>
                  </Grid>
                  <Grid item lg={3} md={3} sm={3} xs={12}>
                    <CardBanners color={"#3E89BF"} name={"Product finance"} 
                    description={"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"} 
                    img={loan}/>
                  </Grid> 
                </Grid>
            </div>
            <div className='py-2' />
            <Grid container spacing={2} justify="flex-start" className="px-4">
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Section1/>
              </Grid>
            </Grid>
            <Grid container spacing={2} justify="flex-center">
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Card>
                  {/* <CardHeader> */}
                      <Typography variant='h5' className='text-center py-6'>Buy Our Products</Typography>
                  {/* </CardHeader> */}
                  <CardMedia>
                      <SolidGameCardDemo/>
                  </CardMedia> 
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {/* <div className='py-2' /> */}
              {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                <Section3 />            
              </Grid> */}
              <div className='py-2' />
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Footer />            
              </Grid>
            </Grid>
        </div>
      </div>
    );
  }
}

export default Landing;
