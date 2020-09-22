import React from "react";
import { Grid, Card, Icon, IconButton, Tooltip, Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import { numberFormat } from "app/config/config";
import { Link } from "react-router-dom";


class StatCards extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let { theme } = this.props;
    return (
      <Grid container spacing={3} className="mb-3"
      >
        <Grid item xs={12} md={4}>
        <Link to ="/wallet">
          <Card className="play-card p-sm-24" style={{backgroundColor:"#006eb3"}} elevation={6}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>account_balance_wallet</Icon>
              <div className="ml-3">
                <Typography className="text-white" variant="text-16"> Wallet Balance</Typography>
                <h6 className="m-0 mt-1 text-white text-22">{this.props.wallet_balance}</h6>
              </div>
            </div>
          </Card>
        </Link>
        </Grid>
        <Grid item xs={12} md={4}>
        <Link to ="/halal">
          <Card className="play-card p-sm-24" style={{backgroundColor:"#19a6ff"}} elevation={6}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>trending_up</Icon>
              <div className="ml-3">
                <Typography className="text-white" variant="text-16">Product Financing</Typography>
                <h6 className="m-0 mt-1 text-white text-22">{this.props.halal_balance}</h6>
              </div>
            </div>
          </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
        {/* <Link to ="/savings-tab/savetoloan"> */}
          <Card className="play-card p-sm-24" elevation={6}>
            <div className="flex items-center">
              {/* <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>shopping_cart</Icon> */}
              <div className="ml-3">
                <Button className="uppercase font-bold"
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={this.props.openModal} style={{color:"#fff"}}>Quick Save</Button>
              </div>
            </div>
          </Card>
          {/* </Link> */}
        </Grid>
        <Grid item xs={12} md={4}>
        <Link to ="/target">
          <Card className="play-card p-sm-24" style={{backgroundColor:"#bf0000"}} elevation={6}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>track_changes</Icon>
              <div className="ml-3">
                <Typography className="text-white" variant="text-16">Target Savings</Typography>
                <h6 className="m-0 mt-1 text-white text-22"> {this.props.target_balance} </h6>
              </div>
            </div>
          </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
        <Link to ="/regular">
          <Card className="play-card p-sm-24" style={{backgroundColor:"#400000"}} elevation={6}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>payments</Icon>
              <div className="ml-3">
                <Typography className="text-white" variant="text-16">Regular Savings</Typography>
                <h6 className="m-0 mt-1 text-white text-22">{this.props.regular_balance}</h6>
              </div>
            </div>
          </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
        <Link to ="/shareholdings">
          <Card className="play-card p-sm-24" style={{backgroundColor:"#0971b3"}} elevation={6}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>money</Icon>
              <div className="ml-3">
                <Typography className="text-white" variant="text-16">Share Holding</Typography>
                <h6 className="m-0 mt-1 text-white text-22">{this.props.loan_balance}</h6>
              </div>
            </div>
          </Card>
          </Link>
        </Grid>
        
        {/* <Grid item xs={12} md={3}>
          <Card className="play-card p-sm-24" style={{backgroundColor:"#336280"}} elevation={6}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>store</Icon>
              <div className="ml-3">
                <Typography className="text-white" variant="text-16">Market Place</Typography>
                <h6 className="m-0 mt-1 text-white text-22">{this.props.market_balance}</h6>
              </div>
            </div>
          </Card>
        </Grid> */}
        {/* <Grid item xs={12} md={3}>
          <Card className="play-card p-sm-24" style={{backgroundColor:"#ff4d4d"}} elevation={6}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>money</Icon>
              <div className="ml-3">
                <Typography className="text-white" variant="text-16">Loan Investment</Typography>
                <h6 className="m-0 mt-1 text-white text-22">{this.props.loan_investment}</h6>
              </div>
            </div>
          </Card>
        </Grid> */}
      </Grid>
    );
  };
  
}

export default withStyles({}, { withTheme: true })(StatCards);
