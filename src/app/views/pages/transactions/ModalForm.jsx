import React,{Component} from "react";
import SimpleTable from "./SimpleTable";
import PaginationTable from "./PaginationTable";
import { Breadcrumb, SimpleCard } from "matx";
import {getConfig, setLastUrl, checkUserStatus, numberFormat} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import history from '../../../../history'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import Lottie from 'react-lottie';
import cube from "../../../../lottiefiles/26519-cube-spinning";
import Loading from "matx/components/MatxLoading/MatxLoading";
import { AppBar, Button, Card, Dialog, DialogActions, Grid, IconButton, Toolbar, Typography } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import PayOption from "app/views/dashboard/shared/PayOption";
import swal from "sweetalert";

class ModalForm extends Component {
  constructor(props) {
    super(props);
    setLastUrl() 
    let email = localStorage.getItem("email");
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let date =
      currentDate.getFullYear() + "-" + month + "-" + currentDate.getDate();
    this.state = {
      fund_data:{
        date_time: date,
        paystack_id: "",
        registration_fee: 0
      },     
      registrationFee: 0,
      loading: true,
    };       
  }

  callback = (response) => {
      const { fund_data } = this.state;
      if (fund_data.registration_fee) {
        this.setState({
        fund_data: { ...fund_data, paystack_id: response.reference },
      });
    }
  };

    componentDidMount(){
      const requestOptions = {
        method: "GET",
        headers: { ...authHeader(), "Content-Type": "application/json" },
      };
      const {fund_data} = this.state
      fetch(getConfig("getRegistrationFee"), requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            this.setState({loading: false });
            return Promise.reject(error);
          }          
          this.setState({ loading: false, fund_data:{...fund_data, registration_fee:data}});
          console.log(data)
        });
    }

    componentDidUpdate() {
        const { fund_data } = this.state;
        if (fund_data.paystack_id !== "") {
          this.props.addRegistrationFee(fund_data);
          this.setState({ fund_data: { ...fund_data, paystack_id: "" } });
        }
    }

      handleSubmitFund(event) {
        event.preventDefault();
        const { fund_data } = this.state;
        if (fund_data.registration_fee) {
          this.props.addRegistrationFee(fund_data);
        } else {
          swal(`${"All fields are required"}`);
        }
      }

      handleChangeFund = (event) => {
        const { fund_data } = this.state;
        const { name, value } = event.target;
        this.setState({ fund_data: { ...fund_data, [name]: value } });
      };

  render(){
    const {registrationFee, fund_data, loading} = this.state
    return (
      <div className="pt-7 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      {loading ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        <>
      <Card className='px-1 pt-2 pb-4'>
            <ValidatorForm
              ref='form'
              onSubmit={this.handleSubmitFund}
              onError={(errors) => null}
            >
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextValidator
                    className='mb-4 w-full'
                    label='Enter registration_fee'
                    // onChange={this.handleChangeFund}
                    readOnly
                    type='number'
                    name='registration_fee'
                    value={fund_data.registration_fee}
                    // validators={["required"]}
                    // errorMessages={["this field is required"]}
                  />                 
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Card className='px-6 pt-2 pb-4'>
                    <Typography variant='h6' gutterBottom>
                      {numberFormat(fund_data.registration_fee)}
                    </Typography>
                  </Card>                 
                    <PayOption
                      callback={this.callback}
                      amount={fund_data.registration_fee}
                    />
                </Grid>
              </Grid>
            </ValidatorForm>
        </Card> 
        </>}
    </div>
  
    );
  };
}
const actionCreators = {
  timeOut: userActions.timeOut,
  addRegistrationFee: userActions.addRegistrationFee,

};

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(ModalForm))
);
