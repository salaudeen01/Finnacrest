import React, { Component } from 'react';

import {
    Typography,
    Grid,
    Card,
    Button,
  } from "@material-ui/core";

class CardBanners extends Component {
    render() {
        return (
            <div className="HomeService">
                <div className="Container">
                    <div className="row m0">
                        <div className="HServiceItem">
                            <h4>...</h4>
                            <p>I wish I could hurt you the way you hurt me. But I know that if I had the chance, I wouldn't</p>
                        </div>
                        <div className="HServiceItem">
                            <h4>...</h4>
                            <p>I wish I could hurt you the way you hurt me. But I know that if I had the chance, I wouldn't</p>
                        </div>
                        <div className="HServiceItem">
                            <h4>...</h4>
                            <p>I wish I could hurt you the way you hurt me. But I know that if I had the chance, I wouldn't</p>
                        </div>
                    </div>
                </div>                
            </div>
        )
    }
}

export default CardBanners
