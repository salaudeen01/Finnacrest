import React, { Fragment, Component } from "react";
import { format } from "date-fns";
import {
  Grid,
  Card,
  Icon,
  IconButton,
  Checkbox,
  Fab,
  Avatar,
  Hidden
} from "@material-ui/core";
import { Link } from "react-router-dom";

class RowCards extends Component {
  render(){
    const rows = [
      {id: 1, name: "Fund Wallet", desc:"Fund Wallet", link:"/wallet"}, 
      {id: 2, name:"Bank Details", desc:"Add Your Bank Details", link:"/settings"}, 
      {id: 3, name:"Update Profile", desc:"Edit Your Profile", link:"/settings"}
    ]
  return (
    <Fragment>
      {this.props.wallet  == 0 && 
      <Link to="/wallet">
        <Card className="py-2 px-4 project-card">
          <Grid container alignItems="center">
            <Grid item md={6} xs={7}>
              <div className="flex items-center">
                <Checkbox />
                <Hidden smDown>
                    <Fab
                      className="ml-4 bg-green box-shadow-none text-white"
                      size="small"
                    >
                      <Icon>star_outline</Icon>
                    </Fab>
                </Hidden>
                <span className="card__roject-name font-medium">
                  Fund Wallet
                </span>
              </div>
            </Grid>
            <Grid item md={6} xs={4}>
              <div className="text-muted">
                Fund Your Wallet
              </div>
            </Grid>
          </Grid>
        </Card>
      </Link>}
      <div className="py-2" />
      {this.props.bank.length == 0 &&
      <Link to="/settings">
        <Card className="py-2 px-4 project-card">
          <Grid container alignItems="center">
            <Grid item md={6} xs={7}>
              <div className="flex items-center">
                <Checkbox />
                <Hidden smDown>
                    <Fab
                      className="ml-4 bg-green box-shadow-none text-white"
                      size="small"
                    >
                      <Icon>star_outline</Icon>
                    </Fab>
                </Hidden>
                <span className="card__roject-name font-medium">
                  Bank Details
                </span>
              </div>
            </Grid>

            <Grid item md={6} xs={4}>
              <div className="text-muted">
                Add Your Bank Details
              </div>
            </Grid>
          </Grid>
        </Card>
      </Link>}
      <div className="py-2" />
      {(this.props.profile.length == 0 || this.props.profile.relationship == "")&&
      <Link to="/profile">
      <Card className="py-2 px-4 project-card">
        <Grid container alignItems="center">
          <Grid item md={6} xs={7}>
            <div className="flex items-center">
              <Checkbox />
              <Hidden smDown>
                  <Fab
                    className="ml-4 bg-green box-shadow-none text-white"
                    size="small"
                  >
                    <Icon>star_outline</Icon>
                  </Fab>
              </Hidden>
              <span className="card__roject-name font-medium">
               Update Profile
              </span>
            </div>
          </Grid>

          <Grid item md={6} xs={4}>
            <div className="text-muted">
              Edit Your Profile
            </div>
          </Grid>
        </Grid>
      </Card>
      </Link>}
    </Fragment>
    )
};
  }
  

export default RowCards;
