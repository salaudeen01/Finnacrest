import React, { Component, useEffect, useState } from "react";
import { getConfig, numberFormat, setLastUrl, payID } from '../../../../config/config'
import {authHeader} from '../../../../redux/logic'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import PayCard from "app/views/dashboard/shared/PayCard";
import swal from 'sweetalert'
import AddCardDialog from "app/views/dashboard/shared/AddCardDialog";
import PayOption from "app/views/dashboard/shared/PayOption";
import {
  Grid,
  List,
  Checkbox,
  TextField,
  MenuItem,
  Typography,
  Card,
  ListItem,
  Divider,
  Button,
  AppBar,
  Toolbar,
  Dialog,
  IconButton,
  Slide
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
  class CartSummary extends Component{
    constructor(props){
      super(props)
    const { products} = this.props;
    setLastUrl()
    let email =  localStorage.getItem('email');
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1
    let date = currentDate.getFullYear() +'-'+month+'-'+ currentDate.getDate();
    const { total} = this.props;
    this.state = {
        fund_data:{
            total: 0,
            date_time: date,
            payment_method: "",
            save_card:true,
            paystack_id: "",
            card_id:"0",
            remaining_amount:0
        },
        down_data:{
          total_down_payment: "",
          date_time: date,
          form_payment: "",
          save_card:true,
          paystack_id: "",
          card_id:"0",
          // remaining_amount:0
      },
        add_card:{
            total: 100,
            date_time: date,
            payment_method: "Debit Card",
            save_card:true,
            paystack_id: "",
            card_id:""
        },
        cards:[],
        page:0,
        rowsPerPage:5,  
        showSave:false,
        showSaveCard:false,
        total:0,
        amount:0,
        remaining_amount:0,
        products:[] 
      }
      this.getTotalAmount = this.getTotalAmount.bind(this);
      this.handleSaveCard = this.handleSaveCard.bind(this);
      this.handleCloseSaveCard = this.handleCloseSaveCard.bind(this);
      this.handleChangeAddCard = this.handleChangeAddCard.bind(this);
      this.handleChangeFund = this.handleChangeFund.bind(this);
      this.handleChangeFunds = this.handleChangeFunds.bind(this);
      this.handleSubmitFund = this.handleSubmitFund.bind(this);
      this.handleQuickSave = this.handleQuickSave.bind(this);
      this.handleCloseQuickSave = this.handleCloseQuickSave.bind(this);
    }

    componentDidMount(){
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
        };    
        fetch(getConfig('getAllDebitCards'), requestOptions)
        .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        if(data.success == false || data.length == 0 ){
          this.setState({cards: []});
        }else{
          this.setState({cards: data});  
        }
      })
      .catch(error => {
        if (error === "Unauthorized") {
          this.props.timeOut()
          }
      });
      fetch(getConfig('getAllProductInCart'), requestOptions)
      .then(async response => {
      const data = await response.json();
      if (!response.ok) {
        console.log(response)
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      } 
      if(data.success == false){
        this.setState({ products: []});
      }else{
        this.setState({products: data.my_carts, loading:false });
      }
      this.getTotalAmount()
      })
    // .catch(error => {
    //   if (error === "Unauthorized") {
    //         this.props.logout()
    //      }
    //   this.setState({loading:false, err : "internet error" });
    //   console.error('There was an error!', error);
    // });
  }
  callback = (response) => {
      const {fund_data, add_card,down_data} = this.state
      if (fund_data.total ) {
          this.setState({fund_data:{...fund_data, paystack_id: response.reference }})
          swal("Loading...", {
            buttons: false
          })
      }else if(down_data.total_down_payment){
        this.setState({down_data:{...down_data, paystack_id: response.reference }})
        swal("Loading...", {
          buttons: false
        })
      }else {
        this.setState({add_card:{...add_card, paystack_id: response.reference }, showSaveCard:false})
        swal("Saving Card...", {
          buttons: false
        })
      }
  }
    getTotalAmount=()=>{
      const {down_data, fund_data, products} = this.state
      let amt = 0
      let tol = 0
      products.forEach(p => {
        amt+=p.down_payment * p.cart_quantity
        tol+=p.cart_price * p.cart_quantity
      });
      const price = tol - amt
      this.setState({down_data: {...down_data, total_down_payment:amt}, total:tol, amount:amt, remaining_amount:price})
      this.setState({fund_data: {...fund_data, remaining_amount:price}})
    
    }
    
    componentDidUpdate(){
      const { fund_data, add_card, data,down_data } = this.state;
      if (fund_data.paystack_id !== "") {
        this.props.checkOut(fund_data);
        this.setState({fund_data:{...fund_data, paystack_id:""}})
      }
      if (down_data.paystack_id !== "") {
        this.props.make_down_payment(down_data);
        this.setState({down_data:{...down_data, paystack_id:""}})
      }
      // if (add_card.paystack_id !== "" ) {
      //   this.props.saveWallet(add_card)
      //   this.setState({add_card:{...add_card, paystack_id:"" }, id:false})
      // }
      // if(localStorage.getItem("card_id")){
      //   this.setState({data:{...data, card_id: localStorage.getItem("card_id") }})
      //   console.log(localStorage.getItem("card_id"))
      //   localStorage.removeItem("card_id")
      // }
    }
      
    close = () => {
      console.log("Payment closed");
    }
    handleSubmitFund(event) {
      event.preventDefault();
      const { fund_data,down_data } = this.state;
      if (fund_data.payment_method == "co-operative") {
          this.props.checkOut(fund_data);
          this.props.make_down_payment(down_data);
        }else if(fund_data.payment_method == "Debit Card"){
          this.props.checkOut(fund_data);
        }else{
          swal(
              `${"All fields are required"}`
          );
      }
    }
    handleSaveCard = event => {
      this.setState({showSaveCard: true});
    }
    handleQuickSave = event => {
      this.setState({showSave: true});
    }
    handleCloseQuickSave() {
      this.setState({showSave:false});
    }
    handleCloseSaveCard() {
      this.setState({showSaveCard:false});
    }
    handleChangeAddCard = event => {
      const {fund_data} = this.state
      const {name, value, checked} = event.target
      if(name == "save_card"){
        this.setState({fund_data:{...fund_data, [name]:checked}})
      }else{
        this.setState({fund_data:{...fund_data, [name]:value}})
      }
    };
    handleChangeFund = event => {
      const {fund_data, total} = this.state
      const {name, value, checked} = event.target
      if(name == "save_card"){
        this.setState({fund_data:{...fund_data, [name]:checked}})
      }else if(name == "payment_method"){
        this.setState({fund_data:{...fund_data, [name]:value, total:total}})
      }else{
        this.setState({fund_data:{...fund_data, [name]:value }})
      }
    };
    handleChangeFunds = event => {
      const {down_data,amount} = this.state
      const {name, value, checked} = event.target
      if(name == "save_card"){
        this.setState({down_data:{...down_data, [name]:checked}})
      }else if(name == "payment_method"){
        this.setState({down_data:{...down_data, [name]:value, total_down_payment:amount}})
      }else{
        this.setState({down_data:{...down_data, [name]:value}});
      }
    };
 render(){
   
    // const { count, products, down_amt, loading,} = this.props;
    const { cards, fund_data, showSave, down_data, add_card, showSaveCard, total, amount, remaining_amount} =this.state
  return (
    <Card elevation={3} className="mb-6">
    {/* <CardContent> */}
          <List>
            <ListItem className="pt-5">
                <Grid item lg={6} md={6} sm={6} xs={6}>
                   <b><h6>Order Summary</h6></b> 
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6} style={{textAlign:'right'}}>
                    <b>
                       {this.props.count} item
                    </b>
                </Grid>
            </ListItem>
            <Divider/>
            <ListItem className="pt-5">
                <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography>Total Price:</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6} style={{textAlign:'right'}}>
                    <b>
                    {numberFormat(total)}
                    </b>
                </Grid>
            </ListItem>
            <Divider/>
            {fund_data.payment_method == "co-operative" &&
              <>
              <ListItem className="pt-5">
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography>Down Payment:</Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} style={{textAlign:'right'}}>
                      <b>
                      {numberFormat(amount)}
                      </b>
                  </Grid>
              </ListItem>
              <Divider/>
            <ListItem className="pt-5">
                <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography>Remaining Amount:</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6} style={{textAlign:'right'}}>
                    <b>
                    {numberFormat(remaining_amount)}
                    </b>
                </Grid>
            </ListItem>
            <Divider/>               
              </>    
            }
            <ListItem className="pt-5">              
              <Grid item lg={12} md={12} sm={12} xs={12}>
              <ValidatorForm
                  ref="form"
                  onSubmit={this.handleSubmitFund}
                  onError={errors => null}>
                  <Grid container spacing={6}>
                      <Grid item lg={12} md={12} sm={12} xs={12}>      
                      <TextField
                          className="w-full"
                          select
                          label="Select Payment Method"
                          value={fund_data.payment_method}
                          name="payment_method"
                          onChange={this.handleChangeFund}
                          helperText="Please select Payment Method"
                      >
                          <MenuItem value={""}></MenuItem>
                          <MenuItem value={"co-operative"}> Co-Operative</MenuItem>
                          <MenuItem value={"Debit Card"}> Debit Card </MenuItem>
                      </TextField>                        
                      </Grid>

                      {fund_data.payment_method == "Debit Card" &&
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Typography>Choose Card</Typography>
                      <PayCard cards={cards} value={fund_data.card_id} 
                      open={(e)=>this.setState({ fund_data:{...fund_data, card_id:""}})} 
                      handleChange={this.handleChangeFund}/>
                      </Grid>}
                      {fund_data.card_id == "" && fund_data.payment_method == "Debit Card" &&
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                          <Checkbox
                              name="save_card"
                              checked={fund_data.save_card}
                              onChange={this.handleChangeFund}
                              inputProps={{ 'aria-label': 'primary checkbox' }}
                          /><Typography variant="caption">Would you like to save your card</Typography>
                      </Grid>}
                      {fund_data.card_id == "" && fund_data.payment_method == "Debit Card" &&
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                      <PayOption callback={this.callback} amount={this.props.total} type={'09'} targetId={'00'}/>
                      </Grid>}
                  
                   </Grid>
                  </ValidatorForm>

              </Grid>
          
            </ListItem>
            <Divider/>
            <ListItem className="">
                <Grid item lg={12} md={12} sm={12} xs={12}>
                {this.props.savings &&
                  <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  }
               {( fund_data.payment_method == "Debit Card" || (fund_data.card_id !="0" && fund_data.card_id !="")) &&
                <Button className="uppercase"
                        onClick={this.handleSubmitFund}
                        size="medium"
                        fullWidth 
                        variant="contained"
                        style={{backgroundColor:"#222943", color:"white", borderBottomRightRadius:10, 
                        borderBottomLeftRadius:10,borderTopRightRadius:10,borderTopLeftRadius:10}}>
                   Checkout
                   </Button>}
                   {( fund_data.payment_method == "co-operative" )&&
                    <Button className="uppercase"
                        onClick={this.handleQuickSave}
                        size="medium"
                        fullWidth 
                        variant="contained"
                        style={{backgroundColor:"#222943", color:"white", borderBottomRightRadius:10, 
                        borderBottomLeftRadius:10,borderTopRightRadius:10,borderTopLeftRadius:10}}>
                    Checkout
                    </Button>}
                </Grid>
            </ListItem>
        </List>
        <AddCardDialog callback={this.callback} showSave={showSaveCard} handleClose={this.handleCloseSaveCard} add_card={add_card} />
    {/* </CardContent> */}

        {/* Quick Save Dialog Start */}
        <Dialog
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description" 
            open={showSave}
            onClose={this.handleCloseQuickSave}
            scroll="body">
          <AppBar style={{position: "relative",}} color='primary'>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseQuickSave}
                aria-label="Close"
              >
                <CloseIcon style={{color:'#fff'}}/>
              </IconButton>
              <Typography variant="h6" className="text-white" style={{flex: 1}}>
                Down Payment
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4">
            <Card>
              <Typography>
                    30% of the Actual Price is required to be paid to procceed
              </Typography>
            </Card>
            <List>
                <ListItem className="pt-5">
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography>Down Payment:</Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6} style={{textAlign:'right'}}>
                      <b>
                      {numberFormat(amount)}
                      </b>
                  </Grid>
              </ListItem>
              <ListItem className="">          
                  <ValidatorForm
                  ref="form"
                  onSubmit={this.handleSubmitFund}
                  onError={errors => null}>
                  <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                        className="mb-2 w-full"
                        select
                        label="Select Payment Method"
                        value={down_data.form_payment}
                        name="form_payment"
                        onChange={this.handleChangeFunds}
                        helperText="Please select Payment Method"
                      >
                        <MenuItem value={""}></MenuItem>
                        <MenuItem value={"Wallet"}> Wallet</MenuItem>
                        <MenuItem value={"Debit Card"}> Debit Card </MenuItem>
                    </TextField>
                    
                    </Grid>

                      <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Card className="">
                        <Typography variant="h6" gutterBottom>
                          {numberFormat(down_data.total_down_payment)}
                        </Typography>
                      {/* </Card>
                      <Card className=""> */}
                        <Typography variant="h6" gutterBottom>
                          {down_data.form_payment}
                        </Typography>
                      </Card>
                    </Grid>
                          {/* <Grid item lg={12} md={12} sm={12} xs={12}> */}
                        <div style={{textAlign:'center', alignItems:'center',alignContent:'center'}}>
                          {this.props.savings && (
                            <img
                              img
                              alt=''
                              src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
                            />
                          )}  
                        </div>      
                      {/* </Grid> */}
                        {/* <Grid item lg={12} md={12} sm={12} xs={12}> */}
                        {((down_data.form_payment == "Wallet") || (down_data.card_id !="0" && down_data.card_id !="")) && 
                        <Button className="uppercase"
                          type="submit"
                          size="large"
                          variant="contained"
                          style={{backgroundColor:"#222943", color:"#fff"}}>
                          Make Payment
                        </Button>}
                    {/* </Grid> */}

                    {down_data.form_payment == "Debit Card" &&
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Typography>Choose Card</Typography>
                      <PayCard cards={cards} value={down_data.card_id} 
                      open={(e)=>this.setState({ down_data:{...down_data, card_id:""}})} 
                      handleChange={this.handleChangeFunds}/>
                    </Grid>}

                    {down_data.card_id == "" && down_data.form_payment == "Debit Card" &&
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Checkbox
                            name="save_card"
                            checked={down_data.save_card}
                            onChange={this.handleChangeFunds}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        /><Typography variant="caption">Would you like to save your card</Typography>
                        <PayOption callback={this.callback} amount={down_data.total_down_payment} type={'09'} targetId={'00'}/>
                    </Grid>
                    } 

                  </Grid>
                </ValidatorForm>
              </ListItem>
            </List>
          </Card>
        </Dialog>
        {/* Quick Save Dialog End */}    
    </Card>
    
  );
};
};
// export default CartSummary;
const actionCreators = {
  timeOut: userActions.timeOut,
  saveWallet:userActions.saveWallet,
  deactivateAutoSave: userActions.deactivateAutoSave,
  createRegularSavings: userActions.createRegularSavings,
  checkOut:userActions.checkOut,
  withdrawRegularSavings: userActions.withdrawRegularSavings,
  editRegularSavings:userActions.editRegularSavings,
  make_down_payment:userActions.make_down_payment
};

function mapState(state) {
  const {savings} = state.savings
  return {savings}
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(CartSummary))
);
