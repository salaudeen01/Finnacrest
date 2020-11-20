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
import OrderTrans from "../../ProductFinance/components/OrderTrans";
import LoanDetailsCard from "../../Loans/components/LoanDetailsCard";
import BusinessDetails from "./BusinessDetails";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
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

class MyRequest extends Component{
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

    fetch(getConfig("display_request"), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }console.log(data)
    if(data.success == false){
      this.setState({data: [], isLoading:false});
    }else{
      this.setState({data: data, isLoading:false});
    } 
  })
    .catch(error => {
        if (error === "Unauthorized") {
            this.props.timeOut()
        }
        this.setState({isLoading:false})
    });
  }

  handleView = () => {
    this.setState({ showView: true });
  }; 
  handleCloseView() {
    this.setState({showView:false});
  }   
  render(){
    const { title, amount_paid, balance, status, repay, view, viewTrans} = this.props;
    const { showView, isLoading, data} = this.state;
  return (
    <div className="pt-4 mb-4 px-2 bg-default text-white" style={{flexGrow: 1, border:1, borderStyle:"solid", 
    borderColor:"#222943", borderRadius:10}}>
      
      <Grid container spacing={0}>      
        {/* <Divider variant="middle"/> */}
        <div className="py-2" />
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6" style={{fontSize:16}}><span>Business Name:</span> {this.props.title} </Typography>
        </Grid>
        {/* <Divider variant="middle"/> */}
        <div className="py-2" />
        {this.props.status == 11?"":
          <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6" style={{fontSize:16}}><span>Requested Amount:</span> {this.props.amount} </Typography>
        </Grid>}
        <div className="py-2" /> 
       { (this.props.status == 0 && this.props.admin_price != 0) || this.props.status == 11?
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6" style={{fontSize:16}}><span>Mark-up:</span> {this.props.admin_price} </Typography>
        </Grid>:
        <></>}
        <div className="py-2" />
       {this.props.status == 1 || this.props.status == 11 ? 
       <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6" style={{fontSize:16}}><span>Amount Repaid:</span> {this.props.repaid} </Typography>
        </Grid>:
        ""}
        <div className="py-2 " />
        <Grid item lg={12} md={12} sm={12} xs={12}>
        {(this.props.status == 0 && this.props.admin_price == 0) ?
           <Typography className=" text-primary" variant="h6" style={{fontSize:16}}>Request Status:
           <span className="py-1 px-3" style={{background:'orange', fontSize:12, color:'white', borderRadius:14}}>PENDING</span>
         </Typography>
        :
        (this.props.status == 0 && this.props.admin_price != 0) ?
        <Typography className=" text-primary" variant="h6" style={{fontSize:16}}>Request Status:
           <span className="py-1 px-3" style={{background:'orange', fontSize:12, color:'white', borderRadius:14}}>Awaiting Response</span>
         </Typography>
        :  this.props.status == 11 ?
        <div>
          <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography className=" text-primary" variant="h6" style={{fontSize:16}}>Request Status:
            <span className="py-1 px-3" style={{background:'green',fontSize:12, color:'white', borderRadius:14}}>Disbursed</span>
          </Typography>
         {/* <Badge className="px-3"  badgeContent={'Approved'} {...defaultthis.Props}/> */}
        </Grid>       
        </div>:  this.props.status == 2 ?
        <div>
          <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography className=" text-primary" variant="h6" style={{fontSize:16}}>Request Status:
            <span className="py-1 px-3" style={{background:'green',fontSize:12, color:'white', borderRadius:14}}>Processing</span>
          </Typography>
         {/* <Badge className="px-3"  badgeContent={'Approved'} {...defaultthis.Props}/> */}
        </Grid>       
        </div>
       :this.props.status == 9 ?
       <div>
         <Grid item lg={12} md={12} sm={12} xs={12}>
         <Typography className=" text-primary" variant="h6" style={{fontSize:16}}>Request Status:
            <span className="py-1 px-3" style={{background:'red',fontSize:12, color:'white', borderRadius:14}}>DECLAINED</span>
          </Typography>
       </Grid>
       </div>
       : ""
        } 
       { this.props.status == 1 || this.props.status == 11?
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6" style={{fontSize:16}}><span>Due Date:</span> {this.props.end_date} </Typography>
        </Grid>:
        <></>}
        <Grid>
           <Grid item lg={12} md={12} sm={12} xs={12}>
           { (this.props.status == 0 && this.props.admin_price != 0)  ?            
        <ButtonGroup color="primary" aria-label="outlined primary button group">
           <Button className="mb-4"  size='small' variant="outlined" style={{borderColor:'green', color:'green'}}
             onClick={this.props.accept}
             >Accept</Button>
             <Button className="mb-4"  size='small' variant="outlined" style={{borderColor:'red', color:'red'}}
             onClick={this.props.decline}
             >Decline</Button>                             
        </ButtonGroup>:
        this.props.status == 11 ?            
        <ButtonGroup color="primary" aria-label="outlined primary button group">
           <Button className="mb-4"  size='small' variant="outlined" style={{borderColor:'blue', color:'blue'}}
             onClick={this.props.repay}
             >Repayment</Button>
              <Button className="mb-4"  size='small' variant="outlined" 
                onClick={this.props.viewTrans}
                >Transaction Detail</Button>               
        </ButtonGroup>:
          (this.props.status == 1 || this.props.status == 2 || (this.props.status == 0 && this.props.admin_price == 0)) ?            
            <ButtonGroup color="primary" aria-label="outlined primary button group">
              <Button className="mb-4"  size='small' variant="outlined"  style={{borderColor:'red', color:'red'}}
                 onClick={this.props.decline}
                 >Cancel
              </Button> 
            </ButtonGroup>:             
           <></>
           }
          </Grid>
           </Grid>
        </Grid>
      </Grid>

      
    </div>
  );
};
}

export default MyRequest;
