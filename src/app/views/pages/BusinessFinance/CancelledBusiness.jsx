import { Breadcrumb, SimpleCard } from "matx";
import React,{Component} from "react";
import {Link} from "react-router-dom"
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {Typography, Grid, AppBar, Dialog, IconButton, Toolbar, Card, Avatar, List, ListItemAvatar, ListItem, MenuItem, TextField, ListItemText, Checkbox } from "@material-ui/core";
import ExitToApp from '@material-ui/icons/ExitToApp';
import DoneAll from '@material-ui/icons/DoneAll';
import CloseIcon from "@material-ui/icons/Close";
import {getConfig, setLastUrl, numberFormat} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import Loading from "matx/components/MatxLoading/MatxLoading";
import MyRequest from "./components/MyRequest";
import CompleteRequest from "./components/CompleteRequest";
import swal from "sweetalert";

class CancelledBusiness extends Component {
  constructor(props){
    super(props)
    setLastUrl()
    let user = JSON.parse(localStorage.getItem("user"));
    let token = localStorage.getItem('token');
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    // let rand_id =this.getRand()
    this.state={
      tab: true,
      requested_business:[],
      loading:false
    }
    
    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" },
    };
    // let user = JSON.parse(localStorage.getItem("user"));
    fetch(getConfig('display_request'), requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
    console.log(response)
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }
  console.log(data)
  if(data.success == false  || data.length == 0 ){
    this.setState({ requested_business: []});
  }else{
    let newArray = [];
        data.forEach(d => {
          if(d.request_status == 9){
            newArray.push(d)
          }
        });
    this.setState({requested_business: newArray, loading:false });
  }  
})
    .catch(error => {
      if (error === "Unauthorized") {
        this.props.timeOut()
      }
    });
}
  callback = (response) => {
    const { data } = this.state;
      if (data.amount ) {
        this.setState({data:{...data, paystack_id: response.reference }})
    }
  }

render(){
  const {tab,loading,requested_business} = this.state
   return (
    <div className="">       
         {loading ? (
            <div
              style={{
                marginTop: 150,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyItems: "center",
              }}
            >
              <Loading />
            </div>
          ) : (
            <>
              <Grid container spacing={2}>              
              </Grid>
              <Grid container spacing={3}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div
                      className='pb-5 pt-7 px-2 bg-default'
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        borderColor: "#0d60d8",
                        borderRadius:8,
                      }}
                    >
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                      { requested_business.length != 0 ? (
                        requested_business.map((data, index) => (                        
                        // data.request_status == 9 ? (
                        
                          <CompleteRequest
                            key={index}
                            status={false}
                            amount={numberFormat(data.requested_amount)}
                            admin_price={numberFormat(data.total_amount)}                           
                            status={data.request_status}
                            title={data.business_name}
                            images={(data.image)}
                          />
                          // ) :
                          //     <Typography variant='body1'>
                          //       No Cancelled Business
                          //     </Typography>
                            ))
                          ) 
                          : (
                        <Typography variant='body1'>
                        No Cancelled Business Finance Request
                        </Typography>
                      )
                      }
                      </Grid>
                    </div>
                  </Grid>
              </Grid>
            </>
          )} 
    </div>
  );
}
}
// export default Regular;
const actionCreators = {
  timeOut: userActions.timeOut,
  acceptRequest: userActions.acceptRequest,
  rejectRequest: userActions.rejectRequest,
  saveWallet: userActions.saveWallet
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(CancelledBusiness))
);