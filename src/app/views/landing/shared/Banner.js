import React, { Component } from 'react';

import {
    Typography,
    Grid,
    Card,
    Button,
  } from "@material-ui/core";

class Banner extends Component {
    render() {
        return (
<div className="WhoCreateBusiness">
<div className="Container">
    <div className="WhoCreateInner Row AlignItemsCenter D-Flex">
        <div className="col-lg-5">
            <img className="ImgFluid" src="" alt=""/>
        </div>
        <div className="ColLg7">
            <div className="WhoCreateText">
                <h2>Who Create Business</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere corrupti molestias nesciunt harum exercitationem vero velit, ad aperiam odio voluptatem eos, quaerat ullam et? Reprehenderit enim quisquam necessitatibus dignissimos doloribus.</p>
                <div className="Row">
                    <div className="ColSm6">
                        <ul className="List">
                            <li>
                                <a href="#">
                                <i className="">
                                    ::before
                                </i>
                                "Audit & Assurance"
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                <i className="">
                                    ::before
                                </i>
                                "Business Services"
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                <i className="">
                                    ::before
                                </i>
                                "IT Control Solutions"
                                </a>
                            </li>                                            
                        </ul>
                    </div>
                    <div className="ColSm6">
                        <ul className="List">
                            <li>
                                <a href="#">
                                <i className="">
                                    ::before
                                </i>
                                "Think deep"
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                <i className="">
                                    ::before
                                </i>
                                "Business Services"
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                <i className="">
                                    ::before
                                </i>
                                "IT Control Solutions"
                                </a>
                            </li>                                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
        )
    }
}

export default Banner
