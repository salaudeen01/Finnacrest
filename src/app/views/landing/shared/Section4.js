import React, { Component } from 'react'
import { Typography, Grid, Card, CardMedia, CardActionArea, CardContent, Button } from '@material-ui/core'
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
                {this.props.products.map((prod)=>(
                    <Grid item lg={4} md={4} sm={12} xs={12} className="px-20 pt-10">
                        <Card style={{width:300}}>
                            <CardActionArea>
                                <CardMedia
                                style={{height:140}}
                                image={prod.image}
                                title={prod.product_name}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {prod.product_name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {prod.short_description.length >=50 ?prod.short_description.substr(0,50):prod.short_description}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
                <Grid item>
                    <Button variant="text" color="primary">See More</Button>
                </Grid>
            </Grid>
        )
    }
}

export default Section4
