import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
 
export default function CustomSlider(props)
{
    var items = [
        {
            name: "Random Name #1",
            img: props.image1
        },
        {
            name: "Random Name #2",
            img: props.image2
        },
        {
            name: "Random Name #3",
            img: props.image3
        }
    ]
 
    return (
        <Carousel indicators={false} animation="slide">
            {
                items.map( (item, i) => <img key={i} src={item.img} /> )
            }
        </Carousel>
    )
}