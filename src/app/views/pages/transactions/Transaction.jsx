import React,{Component} from "react";
import SimpleTable from "./SimpleTable";
import PaginationTable from "./PaginationTable";
import { Breadcrumb, SimpleCard } from "matx";
import {getConfig, setLastUrl} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import history from '../../../../history'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import Lottie from 'react-lottie';
import cube from "../../../../lottiefiles/26519-cube-spinning";
import Loading from "matx/components/MatxLoading/MatxLoading";

class Transaction extends Component {
  constructor(props) {
    super(props);
    setLastUrl()
    this.state = {
      transactions: [],
      loading: true,
      cancreate: true,
      opened: false,
      pagination:[],
      isPageLoading:false
    };

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
  }

  render(){
    const {pagination, transactions, loading} = this.state
    return (
      <div className="m-sm-30">
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
        <SimpleCard title="Transactions Table">
          <PaginationTable transactions={transactions} pagination={pagination}/>
        </SimpleCard>
        </>}
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
