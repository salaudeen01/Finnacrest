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
  Button
} from "@material-ui/core";

// const CartSummary = (props) => {
//   const {count, total, loading, ...rest} = props;
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [page, setPage] = React.useState(0);
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
            card_id:"0"
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
        showSaveCard:false,      
      }
      this.handleSaveCard = this.handleSaveCard.bind(this);
      this.handleCloseSaveCard = this.handleCloseSaveCard.bind(this);
      this.handleChangeAddCard = this.handleChangeAddCard.bind(this);
      this.handleChangeFund = this.handleChangeFund.bind(this);
      this.handleSubmitFund = this.handleSubmitFund.bind(this);
    }

    componentDidMount(){
        const {id} = this.state
        let user = JSON.parse(localStorage.getItem('user'));
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
    }
    callback = (response) => {
        const {fund_data, add_card} = this.state
        if (fund_data.total ) {
            this.setState({fund_data:{...fund_data, paystack_id: response.reference }})
            swal("Loading...", {
              buttons: false
            })
        }else{
          this.setState({add_card:{...add_card, paystack_id: response.reference }, showSaveCard:false})
          swal("Saving Card...", {
            buttons: false
          })
        }
      }
      componentDidUpdate(){
        const { fund_data, add_card, data } = this.state;
        if (fund_data.paystack_id !== "") {
          this.props.checkOut(fund_data);
          this.setState({fund_data:{...fund_data, paystack_id:""}})
        }
      }
      
      close = () => {
        console.log("Payment closed");
      }
      handleSubmitFund(event) {
        event.preventDefault();
        const { fund_data } = this.state;
        console.log(fund_data)
        if (fund_data.total && fund_data.payment_method) {
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
        const {fund_data} = this.state
        const {name, value, checked} = event.target
        if(name == "save_card"){
          this.setState({fund_data:{...fund_data, [name]:checked}})
        }else if(name == "payment_method"){
          this.setState({fund_data:{...fund_data, [name]:value, total:this.props.total}})
        }else{
          this.setState({fund_data:{...fund_data, [name]:value }})
        }
      };
 render(){
   
    const { count, products, total, loading,} = this.props;
    const { cards, fund_data, add_card, showSaveCard } =this.state
    let amt = 0
    let tol = 0
    this.props.products.forEach(p => {
      amt+=p.down_payment * p.cart_quantity
      tol+=p.cart_price * p.cart_quantity
    });
    const price = tol - amt
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
                    {numberFormat(tol)}
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
                      {numberFormat(amt)}
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
                    {numberFormat(price)}
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
                      <PayOption callback={this.callback} amount={this.props.total}/>
                      </Grid>}
                  
                    {fund_data.payment_method == "co-operative" &&                      
                        <Grid item lg={12} md={12} sm={12} xs={12}>      
                        <TextField
                            className="w-full"
                            select
                            label="Select Payment Method"
                            value={fund_data.payment}
                            name="payment"
                            onChange={this.handleChangeFund}
                            helperText="Please select Payment Method"
                        >
                            <MenuItem value={""}></MenuItem>
                            <MenuItem value={"Wallet"}>Wallet</MenuItem>
                            <MenuItem value={"Card"}> Debit Card </MenuItem>
                        </TextField>                       
                        </Grid>                      
                        }
                        {fund_data.payment_method == "co-operative" && 
                        <>
                        {fund_data.payment == "Card" &&
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                          <Typography>Choose Card</Typography>
                          <PayCard cards={cards} value={fund_data.card_id} 
                          open={(e)=>this.setState({ fund_data:{...fund_data, card_id:""}})} 
                          handleChange={this.handleChangeFund}/>
                          </Grid>}
                          {fund_data.card_id == "" && fund_data.payment == "Card" &&
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                              <Checkbox
                                  name="save_card"
                                  checked={fund_data.save_card}
                                  onChange={this.handleChangeFund}
                                  inputProps={{ 'aria-label': 'primary checkbox' }}
                              /><Typography variant="caption">Would you like to save your card</Typography>
                          </Grid>}
                          {fund_data.card_id == "" && fund_data.payment == "Card" &&
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                          <PayOption callback={this.callback} amount={this.props.total}/>
                          </Grid>}                  
                      </>
                        }
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
               {(fund_data.payment == "Wallet" || fund_data.payment == "Card" ||
                fund_data.payment_method == "Debit Card" || (fund_data.card_id !="0" && fund_data.card_id !="")) &&
                <Button className="uppercase"
                        onClick={this.handleSubmitFund}
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
  editRegularSavings:userActions.editRegularSavings
};

function mapState(state) {
  const {savings} = state.savings
  return {savings}
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(CartSummary))
);
