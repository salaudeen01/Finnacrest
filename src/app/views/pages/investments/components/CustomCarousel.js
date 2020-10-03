import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import bgimage from "../../../../../assets/sesisSavings1.jpeg"
import bgimage1 from "../../../../../assets/sesisSavings2.jpeg"
// import bgimage2 from "../../../../../assets/sesis2.jpeg"
import bgimage4 from "../../../../../assets/sesisSavings3.jpeg"
// import bgimage3 from "../../../../../assets/sesis2.jpeg"
 
export default function CustomCarousel(props)
{
    var items = [
        {
            name: "Random Name #1",
            // img: "/assets/images/loan-banner.jpeg"
            img: bgimage4
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
                items.map( (item, i) => <img key={i} src={item.img} style={{borderRadius:4}}/> )
            }
        </Carousel>
    )
}