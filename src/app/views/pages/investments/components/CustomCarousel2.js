import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import bgimage from "../../../../../assets/sesis-shareholding.jpg"
import bgimage1 from "../../../../../assets/sesis-shares.jpg"
import bgimage4 from "../../../../../assets/sesis-shareholding3.jpg"
import {
    Grid,
    Button,
  } from "@material-ui/core";
import StatCards2 from 'app/views/dashboard/shared/StatCards2';
import { numberFormat } from 'app/config/config';
 
export default function CustomCarousel(props)
{
    var items = [
        {
            name: "Random Name #1",
            // img: "/assets/images/loan-banner.jpeg"
            img: bgimage4,
        },
        {
            name: "Random Name #2",
            // img: "/assets/images/saving-banner.jpeg"
            img: bgimage1
        },
        {
            name: "Random Name #3",
            img: bgimage
        }
    ]
 
    return (
        <Carousel indicators={false}>
            {
                items.map( (item, i) => <Item key={i} item={item} balance={props.balance} handleQuickSave={props.handleQuickSave}  /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Grid style={{backgroundImage:`url(${props.item.img})`}} container spacing={1}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <StatCards2
            title={"Shareholdings"}
            color={"#0d60d8"}
            icon={"account_balance_wallet"}
            amount={numberFormat(props.balance)}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Button
            className='uppercase px-2 py-1'
            size='small'
            variant='contained'
            style={{
              backgroundColor: "#0d60d8",
              color: "white",
              borderRadius: 4
            }}
            onClick={props.handleQuickSave}
          >
            Fund Account
          </Button>
        </Grid>
      </Grid>
    )
}