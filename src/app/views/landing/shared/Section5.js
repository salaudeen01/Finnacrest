import React, { Component } from 'react'
import { Typography, Grid, Card } from '@material-ui/core'
import SimpleForm from 'app/views/material-kit/forms/SimpleForm'
import CustomForm from './CustomForm'

class Section5 extends Component {
    render() {
        const style = {
            typo:{
                fontFamily:"Montserrat, sans-serif",
                color:"#000"
            }
        }
        return (
            <Grid container direction="row" justify="center" alignItems="center" >
                {/* <Grid item lg={6} md={6} sm={12} xs={12} >
                    <img src="/assets/images/01.png" style={{height:300}}/>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Card style={{backgroundColor:"inherit"}} elevation={0}>
                        <Typography variant="h4" className="text-white">
                            Save and Invest At Your Convenience
                        </Typography>
                        <Typography style={style.typo} variant="p" className="text-gray font-bold pt-3">
                        No Haram charges, no unlawful investments, no interest loan. Download SESIS now and take control of your money and wealth.
                        </Typography>
                    </Card>
                    <img src="/assets/images/download.png" alt="" />
                </Grid> */}

                <div className="card">
                    <div className="row g-0">
                    <div className="col-md-4">
                        <img src="/assets/images/01.png" style={{height:300, paddingLeft:100, paddingRight:40}}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body text-center" style={{paddingRight:100, paddingLeft:40}}>
                        <h2 className="card-title mt-10">Save and Invest At Your Convenience</h2>
                        <p className="card-text">No Haram charges, no unlawful investments, no interest loan. <br/>
                             Download SESIS now and take control of your money and wealth.</p>
                        <p className="card-text"><img src="/assets/images/download.png" alt="" /><img src="/assets/images/download.png" alt="" /></p>
                        </div>
                    </div>
                </div>
            </div>
            </Grid>
        )
    }
}

export default Section5
