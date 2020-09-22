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
      <Grid container spacing={3} className="mb-3">
        <Grid item xs={12} md={3}>
          <Link to ="/wallet">
            <Card className="play-card p-sm-24" style={{backgroundColor:"#4fa647"}} elevation={6}>
              <div className="flex items-center">
                <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>account_balance_wallet</Icon>
                <div className="ml-3">
                  <Typography className="text-white" variant="text-16"> Wallet Balance</Typography>
                  <h6 className="m-0 mt-1 text-white text-22">{this.props.wallet_balance == numberFormat(0)? "":this.props.wallet_balance}</h6>
                </div>
              </div>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Link to ="/savings-tab/regular">
            <Card className="play-card p-sm-24" style={{backgroundColor:"#59153f"}} elevation={6}>
              <div className="flex items-center">
                <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>payments</Icon>
                <div className="ml-3">
                  <Typography className="text-white" variant="text-16">Regular Savings</Typography>
                  <h6 className="m-0 mt-1 text-white text-22">{this.props.regular_balance == numberFormat(0)? "":this.props.regular_balance}</h6>
                </div>
              </div>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Link to ="/savings-tab/savetoloan">
            <Card className="play-card p-sm-24" style={{backgroundColor:"#22591d"}} elevation={6}>
              <div className="flex items-center">
                <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>money</Icon>
                <div className="ml-3">
                  <Typography className="text-white" variant="text-16">Save To Loan</Typography>
                  <h6 className="m-0 mt-1 text-white text-22">{this.props.loan_balance == numberFormat(0)? "":this.props.loan_balance}</h6>
                </div>
              </div>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Link to ="/savings-tab/target">
            <Card className="play-card p-sm-24" style={{backgroundColor:"#a64782"}} elevation={6}>
              <div className="flex items-center">
                <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>track_changes</Icon>
                <div className="ml-3">
                  <Typography className="text-white" variant="text-16">Target Savings</Typography>
                  <h6 className="m-0 mt-1 text-white text-22"> {this.props.target_balance == numberFormat(0)? "":this.props.target_balance} </h6>
                </div>
              </div>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Link to ="/investment/halal">
            <Card className="play-card p-sm-24" style={{backgroundColor:"#8af280"}} elevation={6}>
              <div className="flex items-center">
                <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>trending_up</Icon>
                <div className="ml-3">
                  <Typography className="text-white" variant="text-16">Halal Finance</Typography>
                  <h6 className="m-0 mt-1 text-white text-22">{this.props.halal_balance == numberFormat(0)? "":this.props.halal_balance}</h6>
                </div>
              </div>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Link to ="/investment/market">
            <Card className="play-card p-sm-24" style={{backgroundColor:"#7446f2"}} elevation={6}>
              <div className="flex items-center">
                <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>store</Icon>
                <div className="ml-3">
                  <Typography className="text-white" variant="text-16">Market Place</Typography>
                  <h6 className="m-0 mt-1 text-white text-22">{this.props.market_balance == numberFormat(0)? "":this.props.market_balance}</h6>
                </div>
              </div>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Link to ="/savings-tab/savetoloan">
            <Card className="play-card p-sm-24" style={{backgroundColor:"#22591d"}} elevation={6}>
              <div className="flex items-center">
                <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>money</Icon>
                <div className="ml-3">
                  <Typography className="text-white" variant="text-16">Loan Investment</Typography>
                  <h6 className="m-0 mt-1 text-white text-22">{this.props.loan_investment == numberFormat(0)? "":this.props.loan_investment}</h6>
                </div>
              </div>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
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
        </Grid>
      </Grid>
    );
  };
  
}

export default withStyles({}, { withTheme: true })(StatCards);
