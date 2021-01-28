import React,{Component} from "react";
import {getConfig, setLastUrl} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import CustomHalalTab from "./components/CustomHalalTab";
import Loading from "matx/components/MatxLoadable/Loading";

class Business extends Component {
  constructor(props){
    super(props)
    setLastUrl()
    
    let user = JSON.parse(localStorage.getItem("user"));
    let token = localStorage.getItem('token');
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    // let rand_id =this.getRand()
    this.state={
      products:0,
      loading: true,
    }

    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" },
    };
    fetch(getConfig('userRequest'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
      console.log(response)
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    console.log(data)
    if(data.success === false || data.length === 0){
      this.setState({ products: [],loading:false});
    }else{
      this.setState({products: data, loading:false });
    }  
    })
    .catch(error => {
      if (error === "Unauthorized") {
        this.props.timeOut()
        }
      this.setState({loading:false, err : "internet error" });
      console.error('There was an error!', error);
    });
}
    

render(){
  const{products,loading} = this.state
   return (
    <div className="m-sm-30">
      {loading ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading/>
        </div>:
        <>
          <CustomHalalTab tdetails={products} />

        </>
      }
    </div>
  );
}
}
// export default Regular;
const actionCreators = {
  timeOut: userActions.timeOut,
  createLoanGroup: userActions.createLoanGroup,
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Business))
);