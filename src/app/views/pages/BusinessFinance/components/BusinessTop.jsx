import React, { Component } from "react";
import StatCards2 from "../../../dashboard/shared/StatCards2";
import {getConfig, payID, numberFormat, setLastUrl} from '../../../../config/config'
import {authHeader} from '../../../../redux/logic'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../../redux/actions/user.actions";
import CustomCarousel from "../../investments/components/CustomCarousel";
import CloseIcon from "@material-ui/icons/Close";
import {Link} from 'react-router-dom';
import { withStyles } from "@material-ui/styles";
import Loading from "matx/components/MatxLoading/MatxLoading";
import {
  Icon,
  Select,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Dialog,
  Grid, Card, Button, TextField, MenuItem, Checkbox, Slide
} from "@material-ui/core";
import "date-fns";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import NumberFormat from "react-number-format";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class BusinessTop extends Component{
  constructor(props){
    super(props)
    setLastUrl()
    let email =  localStorage.getItem('email');
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    this.uploadedImage = React.createRef();
    this.imageUploader = React.createRef();
    this.state = {     
      data:{
        business_name:"",
        frequency:"",
        requested_amount:"",
        repayment_duration:"",
        start_date:"",
        repayment_amount:"",
        image: null
    }, 
      key: payID(),
      savings: [],
      loading: false,
      balance:"",
      showLoan:false,
      repayment_duration:0,
    };

        this.handleSubmitRequest = this.handleSubmitRequest.bind(this);
        this.handleProfileImage = this.handleProfileImage.bind(this);
        this.handleChangeLoan = this.handleChangeLoan.bind(this);
        this.handleCloseLoan = this.handleCloseLoan.bind(this);
        this.handleCreateLoan = this.handleCreateLoan.bind(this);
        this.handleClick = this.handleClick.bind(this);

    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" },
    };
    // let user = JSON.parse(localStorage.getItem("user"));
    fetch(getConfig('getTotalBalanceShareholdings'), requestOptions)
    .then(async response => {
    const dat = await response.json();
    if (!response.ok) {
        const error = (dat && dat.message) || response.statusText;
        return Promise.reject(error);
    }
    if(dat.success == false){
      this.setState({balance: 0})
    }else{
      this.setState({balance: dat})  
    }
    })
    .catch(error => {
      if (error === "Unauthorized") {
        this.props.timeOut()
      }
    });

    fetch(getConfig('finance_payment_duration'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    if(data.success == false || data.length == 0 ){
      this.setState({repayment_duration: []});
    }else{
      this.setState({repayment_duration: data});  
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

  // handleChangeLoan = event => {
  //   const {data} = this.state
  //   this.setState({ data:{...data, [event.target.name]: event.target.value} });
  // }
  // handleChangeLoan(event){
  //   const { name, value, checked } = event.target;
  //   const { data } = this.state;
  //   if(name == "repayment_duration"){
  //     if ( data.requested_amount != "") {
  //       let repay = data.requested_amount / value;
  //       if (data.frequency == "Weekly") {
  //           let week_repay = repay / 4;
  //           // console.log(week_repay)
  //           this.setState({ data: {...data, repayment_amount: week_repay, repayment_duration: value } })        
  //       } else{
  //         this.setState({ data: {...data, repayment_amount: Math.round(repay), repayment_duration: value } })
  //       }
  //     }
  //   }else if (name == "frequency"){
  //         if ( data.requested_amount != "" && data.repayment_duration != "" ) {
  //           let repay = data.requested_amount / data.repayment_duration;
  //           // console.log(repay)
  //           // console.log('Frequency: ', data.frequency);
  //           if (value == "Weekly") {
  //             repay = repay / 4;
  //             // console.log(repay)
  //             this.setState({ data: {...data, repayment_amount: Math.round(repay), [name]: value } })        
  //             } else{
  //               this.setState({ data: {...data, repayment_amount: Math.round(repay), [name]: value } })
  //             }
  //         }else{
  //           this.setState({ data: { ...data, [name]: value} });
  //         }
  //   }else if (name == "requested_amount"){
  //     if ( data.repayment_duration != "") {
  //         // if payment duration is not empty
  //         let repay = value / data.repayment_duration; // monthly repayment amount
  //         // console.log("Frequency: ", data.frequency);
  //         if (data.frequency == "Weekly") {
  //           // if frequency is weekly
  //           repay = repay / 4; // weekly repayment amount
  //           // console.log("Weekly repayment", repay)
  //           this.setState({ data: {...data, repayment_amount: Math.round(repay), [name]: value } })        
  //         } else{
  //           this.setState({ data: {...data, repayment_amount: Math.round(repay), [name]: value } })
  //         }
  //         // console.log('repayment amount: ', repay);
  //     }else{
  //       this.setState({ data: { ...data, [name]: value} });
  //     }
  //   }else{
  //     this.setState({data:{...data, [name]:value}})
  //   }
  // }

  handleChangeLoan(event){
    const { name, value, checked } = event.target;
    const { data } = this.state;
    if(name == "repayment_duration"){
      if ( data.requested_amount != "") {
        let repay = data.requested_amount.replace(/,/g, '') / value;
        if (data.frequency == "Weekly") {
            let week_repay = repay / 4;
            // console.log(week_repay)
            this.setState({ data: {...data, repayment_amount: week_repay, repayment_duration: value } })        
        } else{
          this.setState({ data: {...data, repayment_amount: Math.round(repay), repayment_duration: value } })
        }
      }
    }else if (name == "frequency"){
          if ( data.requested_amount != "" && data.repayment_duration != "" ) {
            let repay = data.requested_amount.replace(/,/g, '') / data.repayment_duration;
            // console.log(repay)
            console.log('Frequency: ', data.frequency);
            if (value == "Weekly") {
              repay = repay / 4;
              // console.log(repay)
              this.setState({ data: {...data, repayment_amount: Math.round(repay), [name]: value } })        
              } else{
                this.setState({ data: {...data, repayment_amount: Math.round(repay), [name]: value } })
              }
          }else{
            this.setState({ data: { ...data, [name]: value} });
          }
    }else if (name == "requested_amount"){
      if ( data.repayment_duration != "") {
          // if payment duration is not empty
          let repay = value.replace(/,/g, '') / data.repayment_duration; // monthly repayment amount
          // console.log("Frequency: ", data.frequency);
          if (data.frequency == "Weekly") {
            // if frequency is weekly
            repay = repay / 4; // weekly repayment amount
            // console.log("Weekly repayment", repay)
            this.setState({ data: {...data, repayment_amount: Math.round(repay), [name]: value } })        
          } else{
            this.setState({ data: {...data, repayment_amount: Math.round(repay), [name]: value } })
          }
          // console.log('repayment amount: ', repay);
      }else{
        this.setState({ data: { ...data, [name]: value.replace(/,/g, '')} });
      }
    }else{
      this.setState({data:{...data, [name]:value}})
    }
  }

  handleProfileImage(e){
    const [file, name] = e.target.files;
    const {data} = this.state
    if(file){
        const reader = new FileReader();
        const { current } = this.uploadedImage;
        current.file = file;
        reader.onload = e => {
          current.src = e.target.result;
        };
        reader.readAsDataURL(file); 
        this.setState({data:{...data, image: e.target.files[0]}})
        // console.log(file)
    }  
  }
  handleSubmitRequest(event) {
    event.preventDefault();  
    const { data } = this.state;
      // console.log(data);
      if (data.business_name && data.frequency && data.requested_amount 
        && data.start_date && data.repayment_duration && data.repayment_amount && data.image) {
        // console.log(data);
        
        const fd = new FormData();
          fd.append("business_name", data.business_name); 
          fd.append("frequency", data.frequency);
          fd.append("requested_amount", data.requested_amount);
          fd.append("repayment_duration", data.repayment_duration);
          fd.append("start_date", data.start_date);
          fd.append("repayment_amount", data.repayment_amount);
          fd.append("image", data.image);
          // console.log(data.image);
        this.props.businessRequest(fd);
      }
  } 
  handleClick(e) {
    this.imageUploader.current.click();
  }
  handleCreateLoan = () => {
    this.setState({showLoan: true});
  }
  handleCloseLoan() {
    this.setState({showLoan:false});
  }
  render(){
    let {theme} = this.props
    const {balance, data, showLoan, repayment_duration, balanceRegular,loading,savings} = this.state
    let arr = []
    for (let index = 1; index < repayment_duration; index++) {
      arr.push((index)+1);    
    }
    // console.log(arr)
    return (
      <div className="">
        <div className="pb-2 pt-7 px-8 " style={{background:"#222943"}}>      
            <Grid container spacing={3} className="mb-3">
                  
                <Grid item xs={12} sm={6} md={6}>
                    <Card className="play-card p-sm-24" style={{backgroundColor:"#1999ff",height:171}} elevation={6}>
                        <div className="flex items-cente p-3">
                        <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}></Icon>
                        <div className="ml-3">
                            <Typography className="text-white" variant="text-16"></Typography>
                            <h6 className="m-0 mt-1 text-white text-22">  </h6>
                        </div>
                        </div>
                    </Card>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={6}>
                    <div className="flex items-cente">
                  <CustomCarousel />
              </div>
            </Grid> 
            <Grid item lg={12} md={12} xs={12} sm={12}>
                <div className="flex items-cente">
                    <Button className="uppercase"
                      size="large"
                      variant="outlined"
                      style={{backgroundColor:"#0d60d8",color:"white"}}
                      onClick={this.handleCreateLoan}
                      >
                      Place Request
                   </Button>
              </div>
            </Grid>           
        </Grid>
        </div>     
    
    
    {/* Quick Loan Dialog Start */}
    <Dialog
      open={showLoan}
      onClose={this.handleCloseLoan}      
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      >
      <AppBar style={{position: "relative"}} color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={this.handleCloseLoan}
            aria-label="Close"
          >
            <CloseIcon style={{color:'#fff'}}/>
          </IconButton>
          <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
            Create Business Request
          </Typography>
        </Toolbar>
      </AppBar>
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmitRequest}
        onError={errors => null}>
        <Card className="px-6 pt-2 pb-4">
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextValidator
                  className="mb-4 w-full"
                  label="Business Name"
                  onChange={this.handleChangeLoan}
                  type="text"
                  name="business_name"
                  value={data.business_name}
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                />
                 <NumberFormat
                    value={data.requested_amount}
                    thousandSeparator={true} 
                      // prefix={'₦'}
                    label="Loan Request Amount"
                    name="requested_amount"
                    className="mb-4 w-full"
                    onChange={this.handleChangeLoan}
                    customInput={TextValidator}
                    validators={[
                      "required"
                    ]}
                    errorMessages={["this field is required"]}
                  />
                {/* <TextValidator
                  className="mb-4 w-full"
                  label="Loan Request Amount"
                  onChange={this.handleChangeLoan}
                  type="number"
                  name="requested_amount"
                  value={data.requested_amount}
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                /> */}
                 <TextField
                    className="mb-4 w-full"
                    select
                    label="Select Loan Duration"
                    name="repayment_duration"
                    value={data.repayment_duration}
                    onChange={this.handleChangeLoan}
                    //  helperText="Please select Loan Group"
                  >
                      <MenuItem value={""}>Select Loan Duration</MenuItem>
                      <MenuItem value={"1"}>{(1) +" "+ 'month'}</MenuItem>
                    {arr.map((name, index) => (
                      <MenuItem value={name}>{(name) +" "+ 'months'}</MenuItem>
                    ))}
                  </TextField>
                <TextField
                className="mb-4 w-full"
                  select
                  label="Select Frequency"
                  name="frequency"
                  value={data.frequency}
                  onChange={this.handleChangeLoan}
                  // helperText="Please select frequency"
                >
                    <MenuItem value={""}>Select Frequency</MenuItem>
                    <MenuItem value={"Weekly"}> Weekly</MenuItem>
                    <MenuItem value={"Monthly"}> Monthly </MenuItem>
                </TextField>
                {/* {data.requested_amount && data.frequency && data.repayment_duration &&
                <TextValidator
                  className="mb-4 w-full"
                  label={data.frequency? data.frequency +" Repayment Amount": "Frequent Repayment" +" Amount"}
                  onChange={this.handleChangeLoans}
                  type="number"
                  name="repayment_amount"
                  value={data.repayment_amount}
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                />} */}
                {data.requested_amount && data.frequency && data.repayment_duration &&
                  <NumberFormat
                      value={data.repayment_amount}
                      thousandSeparator={true} 
                        // prefix={'₦'}
                      label={data.frequency? data.frequency +" Repayment Amount": "Frequent Repayment" +" Amount"}
                      name="repayment_amount"
                      className="mb-4 w-full"
                      onChange={this.handleChangeLoan}
                      customInput={TextValidator}
                      validators={[
                        "required"
                      ]}
                      errorMessages={["this field is required"]}
                  />}
                {data.requested_amount && data.frequency &&
                  <TextValidator
                  className="mb-4 w-full"
                  onChange={this.handleChangeLoan}
                  type="date"
                  name="start_date"
                  helperText="Start Date"
                  value={data.start_date}
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                />}                
                <img src={data.image} 
                 style={{marginBottom: '4'}} ref={this.uploadedImage} alt="" onClick={this.handleClick}
                />                
                  <TextValidator
                    className="mb-4 w-full"
                    name="image" 
                    type="file"
                    required
                    accept="image/*" 
                    multiple="false" 
                    onChange={this.handleProfileImage} 
                    ref={this.imageUploader}
                    
                    errorMessages={["this field is required"]}
                  />
                {this.props.savings &&
                    <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
                <Button className="uppercase"
                    type="submit"
                    size="large"
                    variant="contained"
                  style={{backgroundColor:"#222943", color:"white"}}>Submit Request</Button>
                
              </Grid>
            </Grid>
          </Card>
      </ValidatorForm>
    </Dialog>
    {/* Quick Loan Dialog End */}
     </div>
    );
  };
}

const actionCreators = {
  timeOut: userActions.timeOut,
  businessRequest:userActions.businessRequest
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(BusinessTop))
);