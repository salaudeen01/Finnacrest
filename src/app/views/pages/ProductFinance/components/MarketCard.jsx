
import React from "react";
import { Grid, Card, Typography, Button, CardActionArea, CardActions, CardContent, CardMedia } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import {numberFormat} from '../../../../config/config'
import Color from 'color';
import Paginate from "../../transactions/paginate";

class MarketCard extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let { theme, category, data, invest, view, status} = this.props;
    let total_price = Number(data.price) + Number(data.mark_up)
    return (
      <CardActionArea style={{borderRadius: 16,transition: '0.2s','&:hover': {transform: 'scale(1.1)', },}}>
          <Card style={{maxWidth:250, alignItems:'center', alignContent:'center', borderRadius: 16,'&:hover': {
            boxShadow: `0 12px 12px 0 ${Color('blue') .rotate(-12) .darken(0.2) .fade(0.5)}`, },}}>
            {/* <CardActionArea> */}
              {/* <CardMedia style={{height:240}}
                image={data.image}
                title={data.product_name}
              /> */}
              <img style={{height:240}} src={data.image} alt={data.product_name}/>
              <CardContent style={{background:'#222341'}}>
                <Typography gutterBottom className="text-center text-white" component="h2" textOverflow="ellipsis" overflow="hidden" my={2}
                 style={{overflow: 'hidden', whiteSpace: "nowrap", textOverFlow: 'ellipsis', width:200}}>
                  {data.product_name}
                </Typography>
                <Typography variant="body2" variant="h6" className="font-bold text-center text-white" color="textSecondary" component="p">
                  {numberFormat(total_price)}
                </Typography>
              </CardContent>
            {/* </CardActionArea> */}
          </Card>
      </CardActionArea>
    );
  };
  
}

export default withStyles({}, { withTheme: true })(MarketCard);
