import React from 'react';
import { Breadcrumb, SimpleCard } from "matx";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Grid, Card, Button, Typography, IconButton, Toolbar, AppBar, Dialog,CardMedia,
  CardActionArea, MenuItem, TextField, CardActions, Slide, Fab, CardContent } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import MarketCard from './components/MarketCard';
import MarketCard2 from './components/MarketCard2';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import { Component } from 'react';
import {getConfig, setLastUrl} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import SingleInvestmentcard from './components/SingleInvestmentCard';
import SingleInvestmentcardDetails from './components/SingleInvestmentCardDetails';
import PayOption from 'app/views/dashboard/shared/PayOption';
import Loading from "matx/components/MatxLoading/MatxLoading";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import Paginate from '../transactions/paginate';
import SearchInput from '../settings/components/SearchInput';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

 class Halal extends Component {
  constructor(props){
    setLastUrl()
    super(props)
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let date_time = currentDate.getFullYear() + "-" + month + "-" + day;
    this.uploadedImage = React.createRef();
    this.imageUploader = React.createRef();
    this.state={
      invest_data: {
        halai_investments_id: "",
        slots: 0,
        total: 0,
        date_time: date_time,
        payment_method: "Wallet",
        paystack_id:"",
      },
      request_data:{
        product_name:"",
        short_description:"",
        quantity:"",
        image: null
      },
      search_term:"",
      current_value:"",
      categories:[],
      tab:true,
      mTab:true,
      showView:false,
      showInvest:false,
      showSave:false,
      isLoading:true,
      loading:true,
      pagination:[],     
      singleNews:[],
      singleInvestment:[],
      category:[],
      news:[],
      investment:[],
      current_index:0,
      avatar: '/assets/images/dummy.jpg',
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
    this.handleChangeRequest = this.handleChangeRequest.bind(this);
    this.callback = this.callback.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.handleCloseRequest = this.handleCloseRequest.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleProfileImage = this.handleProfileImage.bind(this);
    this.handleChangeRequest = this.handleChangeRequest.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmitRequest = this.handleSubmitRequest.bind(this);
    this.fetch_next_page = this.fetch_next_page.bind(this);
    this.fetch_page = this.fetch_page.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.fetch_prev_page = this.fetch_prev_page.bind(this);
    this.fetchOrders = this.fetchOrders.bind(this);
    this.fetchOrders();
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
    this.props.addHalaiInvestors(invest_data);
    this.setState({invest_data:{...invest_data, paystack_id:""}})
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
handleSubmitRequest(event) {
  event.preventDefault();

  const { request_data } = this.state;
    
    if (request_data.product_name && request_data.short_description && request_data.quantity && request_data.image) {
     
      
      const fd = new FormData();
        fd.append("product_name", request_data.product_name); 
        fd.append("short_description", request_data.short_description);
        fd.append("quantity", request_data.quantity);
        fd.append("image", request_data.image);
        console.log(request_data.image);
      this.props.userUploadRequested(fd);
    }
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
handleChangeRequest = event => {
  const {request_data} = this.state
  this.setState({ request_data:{...request_data, [event.target.name]: event.target.value} });
}
handleProfileImage(e){
  const [file, name] = e.target.files;
  const {request_data} = this.state
  if(file){
      const reader = new FileReader();
      const { current } = this.uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file); 
      this.setState({request_data:{...request_data, image: e.target.files[0]}})
  }  
}
handleClick(e) {
  this.imageUploader.current.click();
}
fetchSingleMarket(id){
  const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  let user = JSON.parse(localStorage.getItem('user'));
  fetch(getConfig('getInvestmentNews')+ id +`?token=`+user.token, requestOptions)
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
    fetch(getConfig('getSingleHalai')+ id +`?token=`+user.token, requestOptions)
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
componentDidMount() {
  const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
fetch(getConfig("getHalaiCat"), requestOptions)
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
  fetch(getConfig("showMyHalalInvestment"), requestOptions)
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
  fetch(getConfig("userCartCount"), requestOptions)
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      if(data.success == false){
        this.setState({ count: []});
      }else{
        this.setState({ count: data});
      }    
    })
    .catch((error) => {
      if (error === "Unauthorized") {
        this.props.timeOut()
      }
    });
}

fetchOrders = () =>{
  const {search_term} = this.state
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body:JSON.stringify({search_term})
  };
  fetch(getConfig('getHalaiNews'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        this.setState({loading:false });
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    if(data.success == false){
      this.setState({pagination: [], category: [], news: [], loading:false})
    }else{
      this.setState({pagination: data.products, news:data.products.data, category: data.products.data, loading:false})
    }
  })
  .catch(error => {
    if (error === "Unauthorized") {
      this.props.timeOut()
    }
    this.setState({loading:false });
    console.error('There was an error!', error);
  });
}

fetch_next_page = ()=>{
  const {pagination} = this.state
  this.setState({ loading: true});
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  fetch(pagination.next_page_url, requestOptions).then(async (response) =>{
    const data =await response.json();
    this.setState({ loading: false, pagination: data.products, category: data.products.data });
  }).catch(error=>{
    if (error === "Unauthorized") {
      this.props.logout();
    }
  })
}

fetch_prev_page = ()=>{
  const {pagination} = this.state
  this.setState({ loading: true});
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  fetch(pagination.prev_page_url, requestOptions).then(async (response) =>{
    const data =await response.json();
    this.setState({ loading: false, pagination: data.products, category: data.products.data });
  }).catch(error=>{
    if (error === "Unauthorized") {
      this.props.logout();
    }
  })
}

fetch_page = (index)=>{
  const {pagination} = this.state
  this.setState({ loading: true});
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  fetch(pagination.path+"?page="+index, requestOptions).then(async (response) =>{
    const data =await response.json();
    this.setState({ loading: false, pagination: data.products, category: data.products.data });
  }).catch(error=>{
    if (error === "Unauthorized") {
      this.props.logout();
    }
  })
}

searchChange(event) {
  const { value } = event.target;
  this.setState({  search_term: value, loading:true},()=>{ this.fetchOrders() });
  
}

handleCloseView() {
  this.setState({showView:false});
}
handleShowView = (id, current_value) => {
  const {invest_data} = this.state
  this.setState({isLoading:true})
  this.fetchSingleMarket(id)
  this.setState({showView: true, invest_data:{...invest_data, halai_investments_id:id, slots: 0, total:0}, current_value:current_value});
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
handleRequest = event => {
  this.setState({showSave: true});
}
handleCloseRequest() {
  this.setState({showSave:false});
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
    category: id == 0? this.state.news : this.state.news.filter((ne) =>ne.category_id == id),
    current_index: id   
  }) 
};
  render(){
    const {theme} =this.props
    const {tab,mTab, invest_data, search_term, request_data, pagination, categories, count, category, loading, singleInvestment, singleNews, isLoading, current_index, investment, showView, showSave, showInvest} = this.state
    return (
      <div className="m-sm-30">
        <AppBar color="default" position="static">
        <Toolbar>
          <Grid container spacing={0}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
            <div className="">
              <Breadcrumb
                routeSegments={[
                  { name: "Product Finance" }
                ]}
              />
            </div>
            </Grid>
            <Grid item lg={5} md={5} sm={5} xs={10}>
              <SearchInput
                value={search_term}
                onChange={this.searchChange}
                style={{marginRight: theme.spacing(2)}}
                placeholder="Search Product"
              />
            </Grid>
            {/* <div style={{height: '42px' ,alignItems: 'center', marginTop: theme.spacing(1)}}>
              <TextField
                style={{width:"30%"}}
                label="search username"
                margin="dense"
                variant="outlined"
                value={search}
                onChange={this.searchChange}
                style={{marginRight: theme.spacing(1)}}
                placeholder="Search"
              />
            </div> */}
            
            <Grid item lg={1} md={1} sm={1} xs={2}> 
            <Link to="/detail/cart">
            <Button style={{float:'right',color:'black'}}>
                   <ShoppingCartIcon/> ({count})
          </Button>
          </Link>
          </Grid>
          </Grid>
          
        </Toolbar>
      </AppBar>   
        <div className="py-3" />
        {loading?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        tab? 
        <Grid container spacing={3} justify="flex-center" className="px-4">
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
            <Grid item lg={3} md={3} sm={4} xs={12}>
            <Link to={`/details/${ne.id}`}>            
            <MarketCard 
                data={ne}
                status={true}
                invest={()=>this.handleShowInvest(ne.id)} 
                view={()=>this.handleShowView(ne.id, ne.current_values)}                
                />
              </Link>              
            </Grid>
          ))}
           <Grid item lg={3} md={3} sm={4} xs={12}>            
            <Card style={{maxWidth:250, height:330, }} onClick={this.handleRequest}>
              <CardActionArea style={{margin:'auto', paddingLeft:"18%", paddingTop:"38%"}}>              
                <Fab color="primary" aria-label="add" onClick={this.handleRequest} 
                style={{alignItems:'center',color:'white', padding:"40%"}}>
                  <AddIcon style={{fontSize:40}}/>
                </Fab>
                <CardContent>
                  <Typography className='text-bold' size="24"><b>Request Product</b></Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            </Grid>
        </Grid>:
        <Grid container spacing={3}>
          {investment.map((ne) => (
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <MarketCard2
              data={ne}
              view={()=>this.handleShowInvest(ne.halai_investments_id)} />
            </Grid>
          ))} 
        </Grid>
        
       }           
        <div className="classes.pagination mt-4">
        {/* <Typography variant="caption">1-6 of 20</Typography> */}
        <Paginate 
              pagination={pagination}
             fetch_page={this.fetch_page}
              fetch_next_page={this.fetch_next_page}
              fetch_prev_page={this.fetch_prev_page} 
               loading={loading}
           />
      </div>
        {/* View Dialog start */}

        <Dialog 
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          open={showView}
          scroll="body"
          onClose={this.handleCloseView}>
            <AppBar color="primary" style={{position: "relative"}}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={this.handleCloseView}
                  aria-label="Close"
                >
                  <CloseIcon style={{color:'#fff'}}/>
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
                  <div className="pb-5 pt-5 px-2 bg-default" style={{border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
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
                          onChange={this.handleChange}
                          readOnly
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
                        <PayOption amount={invest_data.total} callback={this.callback} type={'09'} targetId={'00'} />}
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
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          scroll="body"
          open={showInvest}
          onClose={this.handleCloseInvest}>
            <AppBar color="primary" style={{position: "relative"}}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={this.handleCloseInvest}
                  aria-label="Close"
                >
                  <CloseIcon style={{color:'#fff'}}/>
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
                    <SingleInvestmentcard news={singleNews} investment={singleInvestment} />
                  </div>
                  }
                </Grid>
            </Grid>
            </Card>
        </Dialog>
        
        {/* Invest dialog end */}

        {/* Quick Upload product */}
        <Dialog 
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          open={showSave}
          onClose={this.handleCloseRequest}
          scroll="body">
          <AppBar style={{position: "relative", backgroundColor:'#224459'}}>
            <Toolbar>
              <IconButton
                edge="start"
                style={{color:'#fff'}}
                onClick={this.handleCloseRequest}
                aria-label="Close"
              >
                <CloseIcon/>
              </IconButton>
              <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1, color:"#fff"}}>
                Upload Request Item
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4">
            <ValidatorForm
              ref="form"
              // onSubmit={this.handleSubmitFund}
              onError={errors => null}>
              <Grid container spacing={3}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextValidator
                    className="mb-4 w-full"
                    label="Product Name"
                    onChange={this.handleChangeRequest}
                    type="text"
                    name="product_name"
                    value={request_data.product_name}
                    validators={[
                      "required"
                    ]}
                    inputProps={{
                      maxLength: 50,
                    }}
                    errorMessages={["this field is required"]}
                  />
                  <TextValidator
                    className="mb-4 w-full"
                    label="Description"
                    onChange={this.handleChangeRequest}
                    type="text"
                    name="short_description"
                    value={request_data.short_description}
                    validators={[
                      "required"
                    ]}
                    errorMessages={["this field is required"]}
                  />
                  <TextValidator
                    className="mb-4 w-full"
                    label="Quantity"
                    onChange={this.handleChangeRequest}
                    type="number"
                    name="quantity"
                    value={request_data.quantity}
                    validators={[
                      "required"
                    ]}
                    errorMessages={["this field is required"]}
                  />

                  {/*<input className="sea" 
                    name="image" 
                    type="file" 
                    accept="image/*" 
                    multiple="false" 
                    onChange={this.handleProfileImage} 
                    ref={this.imageUploader}
                    // style={{display:"none"}}
                  />*/}

                {/* <Grid item md={10} xs={10}> */}
                <img src={request_data.image} 
                 style={{marginBottom: '4'}} ref={this.uploadedImage} alt="" onClick={this.handleClick}
                />                
                  <TextValidator
                    className="mb-4 w-full"
                    name="image" 
                    type="file" 
                    accept="image/*" 
                    multiple="false" 
                    onChange={this.handleProfileImage} 
                    ref={this.imageUploader}
                    validators={[
                      "required"
                    ]}
                    errorMessages={["this field is required"]}
                  />
                {/* </Grid> */}
                {this.props.savings &&
                <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
                <Button className="uppercase"
                  type="submit"
                  size="large"
                  onClick={this.handleSubmitRequest}
                  variant="contained"
                  style={{backgroundColor:'#224459', color:"#fff"}}>
                  Submit
                </Button>
                </Grid>
              </Grid>
            </ValidatorForm>
          </Card>
        </Dialog>
        {/* Quick Save Dialog End */}       

      </div>
    );
  }
}

const actionCreators = {
  timeOut: userActions.timeOut,
  addHalaiInvestors: userActions.addHalaiInvestors,
  userUploadRequested: userActions.userUploadRequested,
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Halal))
);