import React from "react";
import { Breadcrumb, SimpleCard } from "matx";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Grid,
  Card,
  Button,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Dialog,
  MenuItem,
  TextField,
  Checkbox,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MarketCard from "./components/MarketCard";
import MarketCard2 from "./components/MarketCard2";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import { getConfig, setLastUrl } from "../../../config/config";
import { authHeader } from "../../../redux/logic";
import SingleInvestmentcard from "./components/SingleInvestmentCard";
import SingleInvestmentcardDetails from "./components/SingleInvestmentCardDetails";
import PayOption from "app/views/dashboard/shared/PayOption";
import Loading from "matx/components/MatxLoading/MatxLoading";
import PayCard from "app/views/dashboard/shared/PayCard";
import AddCardDialog from "app/views/dashboard/shared/AddCardDialog";
import swal from "sweetalert";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Halal extends Component {
  constructor(props) {
    setLastUrl();
    super(props);
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let date_time = currentDate.getFullYear() + "-" + month + "-" + day;
    this.state = {
      invest_data: {
        halai_investments_id: "",
        slots: 0,
        total: 0,
        date_time: date_time,
        paystack_id: "",
        payment_method: "Wallet",
        card_id: "0",
        save_card: true,
      },
      add_card: {
        amount: 100,
        date_time: date_time,
        payment_method: "Debit Account",
        save_card: true,
        paystack_id: "",
        card_id: "",
      },
      current_value: "",
      categories: [],
      cards: [],
      tab: true,
      mTab: true,
      showView: false,
      showInvest: false,
      isLoading: true,
      loading: true,
      news: [],
      singleNews: [],
      singleInvestment: [],
      category: [],
      pagination: [],
      investment: [],
      current_index: 0,
      showSaveCard: false,
    };
    this.handleSaveCard = this.handleSaveCard.bind(this);
    this.handleCloseSaveCard = this.handleCloseSaveCard.bind(this);
    this.ongoingTab = this.ongoingTab.bind(this);
    this.completeTab = this.completeTab.bind(this);
    this.newsTab = this.newsTab.bind(this);
    this.investTab = this.investTab.bind(this);
    this.handleShowView = this.handleShowView.bind(this);
    this.handleShowInvest = this.handleShowInvest.bind(this);
    this.handleCloseView = this.handleCloseView.bind(this);
    this.handleCloseInvest = this.handleCloseInvest.bind(this);
    this.fetchSingleMarket = this.fetchSingleMarket.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.callback = this.callback.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callback = (response) => {
    const { invest_data, add_card } = this.state;
    if (invest_data.total && invest_data.payment_method) {
      this.setState({
        invest_data: { ...invest_data, paystack_id: response.reference },
      });
      swal("Loading...", {
        buttons: false,
      });
    } else {
      this.setState({
        add_card: { ...add_card, paystack_id: response.reference },
        showSaveCard: false,
      });
      swal("Saving Card...", {
        buttons: false,
      });
    }
  };
  componentDidUpdate() {
    const { invest_data, add_card } = this.state;
    if (invest_data.paystack_id !== "") {
      this.props.addHalaiInvestors(invest_data);
      this.setState({ invest_data: { ...invest_data, paystack_id: "" } });
    }
    if (add_card.paystack_id !== "") {
      this.props.saveWallet(add_card);
      this.setState({ add_card: { ...add_card, paystack_id: "" } });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { invest_data } = this.state;
    if (invest_data.total && invest_data.payment_method) {
      this.props.addHalaiInvestors(invest_data);
    }
  }

  handleSaveCard = (event) => {
    this.setState({ showSaveCard: true });
  };

  handleCloseSaveCard() {
    this.setState({ showSaveCard: false });
  }

  handleChange(event) {
    const { name, value, checked } = event.target;
    const { invest_data, current_value } = this.state;
    if (name == "slots") {
      this.setState({
        invest_data: {
          ...invest_data,
          [name]: value,
          total: value * current_value,
        },
      });
    } else if (name == "save_card") {
      this.setState({ invest_data: { ...invest_data, [name]: checked } });
    } else {
      this.setState({ invest_data: { ...invest_data, [name]: value } });
    }
  }
  fetchSingleMarket(id) {
    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" },
    };
    fetch(getConfig("getInvestmentNews") + id, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        if (data.success == false) {
          this.setState({ singleNews: [] });
        } else {
          this.setState({ singleNews: data });
        }
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut();
        }
      });
    fetch(getConfig("getSingleHalai") + id, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        if (data.success == false) {
          this.setState({ singleInvestment: [], isLoading: false });
        } else {
          this.setState({ singleInvestment: data, isLoading: false });
        }
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut();
        }
      });
  }
  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" },
    };
    fetch(getConfig("getAllDebitCards"), requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        if (data.success == false || data.length == 0) {
          this.setState({ cards: [] });
        } else {
          this.setState({ cards: data });
        }
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut();
        }
      });
    fetch(getConfig("getHalaiNews"), requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          this.setState({ loading: false });
          return Promise.reject(error);
        }
        if (data.success == false) {
          this.setState({ news: [], category: [] });
        } else {
          this.setState({ news: data, category: data.products.data });
        }
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut();
        }
        this.setState({ loading: false });
        console.error("There was an error!", error);
      });
    fetch(getConfig("getHalaiCat"), requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        if (data.success == false) {
          this.setState({ categories: [] });
        } else {
          this.setState({ categories: data });
        }
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut();
        }
      });
    fetch(getConfig("showMyHalalInvestment"), requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        if (data.success == false) {
          this.setState({ loading: false, investment: [], pagination: [] });
        } else {
          this.setState({ loading: false, investment: data, pagination: data });
        }
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut();
        }
      });
  }
  handleCloseView() {
    this.setState({ showView: false });
  }
  handleShowView = (id, current_value) => {
    const { invest_data } = this.state;
    this.setState({ isLoading: true });
    this.fetchSingleMarket(id);
    this.setState({
      showView: true,
      invest_data: {
        ...invest_data,
        halai_investments_id: id,
        slots: 0,
        total: 0,
      },
      current_value: current_value,
    });
  };
  handleCloseInvest() {
    this.setState({ showInvest: false });
  }
  handleShowInvest = (id) => {
    this.setState({ isLoading: true });
    this.fetchSingleMarket(id);
    this.setState({ showInvest: true });
  };
  // tab handler
  ongoingTab() {
    this.setState({ tab: true });
  }
  completeTab() {
    this.setState({ tab: false });
  }
  newsTab() {
    this.setState({ mTab: true });
  }
  investTab() {
    this.setState({ mTab: false });
  }
  tabbed = (id) => {
    this.setState({
      category:
        id == 0
          ? this.state.news
          : this.state.news.filter((ne) => ne.halai_categories_id == id),
      current_index: id,
    });
  };
  render() {
    const { theme } = this.props;
    const {
      tab,
      mTab,
      invest_data,
      categories,
      cards,
      add_card,
      showSaveCard,
      category,
      loading,
      singleInvestment,
      singleNews,
      isLoading,
      current_index,
      investment,
      showView,
      showInvest,
    } = this.state;
    return (
      <div className='m-sm-10'>
        <Grid container>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Button
              size='large'
              variant={tab ? "contained" : "outlined"}
              color='secondary'
              onClick={this.ongoingTab}
            >
              Explore
            </Button>
            <Button
              size='large'
              variant={tab ? "outlined" : "contained"}
              color='secondary'
              onClick={this.completeTab}
            >
              My Investment
            </Button>
          </Grid>
        </Grid>
        <div className='py-3' />
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
        ) : tab ? (
          <Grid container spacing={3} justify='flex-start'>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Button
                size='small'
                variant={current_index == 0 ? "contained" : "outlined"}
                color='secondary'
                onClick={() => this.tabbed(0)}
              >
                All
              </Button>

              {categories.map((cat) => (
                <Button
                  size='small'
                  variant={current_index == cat.id ? "contained" : "outlined"}
                  color='secondary'
                  onClick={() => this.tabbed(cat.id)}
                >
                  {cat.category_name}
                </Button>
              ))}
            </Grid>

            {category.map((ne) => (
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <MarketCard
                  data={ne}
                  status={true}
                  invest={() => this.handleShowInvest(ne.id)}
                  view={() => this.handleShowView(ne.id, ne.current_values)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {investment.map((ne) => (
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <MarketCard2
                  data={ne}
                  view={() => this.handleShowInvest(ne.halai_investments_id)}
                />
              </Grid>
            ))}
          </Grid>
        )}
        {/* View Dialog start */}
        <Dialog open={showView} scroll='body' onClose={this.handleCloseView}>
          <AppBar color='primary' style={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge='start'
                color='inherit'
                onClick={this.handleCloseView}
                aria-label='Close'
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant='h6'
                style={{ marginLeft: theme.spacing(2), flex: 1, color: "#fff" }}
              >
                Investment Details
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className='px-6 pt-2 pb-4'>
            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div
                      className='pb-5 pt-5 px-2 bg-default'
                      style={{
                        border: 1,
                        borderStyle: "solid",
                        borderColor: "#04956a",
                        borderBottomRightRadius: 20,
                        borderTopLeftRadius: 20,
                      }}
                    >
                      <SingleInvestmentcardDetails
                        investment={singleInvestment}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item lg={8} md={8} sm={12} xs={12}>
                    <Button
                      size='small'
                      variant={mTab ? "contained" : "outlined"}
                      color='secondary'
                      onClick={this.newsTab}
                    >
                      News
                    </Button>
                    <Button
                      size='small'
                      variant={mTab ? "outlined" : "contained"}
                      color='secondary'
                      onClick={this.investTab}
                    >
                      Invest
                    </Button>
                  </Grid>
                </Grid>
                <div className='py-3' />
                {mTab ? (
                  <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <div
                        className='pb-5 pt-5 px-2 bg-default'
                        style={{
                          border: 1,
                          borderStyle: "solid",
                          borderColor: "#04956a",
                          borderBottomRightRadius: 20,
                          borderTopLeftRadius: 20,
                        }}
                      >
                        <SingleInvestmentcard news={singleNews} />
                      </div>
                    </Grid>
                  </Grid>
                ) : (
                  <ValidatorForm
                    ref='form'
                    onSubmit={this.handleSubmit}
                    onError={(errors) => null}
                  >
                    <Card className='px-6 pt-2 pb-4'>
                      <Grid container spacing={2}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <TextValidator
                            className='mb-4 w-full'
                            label='Slots'
                            onChange={this.handleChange}
                            type='number'
                            name='slots'
                            value={invest_data.slots}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                          />
                          <TextValidator
                            className='mb-4 w-full'
                            label=' Total Amount'
                            onChange={this.handleChange}
                            readOnly
                            type='number'
                            name='total'
                            value={invest_data.total}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                          />
                          <TextField
                            className='mb-4 w-full'
                            select
                            label='Select Payment Method'
                            name='payment_method'
                            value={invest_data.payment_method}
                            onChange={this.handleChange}
                            helperText='Please select Payment Method'
                          >
                            <MenuItem value={"Debit Card"}>
                              {" "}
                              Debit Card
                            </MenuItem>
                            <MenuItem value={"Wallet"}> Wallet </MenuItem>
                          </TextField>
                          {this.props.savings && (
                            <img
                              img
                              alt=''
                              src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
                            />
                          )}
                          {(invest_data.payment_method == "Wallet" ||
                            (invest_data.card_id != "0" &&
                              invest_data.card_id != "")) && (
                            <Button
                              className='uppercase'
                              color='secondary'
                              type='submit'
                              size='large'
                              variant='contained'
                              style={{ color: "#fff" }}
                            >
                              Buy Slot
                            </Button>
                          )}
                        </Grid>
                        {invest_data.payment_method == "Debit Card" && (
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Typography>Choose Card</Typography>
                            <PayCard
                              cards={cards}
                              value={invest_data.card_id}
                              open={(e) =>
                                this.setState({
                                  invest_data: { ...invest_data, card_id: "" },
                                })
                              }
                              handleChange={this.handleChange}
                            />
                          </Grid>
                        )}
                        {invest_data.card_id == "" &&
                          invest_data.payment_method == "Debit Card" && (
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <Checkbox
                                name='save_card'
                                checked={invest_data.save_card}
                                onChange={this.handleChange}
                                inputProps={{
                                  "aria-label": "primary checkbox",
                                }}
                              />
                              <Typography variant='caption'>
                                Would you like to save your card
                              </Typography>
                            </Grid>
                          )}
                        {invest_data.card_id == "" &&
                          invest_data.payment_method == "Debit Card" && (
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <PayOption
                                callback={this.callback}
                                amount={invest_data.total}
                              />
                            </Grid>
                          )}
                      </Grid>
                    </Card>
                  </ValidatorForm>
                )}
              </>
            )}
          </Card>
        </Dialog>
        {/* View dialog end */}

        {/* Invest Dialog start */}
        <Dialog
          scroll='body'
          open={showInvest}
          onClose={this.handleCloseInvest}
        >
          <AppBar color='secondary' style={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge='start'
                color='inherit'
                onClick={this.handleCloseInvest}
                aria-label='Close'
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant='h6'
                style={{ marginLeft: theme.spacing(2), flex: 1, color: "#fff" }}
              >
                Investment Details
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className='px-6 pt-2 pb-4'>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {isLoading ? (
                  <Typography>Loading...</Typography>
                ) : (
                  <div
                    className='pb-5 pt-5 px-2 bg-default'
                    style={{
                      border: 1,
                      borderStyle: "solid",
                      borderColor: "#04956a",
                      borderBottomRightRadius: 20,
                      borderTopLeftRadius: 20,
                    }}
                  >
                    <SingleInvestmentcardDetails
                      investment={singleInvestment}
                    />
                    <SingleInvestmentcard
                      news={singleNews}
                      investment={singleInvestment}
                    />
                  </div>
                )}
              </Grid>
            </Grid>
          </Card>
        </Dialog>
        {/* Invest dialog end */}

        {/* <AddCardDialog callback={this.callback} showSave={showSaveCard} handleClose={this.handleCloseSaveCard} add_card={add_card} /> */}
      </div>
    );
  }
}

const actionCreators = {
  timeOut: userActions.timeOut,
  saveWallet: userActions.saveWallet,
  addHalaiInvestors: userActions.addHalaiInvestors,
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles(
  {},
  { withTheme: true }
)(withRouter(connect(mapState, actionCreators)(Halal)));
