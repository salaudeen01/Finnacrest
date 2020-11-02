import React,{Component} from "react";
import { Breadcrumb, SimpleCard } from "matx";
import {getConfig, setLastUrl, checkUserStatus} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import history from '../../../../history'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import Lottie from 'react-lottie';
import cube from "../../../../lottiefiles/26519-cube-spinning";
import Loading from "matx/components/MatxLoading/MatxLoading";
import SesisSavingTop from "./components/SesisSavingTop";
import ShareholdingsTab from "./ShareholdingsTab";
import { AppBar, Button, Card, Dialog, DialogActions, Grid, IconButton, Toolbar, Typography } from "@material-ui/core";

class Shareholdings extends Component {
  constructor(props) {
    super(props);
    setLastUrl()
    this.state = {
      modal:false,
    };
    
  }
  componentDidMount(){
    let check = checkUserStatus()
    if(check == false){
      this.setState({modal:false})
    }
  }
  
  render(){
    const { modal, loading} = this.state
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
          <Card className="px-6 pt-2 pb-4">
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
                            variant="contained">
                            Become a Member
                        </Button> 
                      </Grid> 
                      <Grid item lg={4} md={4} sm={4} xs={12}>                 
                        <Button className="uppercase"
                            size="small"
                            variant="contained">
                                Continue Business
                        </Button> 
                      </Grid>
                      <Grid item lg={4} md={4} sm={4} xs={12}>                  
                        <Button className="uppercase"
                            size="small"
                            variant="contained">
                            Continue Shopping
                        </Button>
                      </Grid>
                </Grid>
                  </DialogActions>
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
