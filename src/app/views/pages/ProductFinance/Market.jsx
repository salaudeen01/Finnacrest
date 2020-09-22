import React from 'react';
import { Breadcrumb, SimpleCard } from "matx";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Grid, Card, Button, Divider, Typography, IconButton, Toolbar, AppBar, Dialog, MenuItem, TextField} from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import MarketCard from './components/MarketCard';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import { Component } from 'react';
import {getConfig,setLastUrl} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import SingleInvestmentcard from './components/SingleInvestmentCard';
import SingleInvestmentcardDetails from './components/SingleInvestmentCardDetails';
import PayOption from 'app/views/dashboard/shared/PayOption';
import Loading from "matx/components/MatxLoading/MatxLoading";
import MarketCard2 from './components/MarketCard2';


 class Market extends Component {
  constructor(props){
    super(props)
    setLastUrl()
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let date_time = currentDate.getFullYear() + "-" + month + "-" + day;
    this.state={
      invest_data: {
        investments_id: "",
        slots: 0,
        total: 0,
        date_time: date_time,
        payment_method: "Wallet",
        paystack_id:"",
      },
      current_value:"",
      categories:[],
      tab:true,
      mTab:true,
      showView:false,
      showInvest:false,
      isLoading:true,
      loading:true,
      news:[],
      singleNews:[],
      singleInvestment:[],
      category:[],
      pagination:[],
      investment:[],
      current_index:0
    }
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
  const { invest_data } = this.state;
  if (invest_data.total && invest_data.payment_method) {
    this.setState({invest_data:{...invest_data, paystack_id: response.reference }})
    }
}
componentDidUpdate(){
  const { invest_data } = this.state;
  if (invest_data.paystack_id !== "") {
    this.props.addMarketPlace(invest_data);
    this.setState({invest_data:{...invest_data, paystack_id:""}})
  }
}
handleSubmit(event) {
  event.preventDefault();
  const { invest_data } = this.state;
  if (invest_data.total && invest_data.payment_method) {
    this.props.addMarketPlace(invest_data);
  }
}
fetchSingleMarket(id){
  const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  let user = JSON.parse(localStorage.getItem('user'));
  fetch(getConfig('getMarketNews')+ id +`?token=`+user.token, requestOptions)
        .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        if(data.success == false){
          this.setState({singleNews: []});
        }else{
          this.setState({singleNews: data});
        }
    })
    .catch(error => {
       if (error === "Unauthorized") {
        this.props.timeOut()
       }
    });
    fetch(getConfig('getSingleInvestment')+ id +`?token=`+user.token, requestOptions)
        .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        if(data.success == false){
          this.setState({singleInvestment: [], isLoading: false})
        }else{
          this.setState({singleInvestment: data, isLoading: false})
        }
    })
    .catch(error => {
       if (error === "Unauthorized") {
        this.props.timeOut()
       }
    });
}
handleChange(event) {
  const { name, value } = event.target;
  const { invest_data, current_value } = this.state;
  if(name == "slots"){
    this.setState({
      invest_data: { ...invest_data, [name]: value, total:value*current_value }
    })
  }else{
    this.setState({
      invest_data: { ...invest_data, [name]: value},
    })
  }
}
componentDidMount() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
  let user = JSON.parse(localStorage.getItem('user'));
  fetch(getConfig('getInvestments'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        this.setState({loading: false });
        return Promise.reject(error);
    }
    if(data.success == false){
      this.setState({news: [], category: []})
    }else{
      this.setState({news: data, category: data})
    }
})
.catch(error => {
   if (error === "Unauthorized") {
    this.props.timeOut()
   }
   this.setState({loading:false});
    console.error('There was an error!', error );
});
fetch(getConfig("getInvestmentCat"), requestOptions)
  .then(async (response) => {
    const data = await response.json();
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    if(data.success == false){
      this.setState({ categories: []});
    }else{
      this.setState({ categories: data});
    }
    
  })
  .catch((error) => {
    if (error === "Unauthorized") {
      this.props.timeOut()
    }
  });
  fetch(getConfig("showMyMarketInvestment"), requestOptions)
  .then(async (response) => {
    const data = await response.json();
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    if(data.success == false){
      this.setState({ loading: false, investment: [], pagination:[]});
    }else{
      this.setState({ loading: false, investment: data, pagination:data});
    }
  })
  .catch((error) => {
    if (error === "Unauthorized") {
      this.props.timeOut()
    }
  });
}
handleCloseView() {
  this.setState({showView:false});
}
handleShowView = (id, current_value) => {
  const {invest_data} = this.state
  this.setState({isLoading:true})
  this.fetchSingleMarket(id)
  this.setState({showView: true, invest_data:{...invest_data, investments_id:id, slots: 0, total:0}, current_value:current_value});
}
handleCloseInvest() {
  this.setState({showInvest:false});
}
handleShowInvest = (id) => {
  this.setState({isLoading:true})
  this.fetchSingleMarket(id)
  this.setState({showInvest: true});
}
  // tab handler
ongoingTab() {
  this.setState({tab:true});
}
completeTab(){
  this.setState({tab:false});
}
newsTab() {
  this.setState({mTab:true});
}
investTab(){
  this.setState({mTab:false});
}
tabbed = (id) => {
  this.setState({
    category: id == 0? this.state.news : this.state.news.filter((ne) =>ne.market_categories_id == id),
    current_index: id
  })
};
  render(){
    const {theme} =this.props
    const {isLoading, tab, mTab, categories, category, loading, current_index, investment, singleInvestment, singleNews, showView, showInvest, invest_data} = this.state
    return (
      <div className="m-sm-10">
        <Grid container>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Button size="large"
                variant={tab? "contained" : "outlined"}
                color="secondary"
                onClick={this.ongoingTab}
                >Explore</Button>
            <Button 
              size="large"
              variant={tab? "outlined" : "contained"}
              color="secondary"
              onClick={this.completeTab}
              >My Market</Button>
          </Grid>
        </Grid>
        <div className="py-3" />
        {loading?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        tab? 
        <Grid container spacing={3} justify="flex-start">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Button size="small"
                variant={current_index == 0 ?"contained":"outlined"}
                color="secondary"
                onClick={() => this.tabbed(0)}>
                  All
                </Button>
                {categories.map((cat) => (
                  <Button size="small"
                  variant={current_index == cat.id ?"contained":"outlined"}
                  color="secondary"
                  onClick={() => this.tabbed(cat.id)}>
                    {cat.category_name}
                </Button>
              ))}
          </Grid>
          {category.map((ne) => (
            <Grid item lg={3} md={3} sm={12} xs={12}>
                <MarketCard
                data={ne}
                status={true}
                invest={()=>this.handleShowInvest(ne.id)} 
                view={()=>this.handleShowView(ne.id, ne.current_values)}/>
            </Grid>
          ))}
        </Grid>:
        <Grid container spacing={3}>
          {investment.map((ne) => (
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <MarketCard2
              data={ne}
              view={()=>this.handleShowInvest(ne.investments_id)}/>
            </Grid>
          ))} 
        </Grid>
        }
        {/* View Dialog start */}
        <Dialog
          open={showView}
          scroll="body"
          onClose={this.handleCloseView}>
            <AppBar color="secondary" style={{position: "relative"}}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={this.handleCloseView}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" style={{marginLeft: theme.spacing(2), flex: 1, color:"#fff"}}>
                  Investment Details
                </Typography>
              </Toolbar>
            </AppBar>
            <Card className="px-6 pt-2 pb-4">
              {isLoading ?
              <Typography>Loading...</Typography>:
              <>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="pb-5 pt-5 px-2 bg-default" style={{border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
                    <SingleInvestmentcardDetails investment={singleInvestment} />
                  </div>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                  <Button size="small"
                      variant={mTab? "contained" : "outlined"}
                      color="secondary"
                      onClick={this.newsTab}
                      >News</Button>
                  <Button 
                    size="small"
                    variant={mTab? "outlined" : "contained"}
                    color="secondary"
                    onClick={this.investTab}
                    >Invest</Button>
                </Grid>
              </Grid>
              <div className="py-3" />
              {mTab?
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="pb-5 pt-5 px-2 bg-default" style={{border:1, borderStyle:"solid",     borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
                    <SingleInvestmentcard news={singleNews} />
                  </div>
                </Grid>
              </Grid>:
              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => null}>
                <Card className="px-6 pt-2 pb-4">
                    <Grid container spacing={2}>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                          <TextValidator
                          className="mb-4 w-full"
                          label="Slots"
                          onChange={this.handleChange}
                          type="number"
                          name="slots"
                          value={invest_data.slots}
                          validators={[
                            "required"
                          ]}
                          errorMessages={["this field is required"]}
                        />
                        <TextValidator
                          className="mb-4 w-full"
                          label=" Total Amount"
                          type="number"
                          name="total"
                          value={invest_data.total}
                          validators={[
                            "required"
                          ]}
                          errorMessages={["this field is required"]}
                        />
                        <TextField
                        className="mb-4 w-full"
                          select
                          label="Select Payment Method"
                          name="payment_method"
                          value={invest_data.payment_method}
                          onChange={this.handleChange}
                          helperText="Please select Payment Method"
                        >
                            <MenuItem value={""}>Select payment Method</MenuItem>
                            <MenuItem value={"Bank Account"}> Bank Account</MenuItem>
                            <MenuItem value={"Wallet"}> Wallet </MenuItem>
                        </TextField>
                        {this.props.savings &&
                        <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        {invest_data.payment_method == "Wallet" && 
                        <Button className="uppercase"
                          color="secondary"
                          type="submit"
                          size="large"
                          variant="contained"
                          style={{ color:"#fff"}}>
                            Buy Slot
                        </Button>}
                        {invest_data.payment_method == "Bank Account" && 
                        <PayOption amount={invest_data.total} callback={this.callback}/>}
                      </Grid>
                    </Grid>
                  </Card>
              </ValidatorForm>}
              </>}
            </Card>
        </Dialog>
        {/* View dialog end */}
        
        {/* Invest Dialog start */}
        <Dialog
          scroll="body"
          open={showInvest}
          onClose={this.handleCloseInvest}>
            <AppBar color="secondary" style={{position: "relative"}}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={this.handleCloseInvest}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" style={{marginLeft: theme.spacing(2), flex: 1, color:"#fff"}}>
                  Investment Details
                </Typography>
              </Toolbar>
            </AppBar>
            <Card className="px-6 pt-2 pb-4">
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {isLoading ?
                  <Typography>Loading...</Typography>:
                  <div className="pb-5 pt-5 px-2 bg-default" style={{border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
                    <SingleInvestmentcardDetails investment={singleInvestment} />
                    <SingleInvestmentcard news={singleNews} />
                  </div>
                  }
                </Grid>
            </Grid>
            </Card>
        </Dialog>
        {/* Invest dialog end */}
      </div>
    );
  }
  }

const actionCreators = {
  timeOut: userActions.timeOut,
  addMarketPlace: userActions.addMarketPlace,
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Market))
);