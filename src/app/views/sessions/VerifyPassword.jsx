import React, { Component } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  CircularProgress,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import swal from 'sweetalert'
import { userActions } from "../../redux/actions/user.actions";

const styles = theme => ({
  wrapper: {
    position: "relative"
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class VerifyPassword extends Component {
  constructor(props){
    super(props)
    const id = this.props.match.params.id;
    this.state = {
        data:{
          email: "",
          password: "",
          password_confirmation: "",
          token:id
        }
      };
  }
  
  handleChange = event => {
    const {data} = this.state
    event.persist();
    this.setState({
      data:{...data, [event.target.name]: event.target.value}
    });
  };
  handleFormSubmit = event => {
    const { data } = this.state;
    if (data.email && data.password) {
        this.props.verifypass(data);
    }else{
      swal("all field are required");
  }
  };
  render() {
    let { data} = this.state;
    let { classes } = this.props;
    return (
      <div className="signup flex justify-center w-full h-full-screen" style={{
        backgroundImage: `url(${"/assets/images/bg.png"})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        }}>
        <div className="block mt-10">
          <div className="p-8">
            <Grid container className="p-2 " justify="center" alignItems="center">
              <Grid lg={6} md={6} sm={6} xs={6}>
                <img src="/assets/images/Group24.png"/>
              </Grid>
            </Grid>
          </div>
        <div className="p-4">
          <Card className="signup-card ">
            <Grid container className="p-2 bg-light-gray" justify="center" alignItems="center">
              <Grid lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h6" className="text-center text-gray">Change Password</Typography>
              </Grid>
            </Grid>
            <Grid container className=" bg-light-gray" >
              <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="p-9 h-full position-relative">
                      <TextValidator
                        className="mb-6 w-full"
                        variant="outlined"
                        label="Email"
                        onChange={this.handleChange}
                        type="email"
                        name="email"
                        value={data.email}
                        validators={["required", "isEmail"]}
                        errorMessages={[
                          "this field is required",
                          "email is not valid"
                        ]}
                      />
                      <TextValidator
                        className="mb-6 w-full"
                        variant="outlined"
                        label="New Password"
                        onChange={this.handleChange}
                        type="password"
                        name="password"
                        value={data.password}
                        validators={["required"]}
                        errorMessages={[
                          "this field is required",
                          "email is not valid"
                        ]}
                      />
                      <TextValidator
                        className="w-full"
                        label="Confirm Password"
                        variant="outlined"
                        onChange={this.handleChange}
                        name="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                  </div>
                  <Grid item lg={12} md={12} sm={12} xs={12} className="mb-4">
                    <Button
                      variant="contained"
                      color="warning"
                      disabled={this.props.loggingIn}
                      type="submit"
                      className="capitalize font-medium"
                      style={{background:'#04956b', color:"#fff", width:"84%", padding:10, marginLeft:36, marginRight:36}}
                    >
                      Verify
                    </Button>
                    {this.props.loggingIn && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />)}
                  </Grid>
                  
                  <Grid item lg={12} md={12} sm={12} xs={12} className="mb-1" style={{textAlign:"center"}}>
                      <span className="mr-2 ml-5">New Member?</span>
                      <Button
                        className="capitalize font-medium"
                        onClick={() =>
                        this.props.history.push("/signup")
                        }>
                        Sign up
                      </Button>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12} className=" mb-4" style={{textAlign:"center"}}>
                    <Button
                      className="text-primary text-center"
                      onClick={() =>
                      this.props.history.push("/signin")
                      }>
                      Already have an account? Login
                    </Button>
                  </Grid>
                </Grid>
              </ValidatorForm>
            </Grid>
          </Card>
        </div>
      </div>
      </div>
    );
  }
}

const actionCreators = {
  verifypass: userActions.verifypass,
};

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}
export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(VerifyPassword))
);
