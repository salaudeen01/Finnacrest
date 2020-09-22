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
              <CardMedia style={{height:240, margin:'auto'}}
                image={data.image}
                title={data.product_name}
              />
              <CardContent>
                <Typography gutterBottom  component="h2"  style={{overflow: 'hidden', whiteSpace: "nowrap", textOverFlow: 'ellipsis', width:200}}>
                  ...{data.product_name} 
                </Typography>
                <Typography variant="body2" variant="h6" className="font-bold" color="textSecondary" component="p">
                  {numberFormat(data.price)}
                </Typography>
                {/* {data.unit_remaining == 0 ?
                <span style={{color: '#fff', backgroundColor: "red", padding:3, marginTop:20, borderRadius:5}}>
                  Sold Out
                </span>:
                <span style={{color: '#fff', backgroundColor: "green", padding:3, marginTop:20, borderRadius:5}}>
                  {data.unit_remaining + " Slot"} Remaining
                </span>} */}
              </CardContent>
            </CardActionArea>
            {/* <CardActions>
              {data.unit_remaining == 0?
              <Button onClick={invest} size="small" variant="outlined" color="secondary">
                See Details
              </Button>:
              <Button onClick={view} size="small" variant="contained" color="secondary" className="text-white font-bold">
                See Details
              </Button>}
            </CardActions> */}
          </Card>
    );
  };
  
}

export default withStyles({}, { withTheme: true })(MarketCard);
