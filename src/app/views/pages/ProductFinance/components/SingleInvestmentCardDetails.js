import React, { Component } from 'react'
// import { Typography, Grid, } from '@material-ui/core';
import {numberFormat} from '../../../../config/config';
import { Grid, Card, Button, ButtonGroup, CardMedia, Typography, IconButton, Toolbar, AppBar, Dialog,
         MenuItem, TextField, Divider, }
 from '@material-ui/core';
 import CloseIcon from "@material-ui/icons/Close";
 import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
 import dateFormat from "dateformat"
import { Link } from 'react-router-dom';
class SingleInvestmentCardDetails extends Component {
    constructor(props){
        super(props)
        var applicationDate = new Date(this.props.investment.start_date);
        var maturityDate = new Date(this.props.investment.maturity_date);
        let applicationMonth = applicationDate.getMonth()
        let maturityMonth = maturityDate.getMonth()
        this.state ={
            maturityMonth:maturityMonth,
            applicationMonth:applicationMonth,
            showCart:false,
        }
        this.handleCart = this.handleCart.bind(this);
        this.handleCartClose = this.handleCartClose.bind(this);

    }
    handleCartClose() {
        this.setState({showCart:false});
      }
      handleCart = event => {
        this.setState({showCart: true});
    }
    handleAddToCart(){
    }

    createTable = () => {
            var text = [];
            // var i;
            for (let i = 0; i < 5; i++) {
            text += [i]+ "<br>";
            }
            console.log(text)
            return text
        }

    render() {
        const {investment, increment, cart, handleChange, addToCart,theme} = this.props
        const {showCart, applicationMonth,} = this.state
        return (
            <div className="pt-4 mb-4 px-2 bg-default"
             style={{flexGrow: 1, border:1,
                //  borderStyle:"solid", borderColor:"#04956a", 
                 borderBottomRightRadius:20, borderTopLeftRadius:20}}
             >
                {investment.map((newz, index) => (
                <Grid key={index} container spacing={2} justify="center" >
                
                    <Grid item lg={5} md={5} sm={12} xs={12}>
                    <CardMedia style={{height:240, }}
                        image={newz.image}
                        title={newz.product_name}            
                    />
                    </Grid>
                    <Grid item lg={7} md={7} sm={12} xs={12}>
                    <Grid className="pt-4 px-2">
                    <Typography style={{marginBottom:4, lineHeight:2, textAlign:'justify',}}>
                         {newz.product_name}
                     </Typography>
                     <Typography style={{marginBottom:8, lineHeight:2, textAlign:'justify',}}>
                        {newz.short_description}
                     </Typography>
                    </Grid>
                    <Divider/>
                    <Grid className="pt-4 mb-4 px-2 bg-default">
                    <h4>
                     {numberFormat(newz.price)}
                     </h4>
                    </Grid>
                    <Grid>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button>-</Button>
                            <Button>
                                {cart.quantity}
                            </Button>
                            <Button onClick={this.props.increment}>+</Button>
                        </ButtonGroup>
                    </Grid>
                    <Divider/>
                    <Grid className="pt-4 mb-4 px-2">                    
                    <Button className="uppercase"
                        size="large"
                        fullWidth
                        onClick={this.handleCart} 
                        variant="contained"
                        startIcon={<ShoppingCartIcon edge="start"/>}
                        style={{backgroundColor:"#f68b1e", color:"white", borderBottomRightRadius:10, 
                        borderBottomLeftRadius:10,borderTopRightRadius:10,borderTopLeftRadius:10}}>
                        Add to Cart
                    </Button>
                    </Grid> 
                </Grid>
                </Grid>
                    ))}
      
            <Dialog
                scroll="body"
                open={showCart}
                onClose={this.handleCartClose}>
                    <AppBar color="default" style={{position: "relative"}}>
                    <Toolbar>
                        <IconButton
                        edge="start"
                        color="inherit"
                        onClick={this.handleCartClose}
                        aria-label="Close"
                        >
                        <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" style={{marginLeft: 'theme.spacing(2)', flex: 1, color:"#fff"}}>
                        Add to Cart
                        </Typography>
                    </Toolbar>
                    </AppBar>
                    <Card className="px-6 pt-2 pb-4">
                    <Grid container spacing={2}>
                     <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography>
                        Description of the goods 
                    </Typography>                    
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Link to="/halal">
                    <Button className="uppercase"
                        size="large"
                        fullWidth
                        onClick={this.props.addToCart}
                        variant="contained"
                        style={{backgroundColor:"#f68b1e", color:"white", borderBottomRightRadius:10, 
                        borderBottomLeftRadius:10,borderTopRightRadius:10,borderTopLeftRadius:10}}>
                            Continue Shopping
                        </Button>
                    </Link>    
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Link to="/detail/cart">
                    <Button className="uppercase"
                        size="large"
                        onClick={this.props.addToCart}
                        fullWidth 
                        variant="contained"
                        style={{backgroundColor:"#f68b1e", color:"white", borderBottomRightRadius:10, 
                        borderBottomLeftRadius:10,borderTopRightRadius:10,borderTopLeftRadius:10}}>
                            View Cart and Checkout
                        </Button>
                    </Link>
                    </Grid>
                    </Grid>
                    </Card>
                </Dialog>
        
            </div>
        )
    }
}

export default SingleInvestmentCardDetails
