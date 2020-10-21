import React, { Component } from 'react'
import { Typography, Grid, Card } from '@material-ui/core'
import SimpleForm from 'app/views/material-kit/forms/SimpleForm'
import CustomForm from './CustomForm'

class Section2 extends Component {
    render() {
        const style = {
            typo:{
                fontFamily:"Montserrat, sans-serif",
                color:"#000"
            }
        }
        return (
            <Grid container direction="row" justify="space-between" alignItems="center" style={{paddingLeft:60, paddingRight:60}}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <img src="/assets/sesis3.jpeg" width="358px"/>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Card  style={{backgroundColor:"inherit"}} elevation={0}>
                        <Typography variant="h4" className="text-white">
                            Cultivate a habit of Savings
                        </Typography>
                        <Typography style={style.typo} variant="p" className="text-gray font-bold pt-3">
                        Fast, secure and reliable. Saving and withdrawing your money at your convinience and also make a target .
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

export default Section2
