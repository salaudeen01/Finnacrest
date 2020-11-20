import { Component } from "react";
import React from 'react';
import {
  getConfig,
  numberFormat,
  payID,
  setLastUrl,
} from'../../../../config/config';
import { authHeader } from "../../../../redux/logic";import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import CloseIcon from "@material-ui/icons/Close";
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
    Dialog, Checkbox,
    ButtonGroup, Divider, Badge, Slide} from '@material-ui/core';
import OrderTrans from "./OrderTrans";
import BusinessDetails from "../../BusinessFinance/components/BusinessDetails";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#e74398',
  },
}))(LinearProgress);

const defaultProps = {
  color: 'secondary',
  textColor:'#fff'
};

class MyProduct extends Component{
  constructor(props){
    super(props)
    this.state={  
      isLoading:true,
      showView:false,
      data: [],
    }
    this.handleView = this.handleView.bind(this);
    this.handleCloseView = this.handleCloseView.bind(this);
    this.repaymentsDetails = this.repaymentsDetails.bind(this);

  }

  repaymentsDetails=(order_id)=>{
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    fetch(getConfig("orderRepaymentsDetails") + order_id, requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }console.log(data)
    if(data.success == false || data.total == 0){
      this.setState({data: [], pagination:[], isLoading:false});
    }else{
      this.setState({data: data, pagination:data, isLoading:false});
    } 
  })
    .catch(error => {
        if (error === "Unauthorized") {
            this.props.timeOut()
        }
        this.setState({isLoading:false})
    });
  }

  handleView = (order_id) => {
    this.setState({ isLoading: true });
    this.repaymentsDetails(order_id);
    this.setState({ showView: true });
  }; 
  handleCloseView() {
    this.setState({showView:false});
  }   
  render(){
    const { title, amount, amount_paid, balance, status, repay, view, viewTrans} = this.props;
    const { showView, isLoading, data} = this.state;
  return (
    <div className="pt-7 mb-4 px-2 bg-default text-white" style={{flexGrow: 1, border:1, borderStyle:"solid", 
    borderColor:"#222943", borderRadius:10}}>
      <Grid container spacing={0}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6" style={{fontSize:16}}><span>Order No:</span> {this.props.title} </Typography>
        </Grid>
        {/* <Divider variant="middle"/> */}
        <div className="py-2" />
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6" style={{fontSize:16}}><span>Total:</span> {this.props.amount} </Typography>
        </Grid>
        <div className="py-2" />
        <Grid item lg={12} md={12} sm={12} xs={12}>
          
        </Grid> 
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6" style={{fontSize:16}}><span>Amount Repaid:</span> {this.props.amount_paid} </Typography>
        </Grid> 
        {/* <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6" style={{fontSize:16}}><span>Balance:</span> 
              {this.props.balance} 
         </Typography>
        </Grid> */}
        <div className="py-2 " />
        <Grid item lg={12} md={12} sm={12} xs={12}>
        {this.props.status == 1 ?
           <Typography className="mb-2">
           <span className="mb-4 py-1 px-3" style={{background:'orange', fontSize:12, color:'white', borderRadius:14}}>PENDING</span>
         </Typography>
        : this.props.status == 3 ?
        <div>
          <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography className="mb-2">
            <span className="mb-4 py-1 px-3" style={{background:'green',fontSize:12, color:'white', borderRadius:14}}>APPROVED</span>
          </Typography>
         {/* <Badge className="mb-4 px-3"  badgeContent={'Approved'} {...defaultthis.Props}/> */}
        </Grid>       
        </div>
       :this.props.status == 4 ?
       <div>
         <Grid item lg={12} md={12} sm={12} xs={12}>
         <Typography className="mb-2">
            <span className="mb-4 py-1 px-3" style={{background:'red',fontSize:12, color:'white', borderRadius:14}}>DECLAINED</span>
          </Typography>
       </Grid>
       </div>
       : ""
        }
        <Grid>
           <Grid item lg={3} md={3} sm={12} xs={12}>
           { this.props.status == 3 ?
           <ButtonGroup color="primary" aria-label="outlined primary button group">
              {/* <Button className="mb-4"  size='small' variant="outlined" 
                onClick={this.props.repay}
                >Repayment</Button> */}
                <Button className="mb-4"  size='small' variant="outlined" 
                onClick={this.props.viewTrans}
                >Transaction</Button>
                 <Button className="mb-4"  size='small' variant="outlined" 
                onClick={this.props.view}
                >Detail</Button>
           </ButtonGroup>
           :<div/>}
          </Grid>
           </Grid>
           <Grid item lg={3} md={3} sm={12} xs={12}>
           { this.props.status != 3 ?
                <Button className="mb-4"  size='small' variant="outlined" 
                onClick={this.props.view}
                >Detail</Button>:
                <div/>}
           </Grid>
        </Grid>
      </Grid>

        {/* View Dialog start */}
        <Dialog
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
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
                 <CloseIcon style={{color:'#fff'}}/>
                </IconButton>
                <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
                  Order Details
                </Typography>
              </Toolbar>
            </AppBar>
            <Card className="px-6 pt-2 pb-4">
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {isLoading ?
                <Typography>Loading...</Typography>:
                 <BusinessDetails transactions={data} />
                 }
              </Grid>
            </Grid>
          </Card>
        </Dialog>
        {/* View dialog end */} 

    </div>
  );
};
}

export default MyProduct;
