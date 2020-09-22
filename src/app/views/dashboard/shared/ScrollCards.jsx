import React from "react";
import { Grid, Card, Icon, IconButton, Tooltip, Button, Box, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";


class ScrollCards extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let { theme } = this.props;
    return (
        <div style={{ width: "auto", whiteSpace: 'nowrap' }}>
            <Box component="div" my={2} overflow="auto" bgcolor="background.paper">
                <div className="play-card p-sm-24 bg-paper" elevation={6}>
                    <div className="flex items-center">
                        <Icon style={{fontSize: "44px", opacity: 0.6, color: theme.palette.primary.main}}>group</Icon>
                        <div className="ml-3">
                            <small className="text-muted"> Wallet Balance</small>
                            <h6 className="m-0 mt-1 text-primary font-medium">{this.props.wallet_balance}</h6>
                        </div>
                    </div>
                </div>
                <div className="play-card p-sm-24 bg-paper" elevation={6}>
                    <div className="flex items-center">
                        <Icon style={{fontSize: "44px", opacity: 0.6, color: theme.palette.primary.main}}>group</Icon>
                        <div className="ml-3">
                            <small className="text-muted"> Wallet Balance</small>
                            <h6 className="m-0 mt-1 text-primary font-medium">{this.props.wallet_balance}</h6>
                        </div>
                    </div>
                </div>
                <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center">
                    <Grid item >
                        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
                            <div className="flex items-center">
                            <Icon style={{fontSize: "44px", opacity: 0.6, color: theme.palette.primary.main}}>group</Icon>
                            <div className="ml-3">
                                <small className="text-muted"> Wallet Balance</small>
                                <h6 className="m-0 mt-1 text-primary font-medium">{this.props.wallet_balance}</h6>
                            </div>
                            </div>
                            <Tooltip title="View Details" placement="top">
                            <IconButton>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
                            </Tooltip>
                        </Card>
                    </Grid>
                    <Grid item >
                        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
                            <div className="flex items-center">
                            <Icon style={{fontSize: "44px", opacity: 0.6, color: theme.palette.primary.main}}>group</Icon>
                            <div className="ml-3">
                                <small className="text-muted"> Wallet Balance</small>
                                <h6 className="m-0 mt-1 text-primary font-medium">{this.props.wallet_balance}</h6>
                            </div>
                            </div>
                            <Tooltip title="View Details" placement="top">
                            <IconButton>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
                            </Tooltip>
                        </Card>
                    </Grid>
                    <Grid item >
                        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
                            <div className="flex items-center">
                            <Icon style={{fontSize: "44px", opacity: 0.6, color: theme.palette.primary.main}}>group</Icon>
                            <div className="ml-3">
                                <small className="text-muted"> Wallet Balance</small>
                                <h6 className="m-0 mt-1 text-primary font-medium">{this.props.wallet_balance}</h6>
                            </div>
                            </div>
                            <Tooltip title="View Details" placement="top">
                            <IconButton>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
                            </Tooltip>
                        </Card>
                    </Grid>
                    <Grid item >
                        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
                            <div className="flex items-center">
                            <Icon style={{fontSize: "44px", opacity: 0.6, color: theme.palette.primary.main}}>group</Icon>
                            <div className="ml-3">
                                <small className="text-muted"> Wallet Balance</small>
                                <h6 className="m-0 mt-1 text-primary font-medium">{this.props.wallet_balance}</h6>
                            </div>
                            </div>
                            <Tooltip title="View Details" placement="top">
                            <IconButton>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
                            </Tooltip>
                        </Card>
                    </Grid>
                    <Grid item >
                        <div className="play-card p-sm-24 bg-paper" elevation={6}>
                            <div className="flex items-center">
                                <Icon style={{fontSize: "44px", opacity: 0.6, color: theme.palette.primary.main}}>group</Icon>
                                <div className="ml-3">
                                    <small className="text-muted"> Wallet Balance</small>
                                    <h6 className="m-0 mt-1 text-primary font-medium">{this.props.wallet_balance}</h6>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                {/* <div className="play-card p-sm-24 bg-paper" elevation={6}>
                    <div className="flex items-center">
                        <Icon style={{fontSize: "44px", opacity: 0.6, color: theme.palette.primary.main}}>group</Icon>
                        <div className="ml-3">
                            <small className="text-muted"> Wallet Balance</small>
                            <h6 className="m-0 mt-1 text-primary font-medium">{this.props.wallet_balance}</h6>
                        </div>
                    </div>
                </div>
                <div className="play-card p-sm-24 bg-paper" elevation={6}>
                    <div className="flex items-center">
                        <Icon style={{fontSize: "44px", opacity: 0.6, color: theme.palette.primary.main}}>group</Icon>
                        <div className="ml-3">
                            <small className="text-muted"> Wallet Balance</small>
                            <h6 className="m-0 mt-1 text-primary font-medium">{this.props.wallet_balance}</h6>
                        </div>
                    </div>
                </div> */}
            </Box>
        </div>
        );
  };
  
}

export default withStyles({}, { withTheme: true })(ScrollCards);
