import React,{Component} from "react";
import SimpleTable from "../transactions/SimpleTable";
import PaginationTable from "../transactions/PaginationTable";
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
import { AppBar, Button, Card, Dialog, DialogActions, Divider, Grid, IconButton, List, ListItem, Toolbar, Typography } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import PayOption from "app/views/dashboard/shared/PayOption";
import swal from "sweetalert";

class ShareholdingFee extends Component {
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
        amount: "",
        date_time: date,
        payment_method: "Debit Card",
        paystack_id: "",
      },     
      shareMinFee: 0,
      loading: true,
    };       
  }

  callback = (response) => {
      const { fund_data } = this.state;
      if (fund_data.amount) {
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
      fetch(getConfig("shareholdingMinFee"), requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            this.setState({loading: false });
            return Promise.reject(error);
          }          
          this.setState({ loading: false, shareMinFee:data,  fund_data:{...fund_data, amount:data}});
          console.log(data)
        });
    }

    componentDidUpdate() {
        const { fund_data } = this.state;
        if (fund_data.paystack_id !== "") {
          this.props.addFundShareholdings(fund_data);
          this.setState({ fund_data: { ...fund_data, paystack_id: "" } });
        }
    }

      handleSubmitFund(event) {
        event.preventDefault();
        const { fund_data } = this.state;
        if (fund_data.amount) {
          this.props.addFundShareholdings(fund_data);
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
    const {shareMinFee, fund_data, loading} = this.state
    return (
      <div className="pt-7 mb-4 px-2 bg-default">
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
                {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextValidator
                    className='mb-4 w-full'
                    label='Registration Fee'
                    // onChange={this.handleChangeFund}
                    readOnly
                    type='number'
                    name='amount'
                    value={fund_data.amount}
                    // validators={["required"]}
                    // errorMessages={["this field is required"]}
                  />                 
                </Grid> */}
                <List>
                    <ListItem className="pt-5">
                        <Grid item lg={8} md={8} sm={8} xs={8}>
                            <Typography>Minimum Shareholding:</Typography>
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={4} style={{textAlign:'right'}}>
                            <b>
                            {numberFormat(shareMinFee)}
                            </b>
                        </Grid>
                    </ListItem>
                </List>
                <Divider/>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {/* <Card className='px-6 pt-2 pb-4'>
                    <Typography variant='h6' gutterBottom>
                      {numberFormat(fund_data.amount)}
                    </Typography>
                  </Card>                  */}
                    <PayOption
                      callback={this.callback}
                      amount={fund_data.amount}
                      type={'03'} targetId={"00"}
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
  addFundShareholdings: userActions.addFundShareholdings,
};

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(ShareholdingFee))
);
