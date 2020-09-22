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
            <Grid container direction="row" justify="center" alignItems="center" style={{paddingLeft:60, paddingRight:60}}>
                <Grid item lg={6} md={6} sm={12} xs={12} >
                    <img src="/assets/images/01.png" style={{height:300}}/>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Card style={{backgroundColor:"inherit"}} elevation={0}>
                        <Typography variant="h4" className="text-white">
                            Save and Invest At Your Convenient
                        </Typography>
                        <Typography style={style.typo} variant="p" className="text-gray font-bold pt-3">
                        No Haram charges, no unlawful investment, no interest loan. Download Cubevest now and take control of your money.
                        </Typography>
                    </Card>
                    <img src="/assets/images/download.png" />
                </Grid>
            </Grid>
        )
    }
}

export default Section5
