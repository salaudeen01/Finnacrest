import React, { Component } from 'react'
import { Typography, Grid, Card } from '@material-ui/core'
import SimpleForm from 'app/views/material-kit/forms/SimpleForm'
import CustomForm from './CustomForm'

class Section4 extends Component {
    render() {
        const style = {
            typo:{
                fontFamily:"Dancing Script, cursive",
                color:"#000"
            }
        }
        return (
            <Grid container >
                <Grid item lg={12} md={12} sm={12} xs={12} className="text-gray font-bold text-center p-10">
                    <Typography variant="p" >
                    Build wealth by aligning your investments with your principles. You don’t have to invest in companies whose activities or operations you fundamentally disagree with, ethical investment gives you that choice.
                    </Typography>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="px-20 pt-10">
                    <img src="/assets/images/investment01.jpg" style={{width:"100%", height:200}}/>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="px-20 pt-10">
                    <img src="/assets/images/investment02.jpg" style={{width:"100%", height:200}}/>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="px-20 pt-10">
                    <img src="/assets/images/investment03.jpg" style={{width:"100%", height:200}}/>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="px-20 pt-10">
                    <img src="/assets/images/investment04.jpg" style={{width:"100%", height:200}}/>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="px-20 pt-10">
                    <img src="/assets/images/investment05.jpg" style={{width:"100%", height:200}}/>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="px-20 pt-10">
                    <img src="/assets/images/investment06.jpg" style={{width:"100%", height:200}}/>
                </Grid>
            </Grid>
        )
    }
}

export default Section4
