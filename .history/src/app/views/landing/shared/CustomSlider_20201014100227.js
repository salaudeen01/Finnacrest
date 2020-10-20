import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";

export default function CustomSlider(props) {

  return (
    <Carousel indicators={false} animation='slide'>
      {props.items.map((item, i) => (
        <img alt='' key={i} src={item.img} />
      ))}
    </Carousel>
  );
}
