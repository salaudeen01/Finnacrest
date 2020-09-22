import React from "react";
import { Grid, Card, Typography, Button, CardActionArea, CardActions, CardContent, CardMedia } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import {numberFormat} from '../../../../config/config'
import dateFormat from "dateformat"
class MarketCard2 extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let { data, view} = this.props;
    return (
                <Card >
                    <CardActionArea>
                        <Grid container >
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <CardMedia style={{height:140}}
                                    image={data.investment_pic}
                                    title={data.investment_type}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    {data.investment_type}
                                    </Typography>
                                    <Typography variant="body2" className="font-bold" color="textSecondary" component="p">
                                    Current Values: {numberFormat(data.current_values)} per unit
                                    </Typography>
                                    <Typography variant="body2" className="font-bold" color="textSecondary" component="p">
                                    Expected Returns: {numberFormat(data.expected_returns * data.slots)}
                                    </Typography>
                                    <span style={{color: '#fff', backgroundColor: "green", padding:3, marginTop:20, borderRadius:5}}>
                                    {data.slots + " Slot"}
                                    </span>
                                    <Typography variant="body2" className="font-bold" color="textSecondary" component="p">
                                    Maturity Date: {dateFormat(data.maturity_date, "mmmm dS, yyyy")}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={view} size="small" variant="outlined" color="secondary">
                                        See Details
                                    </Button>
                                </CardActions>
                            </Grid>
                        </Grid>
                    </CardActionArea>
                </Card>
              
    );
  };
  
}

export default withStyles({}, { withTheme: true })(MarketCard2);
