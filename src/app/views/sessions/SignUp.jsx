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
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import swal from 'sweetalert'
import { userActions } from "../../redux/actions/user.actions";
import { withRouter } from "react-router-dom";

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

class SignUp extends Component {
  state = {
    data: {
      first_name: '',
      last_name: '',
      middle_name: '',
      password: '',
      email: '',
      phone_no: ''
  },
    confirm_password:"",
    username: "",
    email: "",
    password: "",
    agreement: "" 
  };

  handleChange = event => {
    event.persist();
    const { data} = this.state
    const { name, value} = event.target
    if(name == "confirm_password"){
      this.setState({confirm_password:value})
    }else{
      this.setState({
        data: {
              ...data,
              [name]: value
          }
      });
    }
    
  };

  handleFormSubmit = event => {
    event.preventDefault();
      const { data, confirm_password } = this.state;
      if (data.first_name && data.last_name && data.email && data.phone_no && data.password) {
        if(data.password == confirm_password){
          this.props.register(data);
        }else{
          swal(
            `Password Not Match`
          );
        }
      }else{
        swal(
            `${"All fields are required"}`
        );
    }
  };
  render() {
    let { classes } = this.props;
    const { username, email, password, data, confirm_password } = this.state;
    return (
      <div className="signup flex justify-center w-full h-full-screen" style={{
        backgroundImage: `url(${"/assets/images/bg.png"})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        }}>
        <div className=" block mt-10">
          <div className="p-8">
            <Grid container className="p-2 " justify="center" alignItems="center">
              <Grid lg={6} md={6} sm={6} xs={6}>
                <img src="/assets/images/Group 24.png"/>
              </Grid>
            </Grid>
          </div>
          <div className="p-4">
            <Card className="signup-card ">
              <Grid container className="p-2 mb-5" justify="center" alignItems="center">
                <Grid lg={12} md={12} sm={12} xs={12}>
                  <Typography variant="h4" className="text-center text-gray">Sign Up</Typography>
                </Grid>
              </Grid>
              <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                <Grid container className="px-5" spacing={2}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    {/* <div className="p-9 h-full"> */}
                      <TextValidator
                        className="mb-6 w-full"
                        variant="outlined"
                        label="First Name"
                        onChange={this.handleChange}
                        type="text"
                        name="first_name"
                        value={data.first_name}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextValidator
                        className="mb-6 w-full"
                        variant="outlined"
                        label="Last Name"
                        onChange={this.handleChange}
                        type="text"
                        name="last_name"
                        value={data.last_name}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextValidator
                        className="mb-4 w-full"
                        label="Phone Number"
                        variant="outlined"
                        onChange={this.handleChange}
                        name="phone_no"
                        type="text"
                        value={data.phone_no}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
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
                          "Email is not valid"
                        ]}/>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextValidator
                        className="mb-4 w-full"
                        label="Password"
                        variant="outlined"
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                        value={data.password}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextValidator
                        className="mb-4 w-full"
                        label="Confirm Password"
                        variant="outlined"
                        onChange={this.handleChange}
                        name="confirm_password"
                        type="password"
                        value={confirm_password}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12} className="mb-4">
                    <Button
                      variant="contained"
                      color="warning"
                      disabled={this.props.loggingIn}
                      type="submit"
                      className="capitalize font-medium"
                      style={{background:'#04956b', color:"#fff", width:"84%", padding:10, marginLeft:36, marginRight:36}}
                    >
                      Sign up
                      </Button>
                      {this.props.registering && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />)}
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12} className="mb-1" style={{textAlign:"center"}}>
                      <span className="mr-2 ml-5">Already a member?</span>
                      <Button
                        className="capitalize font-medium"
                        onClick={() =>
                          this.props.history.push("/signin")
                        }>
                        Sign in
                      </Button>
                    </Grid>
                </Grid>
              </ValidatorForm>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { registering } = state.registration;
  return { registering };
}

const actionCreators = {
  register: userActions.register
}

export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(SignUp))
);
