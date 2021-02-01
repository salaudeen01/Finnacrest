import React,{Component} from "react";
import TransTop from "./TransTop";
import PaginationTable from "./PaginationTable";
import { Breadcrumb, SimpleCard } from "matx";
import {getConfig, setLastUrl, checkUserStatus, numberFormat} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import history from '../../../../history'
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import Loading from "matx/components/MatxLoading/MatxLoading";
import { AppBar, Button, Card, Dialog, DialogActions, Grid, IconButton, Slide, Toolbar, Typography } from "@material-ui/core";
import ModalForm from "./ModalForm";
import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class Transaction extends Component {
  constructor(props) {
    super(props);
    setLastUrl()
    this.state = {
      transactions: [],
      registrationFee: 0,
      loading: true,
      cancreate: true,
      opened: false,
      pagination:[],
      modal:false,
      modalForm:false,
      modalFee:false,
      isPageLoading:false
    };
    this.handleOpenModalForm = this.handleOpenModalForm.bind(this);
    this.handleCloseModalForm = this.handleCloseModalForm.bind(this);
    this.handleOpenModalFee = this.handleOpenModalFee.bind(this);
    this.handleCloseModalFee = this.handleCloseModalFee.bind(this);
    this.fetch_next_page = this.fetch_next_page.bind(this);
    this.fetch_page = this.fetch_page.bind(this);
    this.fetch_prev_page = this.fetch_prev_page.bind(this);

    
    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" },
    };
    fetch(getConfig("showTransaction"), requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          this.setState({loading: false });
          return Promise.reject(error);
        }
        this.setState({ loading: false, transactions:data.data, pagination: data});
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut()
        }
        if(error == "Sorry, No Record found!"){
          this.setState({loading:false, err : ""});
         }else{
          this.setState({loading:false, err : "internet error"});
         }
      });

      fetch(getConfig("getRegistrationFee"), requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          this.setState({loading: false });
          return Promise.reject(error);
        }
        this.setState({ loading: false, registrationFee:data});
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut()
        }
        if(error == "Sorry, No Record found!"){
          this.setState({loading:false, err : ""});
         }else{
          this.setState({loading:false, err : "internet error"});
         }
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
      this.setState({ loading: false, transactions:data.data, pagination:data });
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
      this.setState({ loading: false, transactions:data.data, pagination:data });
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
      this.setState({ loading: false, transactions:data.data, pagination:data });
    }).catch(error=>{
      if (error === "Unauthorized") {
        this.props.logout();
      }
    })
  }
  

  componentDidMount(){
    let check = checkUserStatus()
    if(check != true){
      this.setState({modal:true})
    }

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
    const {pagination, transactions, registrationFee, modal, modalForm, modalFee, loading} = this.state
    return (
      <div className="m-sm-30">
    { modal == false ?
      <div>
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Transaction" }
            ]}
          />
        </div>
        {loading ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        <>
        <div className="py-3" /> 
        {/* Date Search */}
        {/* <TransTop />   */}
        {/* <div className="py-2" />       */}
        <SimpleCard title="Transactions Table">
          <PaginationTable transactions={transactions} pagination={pagination}
            fetch_page={this.fetch_page} fetch_next_page={this.fetch_next_page}
            fetch_prev_page={this.fetch_prev_page}  loading={loading}/>
        </SimpleCard>
        </>}
      </div>:
    <></>}

      {/* Loan repayment Dialog Start */}
      <Dialog
              TransitionComponent={Transition}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
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
                Welcome To SESIS
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4 text-center">
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography>
                  We have INTEREST FREE LOAN which is easily accesseable 
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
                      <Link to="/business-fianance">
                          <Button className="uppercase"
                              size="small"
                              variant="outlined">
                                  Business Finance
                          </Button> 
                        </Link>
                      </Grid>
                      <Grid item lg={4} md={4} sm={4} xs={12}>                  
                       <Link to="/product_financing"> <Button className="uppercase"
                            size="small"
                            variant="outlined">
                            Product Finance
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
              TransitionComponent={Transition}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
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
                <CloseIcon style={{color:'#fff'}}/>
              </IconButton>
              <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
                Welcome To SESIS
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
              TransitionComponent={Transition}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
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
                <CloseIcon style={{color:'#fff'}}/>
              </IconButton>
              <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
                Welcome To SESIS
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
  withRouter(connect(mapState,  actionCreators)(Transaction))
);
