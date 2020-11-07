import React,{Component} from "react";
import { Breadcrumb, SimpleCard } from "matx";
import {getConfig, setLastUrl, checkUserStatus, numberFormat} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import history from '../../../../history'
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import Lottie from 'react-lottie';
import cube from "../../../../lottiefiles/26519-cube-spinning";
import Loading from "matx/components/MatxLoading/MatxLoading";
import SesisSavingTop from "./components/SesisSavingTop";
import ShareholdingsTab from "./ShareholdingsTab";
import { AppBar, Button, Card, Dialog, DialogActions, Grid, IconButton, Toolbar, Typography } from "@material-ui/core";
import ModalForm from "../transactions/ModalForm";

class Shareholdings extends Component {
  constructor(props) {
    super(props);
    setLastUrl()
    this.state = {
      modal:false,
      modalForm:false, 
      modalFee:false,
      registrationFee: 0,
    };    
    this.handleOpenModalForm = this.handleOpenModalForm.bind(this);
    this.handleCloseModalForm = this.handleCloseModalForm.bind(this);
    this.handleOpenModalFee = this.handleOpenModalFee.bind(this);
    this.handleCloseModalFee = this.handleCloseModalFee.bind(this);
  }
  componentDidMount(){
    let check = checkUserStatus()
    if(check == false){
      this.setState({modal:true})
    }
    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" },
    };
    fetch(getConfig("getRegistrationFee"), requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          this.setState({loading: false });
          return Promise.reject(error);
        }
        console.log(data)
        this.setState({ loading: false, registrationFee:data});
      })
  }
  handleOpenModalForm = () => {
    this.setState({modalForm: true});
  }
  handleCloseModalForm() {
    this.setState({modalForm:false});
  }
  handleOpenModalFee = () => {
    this.setState({modalFee: true});
  }
  handleCloseModalFee() {
    this.setState({modalFee:false});
  }
  
  render(){
    const { modal, modalForm, registrationFee, modalFee, loading} = this.state
    return (
      <div className="m-sm-30">
         { modal == false ?
         <div>
          <SesisSavingTop/>
            <ShareholdingsTab />
        </div>:
         <></>}

      {/* Loan repayment Dialog Start */}
      <Dialog
          open={modal}
          fullWidth={true}
          maxWidth={"sm"}
          onClose={this.handleCloseRepayment} >
          <AppBar style={{position: "relative"}} color="primary">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseRepayment}
                aria-label="Close"
              >
                {/* <CloseIcon /> */}
              </IconButton>
              <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
                Welcome To SESSI
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4 text-center">
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography>
                  We have INTEREST FREE LOAN which easily accesseable 
                </Typography>
                <Typography>
                  To access our LOAN, Click on the <span style={{color:"green"}}>Member button</span> to continue
                </Typography>
              </Grid> <br/>
                <DialogActions>
                
                <Grid container spacing={1}>
                      <Grid item lg={4} md={4} sm={4} xs={12}>                      
                          <Button className="uppercase"
                            size="small"
                            onClick={this.handleOpenModalForm}
                            variant="outlined">
                            Become a Member
                        </Button>                       
                      </Grid> 
                      <Grid item lg={4} md={4} sm={4} xs={12}>                 
                      {/* <Link to="/business_financing"> */}
                      <Link to="/#">
                          <Button className="uppercase"
                              size="small"
                              variant="outlined">
                                  Continue Business
                          </Button> 
                        </Link>
                      </Grid>
                      <Grid item lg={4} md={4} sm={4} xs={12}>                  
                       <Link to="/product_financing"> <Button className="uppercase"
                            size="small"
                            variant="outlined">
                            Continue Shopping
                        </Button>
                      </Link>
                      </Grid>
                </Grid>
                  </DialogActions>
              </Card>
        </Dialog>
        {/* Loan repayment Dialog End */}
        {/* Loan repayment Dialog Start */}
      <Dialog
          open={modalForm}
          fullWidth={true}
          maxWidth={"sm"}
          onClose={this.handleCloseModalForm} >
          <AppBar style={{position: "relative"}} color="primary">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseModalForm}
                aria-label="Close"
              >
                {/* <CloseIcon /> */}
              </IconButton>
              <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
                Welcome To SESSI
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4 text-center">
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography>
                  The registration fee is:
                </Typography>
                <Typography variant='h6'>
                  <b>{numberFormat(registrationFee)}</b>
                </Typography>
                <Typography variant='h6'>
                  Click the below button to continue with the payment 
                </Typography>
                <Button className="uppercase"
                    size="small"
                    onClick={this.handleOpenModalFee}
                    variant="outlined"> Continue
                </Button>
              </Grid> <br/>
                </Card>
        </Dialog>
        {/* Loan repayment Dialog End */}
        {/* Loan repayment Dialog Start */}
      <Dialog
          open={modalFee}
          fullWidth={true}
          maxWidth={"sm"}
          onClose={this.handleCloseModalFee} >
          <AppBar style={{position: "relative"}} color="primary">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseModalFee}
                aria-label="Close"
              >
                {/* <CloseIcon /> */}
              </IconButton>
              <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
                Welcome To SESSI
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-1 pt-2 pb-4">
              <Grid item lg={12} md={12} sm={12} xs={12}>
               <ModalForm amount={registrationFee}/>
              </Grid>
                </Card>
        </Dialog>
        {/* Loan repayment Dialog End */}

      </div>
    );
  };
}
const actionCreators = {
  timeOut: userActions.timeOut
};

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Shareholdings))
);
