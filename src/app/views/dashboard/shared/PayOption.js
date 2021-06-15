
import React, { Component } from 'react'
import {getReference, getConfig, payID, numberFormat } from '../../../config/config'
import PaystackButton from 'react-paystack';
import { authHeader } from "../../../redux/logic";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { Typography } from '@material-ui/core';
import Loading from 'matx/components/MatxLoadable/Loading';

class PayOption extends Component {
    constructor(props){
        super(props)
        let email =  localStorage.getItem('email');
        this.state = {
            email: email,
            key: payID(),
            reference:""
        }
        this.close = this.close.bind(this);
        this.getReference = this.getReference.bind(this);
    }
componentDidMount(){
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    fetch(getConfig("getPayStackId"), requestOptions)
    .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        // this.setState({key: data[0].public_key})
        localStorage.setItem("token", data[0].token);

    })
    .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut()
        }
    });
    this.getReference()
}

getReference = () => {
    const {type, targetId} =this.props
    let user =   JSON.parse(localStorage.getItem('user'));
    let id = (user.user_id)
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
    for( let i=0; i < 7; i++ ){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    text= type + "-" + id.toString() + "-" + targetId + "-" +text
    this.setState({reference:text});
  }

pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

close = () => {
    console.log("Payment closed");
}
    render() {
        const {email, key, reference} = this.state
        const {amount, callback} = this.props
        let pay1 = (Number(amount) + (Number(amount) * 1.5 )/ 100)* 100
        let pay2 = (Number(amount) + ((Number(amount) * 1.5 )/ 100)+100)*100
        let pay3 = ((Number(amount) * 1.5 )/ 100)
        let pay4 = (((Number(amount) * 1.5 )/ 100)+100)
        return (
            <div>
                <Typography>
                    Paystack Gateway Commission : <span><b>{numberFormat(amount >= 2500 ? pay4: pay3)}</b></span>
                </Typography><br/>
                {key ?
                <PaystackButton
                    text="Make Payment"
                    className="payButton"
                    callback={callback}
                    close={this.close}
                    disabled={true}  
                    embed={true}  
                    reference={reference}
                    reference={getReference()}
                    email={email}
                    amount={amount >= 2500 ? pay2: pay1}
                    paystackkey={key}
                    tag="button" 
                />:
                <Loading />}
            </div>
        )
    }
}

// export default PayOption
function mapState(state) {
    const { savings } = state.savings;
    return { savings };
  }
  const actionCreators = {
    timeOut: userActions.timeOut,
  };
  
  export default withStyles({}, { withTheme: true })(
    withRouter(connect(mapState,  actionCreators)(PayOption))
  );