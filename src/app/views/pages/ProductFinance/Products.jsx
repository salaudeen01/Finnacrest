import React from "react";
import { Breadcrumb, SimpleCard } from "matx";
import StatCards2 from "../../dashboard/shared/StatCards2";
import {
  getConfig,
  numberFormat,
  payID,
  setLastUrl,
} from "../../../config/config";
import { authHeader } from "../../../redux/logic";
import history from "../../../../history";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Grid,
  Card,
  Button,
  Switch,
  IconButton,
  TextField,
  MenuItem,
  Typography,
  Toolbar,
  AppBar,
  Dialog,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import CloseIcon from "@material-ui/icons/Close";
import Lottie from "react-lottie";
import cube from "../../../../lottiefiles/26519-cube-spinning";
import swal from "sweetalert";
import TableCard from "../savings/components/TableCard";
import PayOption from "app/views/dashboard/shared/PayOption";
import Loading from "matx/components/MatxLoading/MatxLoading";
import MyProduct from "./components/MyProduct";
import OrderDetails from "./components/OrderDetails";

class Target extends Component {
  constructor(props) {
    super(props);
    setLastUrl();
    let email = localStorage.getItem("email");
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let date =
      currentDate.getFullYear() + "-" + month + "-" + currentDate.getDate();
    this.state = {
        my_products:[],
        tab: true,
        loading:true,
        showView:false,
        isLoading:true,

    };    
    this.ongoingTab = this.ongoingTab.bind(this);
    this.completeTab = this.completeTab.bind(this);
    this.handleView = this.handleView.bind(this);
    this.fetchSingleTargetTransaction = this.fetchSingleTargetTransaction.bind(this);
    this.handleCloseView = this.handleCloseView.bind(this);


  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" },
    };
    fetch(getConfig("fetchUserProducts"), requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
         if (data.success == false) {
          this.setState({ my_products: [] });
        } else {
          this.setState({ my_products: data, loading: false });
        }
        console.log(data)
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut();
        }
        this.setState({ loading: false });
      });
  }
  
fetchSingleTargetTransaction=(order_id)=>{
  const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig("getOrderDetails") + order_id, requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }console.log(data)
  if(data.success == false || data.total == 0){
    this.setState({singleTargetTransaction: [], pagination:[], isLoading:false});
  }else{
    this.setState({singleTargetTransaction: data, pagination:data, isLoading:false});
  } 
})
  .catch(error => {
      if (error === "Unauthorized") {
          this.props.timeOut()
      }
      this.setState({isLoading:false})
  });
}

  handleView = (id) => {
    this.setState({ isLoading: true });
    this.fetchSingleTargetTransaction(id);
    this.setState({ showView: true });
  };
  ongoingTab() {
    this.setState({ tab: true });
  }
  completeTab() {
    this.setState({ tab: false });
  }
  handleCloseView() {
    this.setState({showView:false});
  }
  render() {
    let obj = {
      array: [],
    };
    for (var l = 0; l < 31; l++) {
      obj.array[l] = l + 1;
    }
    let { theme } = this.props;
    const {my_products, tab, loading,showView,isLoading,singleTargetTransaction } = this.state;
    return (
      <div className='m-sm-30'>
        <div className='mb-sm-30'>
          <Breadcrumb routeSegments={[{ name: "My Products" }]} />
        </div>
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
                <Button
                  size='small'
                  color='secondary'
                  variant={tab ? "contained" : "outlined"}
                  style={{ color: tab ? "#fff" : "#000" }}
                  onClick={this.ongoingTab}
                >
                  Ongoing
                </Button>
                <Button
                  size='small'
                  color='secondary'
                  variant={tab ? "outlined" : "contained"}
                  style={{ color: tab ? "#000" : "#fff" }}
                  onClick={this.completeTab}
                >
                  Completed
                </Button>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {tab && (
                  <div
                    className='pb-5 pt-7 px-2 bg-default'
                    style={{
                      border: 1,
                      borderStyle: "solid",
                      borderColor: "#e74398",
                      borderRadius:8,
                    }}
                  >
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    {my_products.length != 0 ? (
                      my_products.map((data, index) => (
                        <MyProduct
                          key={index}
                          status={false}
                          withdrawStatus={data.withdraw_status}
                          amount={numberFormat(data.total)}
                          value={
                            (100 * data.target_balance) / data.targeted_amount
                          }
                          autoSave={(e) =>
                            this.handleTargetAutoSave(data.id, e)
                          }
                          status={data.order_status}
                          title={data.order_no}
                          stop={() => this.handleStopPlan(data.id)}
                          view={() => this.handleView(data.id)}
                          edit={() => this.handleEdit(data.id)}
                        />
                      ))
                    ) : (
                      <Typography variant='body1'>
                        No Ongoing Products
                      </Typography>
                    )}
                    </Grid>
                  </div>
                )}
                {!tab && (
                  <div
                    className='pb-5 pt-7 px-2 bg-default'
                    style={{
                      border: 1,
                      borderStyle: "solid",
                      borderColor: "#e74398",
                      borderBottomRightRadius: 20,
                      borderTopLeftRadius: 20,
                    }}
                  >
                    {my_products.length != 0 ? (
                      my_products.map((data, index) => (
                        <MyProduct
                          key={index}
                          // status={true}
                          // withdrawStatus={data.withdrawal_status}
                          // amount={numberFormat(data.targeted_amount)}
                          // value={
                          //   (100 * data.target_balance) / data.targeted_amount
                          // }
                          // title={data.target_name}
                          // stop={() => this.handleStopPlan(data.id)}
                          // view={() => this.handleView(data.id)}
                          // edit={() => this.handleEdit(data.id)}
                        />
                      ))
                    ) 
                    : (
                      <Typography variant='body1'>
                        No Completed Products
                      </Typography>
                    )}
                  </div>
                )}
              </Grid>
            </Grid>
          </>
        )}  
         {/* View Dialog start */}
         <Dialog
          open={showView}
          onClose={this.handleCloseView}
        >
            <AppBar color="primary" className="text-white" style={{position: "relative"}}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={this.handleCloseView}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1, color:"#fff"}}>
                  Order Details
                </Typography>
              </Toolbar>
            </AppBar>
            <Card className="px-6 pt-2 pb-4">
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {isLoading ?
                <Typography>Loading...</Typography>:
                <OrderDetails transactions={singleTargetTransaction} />
                }
              </Grid>
            </Grid>
          </Card>
        </Dialog>
        {/* View dialog end */}  
      </div>
    );
  }
}

// export default Regular;
const actionCreators = {
  timeOut: userActions.timeOut,
  createTargetSavings: userActions.createTargetSavings,
  addFundTargetSavings: userActions.addFundTargetSavings,
  withdrawTargetSavings: userActions.withdrawTargetSavings,
  editTargetSavings: userActions.editTargetSavings,
  exitTargetSavings: userActions.exitTargetSavings,
  activateTargetAutosave: userActions.activateTargetAutosave,
  deactivateTargetAutosave: userActions.deactivateTargetAutosave,
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles(
  {},
  { withTheme: true }
)(withRouter(connect(mapState, actionCreators)(Target)));
