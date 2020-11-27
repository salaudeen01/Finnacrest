import React from "react";
import Carousel from "react-material-ui-carousel";
import { Grid, Paper, Typography } from "@material-ui/core";
import img1 from "../../../../assets/sesis-shareholding.jpg";
import img2 from "../../../../assets/sesis-shareholding2.jpg";
import img3 from "../../../../assets/sesis-shareholding3.jpg";
export default function CustomSlider(props) {

    var items = [
      {
          name: "Random Name #1",
          // img: "/assets/images/loan-banner.jpeg"
          img: img1
      },
      {
          name: "Random Name #2",
          // img: "/assets/images/saving-banner.jpeg"
          img: img2
      },
      {
          name: "Random Name #3",
          img: img3
      }
  ]

  return (
    <div className="py-1">      
            <Carousel indicators={false}>
            {
                items.map( (item, i) => <img key={i} src={item.img} 
                style={{borderRadius:4, width:"100%"}}/> )
            }
            </Carousel>
    </div>
  );
}
