import React from "react";
import { Grid, Card, Typography, Button, CardActionArea, CardActions, CardContent, CardMedia } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import {numberFormat} from '../../../../config/config'

class MarketCard extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let { theme, category, data, invest, view, status} = this.props;
    return (
          <Card style={{maxWidth:250}}>
            <CardActionArea>
              <CardMedia style={{height:140}}
                image={data.investment_pic}
                title={data.investment_type}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.investment_type}
                </Typography>
                <Typography variant="body2" className="font-bold" color="textSecondary" component="p">
                  {numberFormat(data.current_values)} per unit
                </Typography>
                {data.unit_remaining == 0 ?
                <span style={{color: '#fff', backgroundColor: "red", padding:3, marginTop:20, borderRadius:5}}>
                  Sold Out
                </span>:
                <span style={{color: '#fff', backgroundColor: "green", padding:3, marginTop:20, borderRadius:5}}>
                  {data.unit_remaining + " Slot"} Remaining
                </span>}
              </CardContent>
            </CardActionArea>
            <CardActions>
              {data.unit_remaining == 0?
              <Button onClick={invest} size="small" variant="outlined" color="secondary">
                See Details
              </Button>:
              <Button onClick={view} size="small" variant="contained" color="secondary" className="text-white font-bold">
                See Details
              </Button>}
            </CardActions>
          </Card>
    );
  };
  
}

export default withStyles({}, { withTheme: true })(MarketCard);
