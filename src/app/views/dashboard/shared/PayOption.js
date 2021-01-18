import React, { Component } from 'react'
import {getReference, getConfig, payID } from '../../../config/config'
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
            reference:"",
        }
        this.close = this.close.bind(this);
        
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
        localStorage.setItem("token", data[0].token);
        this.setState({reference:data[0].code})
    })
    .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut()
        }
    });
}

close = () => {
    console.log("Payment closed");
}
    render() {
        const {email, key} = this.state
        const {amount, callback} = this.props
        console.log(amount, email)
        return (
            <div>
                {key ?
                <PaystackButton
                    text="Make Payment"
                    className="payButton"
                    callback={callback}
                    close={this.close}
                    disabled={true}  
                    embed={true}  
                    reference={getReference()}
                    email={email}
                    amount={amount * 100}
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