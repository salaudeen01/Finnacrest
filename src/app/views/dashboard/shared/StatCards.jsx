import React from "react";
import { Grid, Card, Icon, IconButton,CardActionArea, Button, Typography,CardMedia,CardContent } from "@material-ui/core";
import AllInboxIcon from '@material-ui/icons/AllInbox';
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import { numberFormat } from "app/config/config";
import { Link } from "react-router-dom";
import bgimage from "../../../../assets/sesis4.jpeg"
import bgimage1 from "../../../../assets/sesis2.jpeg"
import bgimage2 from "../../../../assets/sesis7.jpeg"
import bgimage4 from "../../../../assets/sesis6.jpeg"
import bgimage3 from "../../../../assets/cart2.jpg"


class StatCards extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let { theme } = this.props;
    return (
      <Grid container spacing={3} className="mb-3"
      >
        <Grid item xs={12} md={6}>
        <Link to ="/wallet">
          <Card className="play-card" elevation={6} style={{backgroundColor:"#006eb3"}}>
          <CardActionArea>
              <CardContent style={{backgroundColor:"#006eb3"}}>
                <div className="flex items-center">
                  {/* <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>all_in_box</Icon> */}
                  <AllInboxIcon color="#fff" style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}/>
                  <div className="ml-3">
                    <Typography className="text-white" variant="text-16"> Wallet Balance</Typography>
                    <h6 className="m-0 mt-1 text-white text-22">{this.props.wallet_balance}</h6>
                  </div>
                </div>
              </CardContent>
              <CardMedia
             style={{height: 80,}}
            image={bgimage}
            title="Contemplative Reptile"
          />
        </CardActionArea>
          </Card>
        </Link>
        </Grid>
        {/* <Grid item xs={12} md={6}>
        <Link to ="/product_financing">
          <Card className="play-card" style={{backgroundColor:"#"}} elevation={6}>
          <CardActionArea>
              <CardContent style={{backgroundColor:"#19a6ff"}}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>shopping_cart</Icon>
              <div className="ml-3">
                <Typography className="text-white" variant="text-16">Product Financing</Typography>
                <h6 className="m-0 mt-1 text-white text-22">{this.props.halal_balance}</h6>
              </div>
            </div>          
              </CardContent>
                <CardMedia
              style={{height: 80,}}
              image={bgimage3}
              title="Contemplative Reptile"
            />
          </CardActionArea>
          </Card>
          </Link>
        </Grid>  */}
        <Grid item xs={12} md={6}>
        <Link to ="/shareholdings">
          <Card className="play-card" style={{backgroundColor:"#"}} elevation={6}>
          <CardActionArea>
              <CardContent style={{backgroundColor:"#0971b3"}}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>trending_up</Icon>
              <div className="ml-3">
                <Typography className="text-white" variant="text-16">Share Holding</Typography>
                <h6 className="m-0 mt-1 text-white text-22">{this.props.share_balance}</h6>
              </div>
            </div>          
            </CardContent>
              <CardMedia
             style={{height: 80,}}
            image={bgimage2}
            title="Contemplative Reptile"
          />
        </CardActionArea>
          </Card>
          </Link>
        </Grid> 
        <Grid item xs={12} md={6}>
        <Link to ="savings-tab/regular">
          <Card className="play-card" style={{backgroundColor:"#"}} elevation={6}>            
          <CardActionArea>
              <CardContent style={{backgroundColor:"#bf0000"}}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>track_changes</Icon>
              <div className="ml-3">
                <Typography className="text-white" variant="text-16">Target Savings</Typography>
                <h6 className="m-0 mt-1 text-white text-22"> {this.props.target_balance} </h6>
              </div>
            </div>
            </CardContent>
              <CardMedia
             style={{height: 80,}}
            image={bgimage4}
            title="Contemplative Reptile"
          />
        </CardActionArea>
          </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
        <Link to ="savings-tab/regular">
          <Card className="play-card" style={{backgroundColor:"#"}} elevation={6}>
          <CardActionArea>
              <CardContent style={{backgroundColor:"#400000"}}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>business_center</Icon>
              <div className="ml-3">
                <Typography className="text-white" variant="text-16">Regular Savings</Typography>
                <h6 className="m-0 mt-1 text-white text-22">{this.props.regular_balance}</h6>
              </div>
            </div>  
              <div className="ml-3 pl-12 py-5">
                <Typography className="text-white" variant="text-16">Avaliable Balance</Typography>
                <h6 className="m-0 mt-1 text-white text-22">{this.props.loan_avail_amount}</h6>
              </div>        
            </CardContent>
              {/* <CardMedia
             style={{height: 80,}}
            image={bgimage1}
            title="Contemplative Reptile"
          /> */}
        </CardActionArea>
          </Card>
          </Link>
        </Grid>
         {/* <Grid item xs={12} md={6}>
          <Link to ="#">
            <Card className="play-card" style={{backgroundColor:"#"}} elevation={6}>
            <CardActionArea>
              <CardContent style={{backgroundColor:"#400000"}}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>money</Icon>
              <div className="ml-3">
                <Typography className="text-white" variant="text-16">Loan Investment</Typography>
                <h6 className="m-0 mt-1 text-white text-22">{this.props.loan_investment}</h6>
              </div>
            </div>
            </CardContent>
              <CardMedia
             style={{height: 80,}}
            image={bgimage1}
            title="Contemplative Reptile"
          />
         </CardActionArea>
          </Card>
          </Link>
        </Grid> */}
        
        {/* <Link to ="/savings-tab/savetoloan"> */}
          {/* <Card className="play-card p-sm-24" elevation={6}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>shopping_cart</Icon>
              <div className="ml-3"> */}
                <Grid item xs={12} md={12}>
                  { this.props.share < this.props.shareMinFee ?
                    <Button className="uppercase font-bold"
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={this.props.shareModal} style={{color:"#fff"}}>Quick Save</Button>:

                    <Button className="uppercase font-bold"
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={this.props.openModal} style={{color:"#fff"}}>Quick Save</Button>}
                </Grid>
              {/* </div> */}
            {/* </div> */}
          {/* // </Card> */}
          {/* </Link> */}
        
        
        {/* <Card>
      <CardActionArea>
        <CardMedia
          style={{height: 140,}}
          image={bgimage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea> */}
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    {/* </Card> */}
        
        {/* <Grid item xs={12} md={3}>
          <Card className="play-card" style={{backgroundColor:"#336280"}} elevation={6}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>store</Icon>
              <div className="ml-3">
                <Typography className="text-white" variant="text-16">Market Place</Typography>
                <h6 className="m-0 mt-1 text-white text-22">{this.props.market_balance}</h6>
              </div>
            </div>
          </Card>
        </Grid> */}
       
      </Grid>
    );
  };
  
}

export default withStyles({}, { withTheme: true })(StatCards);
