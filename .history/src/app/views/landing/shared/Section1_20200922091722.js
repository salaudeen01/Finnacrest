import React, { Component } from 'react'
import { Typography, Grid, Card, Button, CardActions, Hidden } from '@material-ui/core'
import SimpleForm from 'app/views/material-kit/forms/SimpleForm'
import CustomForm from './CustomForm'

class Section1 extends Component {
 
    render() {
       const style = {
            typo:{
                fontFamily:"Lobster, cursive",
            }
        }
        return (
            <Grid container direction="row" justify="space-between" alignItems="center" style={{paddingLeft:60, paddingRight:60}}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Card style={{backgroundColor:"inherit"}} elevation={0} className="p-5">
                        <Typography className="text-white mb-3" style={style.typo} variant="h2">
                        Download SESIS Mobile App
                        </Typography>
                    <img src="/assets/images/download.png" />
                    </Card>
                </Grid>
                <Hidden smDown>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                        <img src="/assets/images/phone1.png" />
                    </Grid>
                </Hidden>
            </Grid>
        )
    }
}

export default Section1
