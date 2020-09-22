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
import TargetTransactionCard from "../savings/components/TargetTransactionCards";
import TableCard from "../savings/components/TableCard";
import PayOption from "app/views/dashboard/shared/PayOption";
import Loading from "matx/components/MatxLoading/MatxLoading";

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
      data: {
        target_name: "",
        amount: 0,
        targeted_amount: "",
        frequency: "",
        transaction_day: "0",
        transaction_time: "",
        transaction_month: "0",
        end_date: "",
        start_date: "",
        payment_method: "wallet",
      },
      edit_data: {
        id: "",
        target_name: "",
        amount: "",
        targeted_amount: "",
        frequency: "",
        transaction_time: "",
        transaction_day: "",
        transaction_month: "",
        end_date: "",
        start_date: "",
        payment_method: "",
      },
      fund_data: {
        id: "",
        amount: 0,
        target_name: "",
        date_time: date,
        payment_method: "Wallet",
        paystack_id: "",
      },
      key: payID(),
      email: email,
      savings: [],
      details: [],
      accounts: [],
      singleTargetTransaction: [],
      balance: 0.0,
      tdetails: [],
      completed: [],
      loading: true,
      autoSave: false,
      pagination: [],
      err: "",
      auto_save: "",
      show: false,
      showSave: false,
      showWithdraw: false,
      showEdit: false,
      showView: false,
      tab: true,
      isLoading: true,
    };
    this.fetchSingleTargetTransaction = this.fetchSingleTargetTransaction.bind(
      this
    );
    this.fetchSingleTarget = this.fetchSingleTarget.bind(this);
    this.ongoingTab = this.ongoingTab.bind(this);
    this.completeTab = this.completeTab.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEdit = this.handleChangeEdit.bind(this);
    this.handleChangeFund = this.handleChangeFund.bind(this);
    this.handleAutoSave = this.handleAutoSave.bind(this);
    this.handleTargetAutoSave = this.handleTargetAutoSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleStopPlan = this.handleStopPlan.bind(this);
    this.handleView = this.handleView.bind(this);
    this.handleQuickSave = this.handleQuickSave.bind(this);
    this.handleCloseWithdraw = this.handleCloseWithdraw.bind(this);
    this.handleCloseView = this.handleCloseView.bind(this);
    this.handleCloseQuickSave = this.handleCloseQuickSave.bind(this);
    this.handleCloseEdit = this.handleCloseEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitFund = this.handleSubmitFund.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" },
    };
    fetch(getConfig("fetchAllTarget"), requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        if (data.success == false) {
          this.setState({
            tdetails: [],
            balance: 0,
            completed: [],
            accounts: [],
            loading: false,
          });
        } else {
          this.setState({
            tdetails: data[1],
            balance: data[0],
            completed: data[2],
            accounts: data[3],
            loading: false,
          });
        }
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut();
        }
        this.setState({ loading: false });
      });
  }

  callback = (response) => {
    const { fund_data } = this.state;
    if (fund_data.amount) {
      this.setState({
        fund_data: { ...fund_data, paystack_id: response.reference },
      });
    }
  };
  componentDidUpdate() {
    const { fund_data } = this.state;
    if (fund_data.paystack_id !== "") {
      this.props.addFundTargetSavings(fund_data);
      this.setState({ fund_data: { ...fund_data, paystack_id: "" } });
    }
  }
  fetchSingleTargetTransaction = (id) => {
    let user = JSON.parse(localStorage.getItem("user"));
    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" },
    };
    fetch(
      getConfig("getTargetTransaction") + id + `?token=` + user.token,
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        if (data.success == false || data.total == 0) {
          this.setState({
            singleTargetTransaction: [],
            pagination: [],
            isLoading: false,
          });
        } else {
          this.setState({
            singleTargetTransaction: data.data,
            pagination: data,
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut();
        }
        this.setState({ isLoading: false });
      });
  };

  fetchSingleTarget = (id) => {
    let user = JSON.parse(localStorage.getItem("user"));
    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" },
    };
    fetch(
      getConfig("targetDetails") + id + `?token=` + user.token,
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        if (data.success == false || data.total == 0) {
          this.setState({ edit_data: [], isLoading: false });
        } else {
          this.setState({ edit_data: data[0], isLoading: false });
        }
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut();
        }
        this.setState({ isLoading: false });
      });
  };
  getReference = () => {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };
  close = () => {
    console.log("Payment closed");
  };
  handleAutoSave = (event) => {
    this.setState({ show: true });
  };
  handleQuickSave = (event) => {
    this.setState({ showSave: true });
  };

  handleTargetAutoSave = (id, e) => {
    if (e.target.checked == false) {
      swal("Are you sure you want to Deactivate auto save?", {
        buttons: {
          cancel: "Cancel",

          confirm: {
            text: "Confirm",
            value: "catch",
          },
        },
      }).then((value) => {
        switch (value) {
          case "catch":
            this.props.deactivateTargetAutosave(id);
            swal("Loading...", {
              buttons: false,
            });
            break;

          default:
            swal("cancelled!");
        }
      });
    } else {
      swal("Are you sure you want to Activate auto save?", {
        buttons: {
          cancel: "Cancel",

          confirm: {
            text: "Confirm",
            value: "catch",
          },
        },
      }).then((value) => {
        switch (value) {
          case "catch":
            this.props.activateTargetAutosave(id);
            swal("Loading...", {
              buttons: false,
            });
            break;

          default:
            swal("cancelled!");
        }
      });
    }
  };

  handleStopPlan = (id) => {
    swal("Are you sure you want to stop this plan?", {
      buttons: {
        cancel: "Cancel",

        confirm: {
          text: "Confirm",
          value: "catch",
        },
      },
    }).then((value) => {
      switch (value) {
        case "catch":
          this.props.exitTargetSavings(id);
          swal("Loading...", {
            buttons: false,
          });
          break;

        default:
          swal("cancelled!");
      }
    });
  };
  handleView = (id) => {
    this.setState({ isLoading: true });
    this.fetchSingleTargetTransaction(id);
    this.setState({ showView: true });
  };
  handleEdit = (id) => {
    this.setState({ isLoading: true });
    this.fetchSingleTarget(id);
    const { edit_data } = this.state;
    this.setState({ showEdit: true, edit_data: { ...edit_data, id: id } });
  };

  // submit form handler
  handleSubmitEdit(event) {
    event.preventDefault();
    const { edit_data } = this.state;
    if (
      edit_data.amount &&
      edit_data.frequency &&
      edit_data.start_date &&
      edit_data.end_date &&
      edit_data.payment_method
    ) {
      this.props.editTargetSavings(edit_data);
    } else {
      swal(`${"All fields are required"}`);
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const { data } = this.state;
    if (
      data.amount &&
      data.frequency &&
      data.start_date &&
      data.payment_method
    ) {
      this.props.createTargetSavings(data);
    } else {
      swal(`${"All field are required "}`);
    }
  }
  handleSubmitFund(event) {
    event.preventDefault();
    const { fund_data } = this.state;
    if (fund_data.amount) {
      this.props.addFundTargetSavings(fund_data);
    } else {
      swal(`${"All fields are required"}`);
    }
  }

  // data change handler
  handleChange = (event) => {
    const { data } = this.state;
    const { name, value } = event.target;
    this.setState({ data: { ...data, [name]: value } });
  };
  handleChangeEdit = (event) => {
    const { edit_data } = this.state;
    const { name, value } = event.target;
    this.setState({ edit_data: { ...edit_data, [name]: value } });
  };
  handleChangeFund = (event) => {
    const { fund_data, tdetails } = this.state;
    const { name, value } = event.target;
    if (name == "target_name") {
      tdetails.forEach((data) => {
        if (data.target_name == value) {
          this.setState({
            fund_data: {
              ...fund_data,
              id: data.id,
              target_name: data.target_name,
            },
          });
        }
      });
    } else {
      this.setState({ fund_data: { ...fund_data, [name]: value } });
    }
  };

  // modal close handler
  handleClose() {
    this.setState({ show: false });
  }
  handleCloseEdit() {
    this.setState({ showEdit: false });
  }
  handleCloseView() {
    this.setState({ showView: false });
  }
  handleCloseQuickSave() {
    this.setState({ showSave: false });
  }
  handleCloseWithdraw() {
    this.setState({ showWithdraw: false });
  }
  ongoingTab() {
    this.setState({ tab: true });
  }
  completeTab() {
    this.setState({ tab: false });
  }
  render() {
    let obj = {
      array: [],
    };
    for (var l = 0; l < 31; l++) {
      obj.array[l] = l + 1;
    }
    let { theme } = this.props;
    const {
      balance,
      tdetails,
      loading,
      isLoading,
      tab,
      auto_save,
      edit_data,
      singleTargetTransaction,
      showEdit,
      showView,
      completed,
      email,
      bank_details,
      fund_data,
      autoSave,
      accounts,
      showSave,
      showWithdraw,
      data,
      show,
      savings,
    } = this.state;
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
                  variant={tab ? "contained" : "outlined"}
                  style={{ backgroundColor: tab ? "#e74398" : "" }}
                  onClick={this.ongoingTab}
                >
                  Ongoing
                </Button>
                <Button
                  size='small'
                  variant={tab ? "outlined" : "contained"}
                  style={{ backgroundColor: tab ? "" : "#e74398" }}
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
                      borderBottomRightRadius: 20,
                      borderTopLeftRadius: 20,
                    }}
                  >
                    {tdetails.length != 0 ? (
                      tdetails.map((data, index) => (
                        <TargetTransactionCard
                          key={index}
                          status={false}
                          withdrawStatus={data.withdraw_status}
                          amount={numberFormat(data.targeted_amount)}
                          value={
                            (100 * data.target_balance) / data.targeted_amount
                          }
                          autoSave={(e) =>
                            this.handleTargetAutoSave(data.id, e)
                          }
                          auto_status={data.auto_status}
                          title={data.target_name}
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
                    {completed.length != 0 ? (
                      completed.map((data, index) => (
                        <TargetTransactionCard
                          key={index}
                          status={true}
                          withdrawStatus={data.withdrawal_status}
                          amount={numberFormat(data.targeted_amount)}
                          value={
                            (100 * data.target_balance) / data.targeted_amount
                          }
                          title={data.target_name}
                          stop={() => this.handleStopPlan(data.id)}
                          view={() => this.handleView(data.id)}
                          edit={() => this.handleEdit(data.id)}
                        />
                      ))
                    ) : (
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
