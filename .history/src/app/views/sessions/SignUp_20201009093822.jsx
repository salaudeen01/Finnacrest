import React, { Component } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  CircularProgress,
  Typography,Hidden
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import swal from "sweetalert";
import { userActions } from "../../redux/actions/user.actions";
import { withRouter } from "react-router-dom";

const styles = (theme) => ({
  wrapper: {
    position: "relative",
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

class SignUp extends Component {
  state = {
    data: {
      first_name: "",
      last_name: "",
      middle_name: "",
      password: "",
      email: "",
      phone_no: "",
    },
    confirm_password: "",
    username: "",
    email: "",
    password: "",
    agreement: "",
  };

  handleChange = (event) => {
    event.persist();
    const { data } = this.state;
    const { name, value } = event.target;
    if (name == "confirm_password") {
      this.setState({ confirm_password: value });
    } else {
      this.setState({
        data: {
          ...data,
          [name]: value,
        },
      });
    }
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { data, confirm_password } = this.state;
    if (
      data.first_name &&
      data.last_name &&
      data.email &&
      data.phone_no &&
      data.password
    ) {
      if (data.password == confirm_password) {
        this.props.register(data);
      } else {
        swal(`Password Not Match`);
      }
    } else {
      swal(`${"All fields are required"}`);
    }
  };
  render() {
    let { classes } = this.props;
    const { username, email, password, data, confirm_password } = this.state;
    return (
      <div
        className='signup flex justify-center w-full h-full-screen'
        style={{
<<<<<<< HEAD
          backgroundColor: "#0a131b",
=======
          // backgroundColor: "#0a131b",
          backgroundImage: `url(${"/assets/images/homebg.png"})`,
>>>>>>> 8f4be41b8cb3eb7c1874baa4cdfc24fae10c0692
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className='p-4 flex w-full h-full-screen'>
          <Grid
            container
            className='p-2'
            spacing={3}
            justify='center'
            alignItems='center'
          >
            <Grid lg={11} md={11} sm={11} xs={11}>
              <Card className='' style={{ background: "#224459" }}>
                <Grid container className='p-2' spacing={3}>
<<<<<<< HEAD
                  <Grid lg={4} md={4} sm={6} xs={6}>
=======
                  <Grid lg={4} md={4} sm={12} xs={12}>
>>>>>>> 8f4be41b8cb3eb7c1874baa4cdfc24fae10c0692
                    <Card className='signup-card '>
                      <Grid
                        container
                        className='p-2 bg-light-gray'
                        justify='center'
                        alignItems='center'
                      >
<<<<<<< HEAD
                        <div className='p-4 mt-6'>
=======
                        <div className='p-4 mt-4'>
>>>>>>> 8f4be41b8cb3eb7c1874baa4cdfc24fae10c0692
                          <Grid
                            container
                            className='p-2 '
                            justify='center'
                            alignItems='center'
                          >
                            <Grid lg={6} md={6} sm={6} xs={6}>
                              <img src='/assets/images/sesis.jpg' />
                            </Grid>
                          </Grid>
                        </div>
                        <Grid lg={12} md={12} sm={12} xs={12}>
                          <Typography
                            variant='h4'
                            className='text-center text-gray'
                          >
                            Sign Up
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container className='bg-light-gray'>
                        <ValidatorForm
                          ref='form'
                          onSubmit={this.handleFormSubmit}
                        >
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className='p-9 h-full position-relative'>
                              <TextValidator
<<<<<<< HEAD
                                className='mb-6 w-full'
=======
                                className='mb-3 w-full'
>>>>>>> 8f4be41b8cb3eb7c1874baa4cdfc24fae10c0692
                                variant='outlined'
                                label='First Name'
                                onChange={this.handleChange}
                                type='text'
                                name='first_name'
                                value={data.first_name}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                              />
                              <TextValidator
<<<<<<< HEAD
                                className='mb-6 w-full'
=======
                                className='mb-3 w-full'
>>>>>>> 8f4be41b8cb3eb7c1874baa4cdfc24fae10c0692
                                variant='outlined'
                                label='Last Name'
                                onChange={this.handleChange}
                                type='text'
                                name='last_name'
                                value={data.last_name}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                              />
                              <TextValidator
<<<<<<< HEAD
                                className='mb-4 w-full'
=======
                                className='mb-3 w-full'
>>>>>>> 8f4be41b8cb3eb7c1874baa4cdfc24fae10c0692
                                variant='outlined'
                                label='Phone Number'
                                onChange={this.handleChange}
                                type='type'
<<<<<<< HEAD
                                name='phone_number'
=======
                                name='phone_no'
>>>>>>> 8f4be41b8cb3eb7c1874baa4cdfc24fae10c0692
                                value={data.phone_no}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                              />
                              <TextValidator
<<<<<<< HEAD
                                className='mb-6 w-full'
=======
                                className='mb-3 w-full'
>>>>>>> 8f4be41b8cb3eb7c1874baa4cdfc24fae10c0692
                                variant='outlined'
                                label='Email'
                                onChange={this.handleChange}
                                type='email'
                                name='email'
                                value={data.email}
                                validators={["required", "isEmail"]}
                                errorMessages={[
                                  "this field is required",
                                  "Email is not valid",
                                ]}
                              />
                              <TextValidator
<<<<<<< HEAD
                                className='mb-4 w-full'
=======
                                className='mb-3 w-full'
>>>>>>> 8f4be41b8cb3eb7c1874baa4cdfc24fae10c0692
                                variant='outlined'
                                label='Password'
                                onChange={this.handleChange}
                                type='password'
                                name='password'
                                value={data.password}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                              />
                              <TextValidator
<<<<<<< HEAD
                                className='mb-4 w-full'
=======
                                className='mb-3 w-full'
>>>>>>> 8f4be41b8cb3eb7c1874baa4cdfc24fae10c0692
                                variant='outlined'
                                label='Confirm Password'
                                onChange={this.handleChange}
                                type='password'
                                name='confirm_password'
<<<<<<< HEAD
                                value={data.password}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                              />
                            </div>
=======
                                value={confirm_password}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                              />                            
>>>>>>> 8f4be41b8cb3eb7c1874baa4cdfc24fae10c0692
                            <Grid
                              item
                              lg={12}
                              md={12}
                              sm={12}
                              xs={12}
<<<<<<< HEAD
                              className='mb-4'
=======
                              className='mb-3'
>>>>>>> 8f4be41b8cb3eb7c1874baa4cdfc24fae10c0692
                            >
                              <Button
                                variant='contained'
                                color='warning'
                                disabled={this.props.loggingIn}
                                type='submit'
<<<<<<< HEAD
                                className='capitalize font-medium'
                                style={{
                                  background: "#04956b",
                                  color: "#fff",
                                  width: "84%",
                                  padding: 10,
                                  marginLeft: 36,
                                  marginRight: 36,
=======
                                className='capitalize font-medium w-full'
                                style={{
                                  background: "#04956b",
                                  color: "#fff",
                                  // width: "84%",
                                  padding: 10,
                                  // marginLeft: 36,
                                  // marginRight: 36,
>>>>>>> 8f4be41b8cb3eb7c1874baa4cdfc24fae10c0692
                                }}
                              >
                                Sign Up
                              </Button>
                              {this.props.registering && (
                                <CircularProgress
                                  size={24}
                                  className={classes.buttonProgress}
                                />
                              )}
                            </Grid>
<<<<<<< HEAD

=======
                            </div>
>>>>>>> 8f4be41b8cb3eb7c1874baa4cdfc24fae10c0692
                            <Grid
                              item
                              lg={12}
                              md={12}
                              sm={12}
                              xs={12}
                              className='mb-1'
                              style={{ textAlign: "center" }}
                            >
                              <span className='mr-2 ml-5'>
                                Already a member?
                              </span>
                              <Button
                                className='capitalize font-medium'
                                onClick={() =>
                                  this.props.history.push("/signin")
                                }
                              >
                                Sign In
                              </Button>
                            </Grid>
                          </Grid>
                        </ValidatorForm>
                      </Grid>
                    </Card>
                  </Grid>
<<<<<<< HEAD
                  <Grid lg={8} md={8} sm={6} xs={6}>
=======
                  <Grid lg={7} md={7} sm={6} xs={6}>
                  <Hidden xsDown smDown>
>>>>>>> 8f4be41b8cb3eb7c1874baa4cdfc24fae10c0692
                    <Grid
                      container
                      className='p-2 mt-8'
                      justify='center'
                      alignItems='center'
                    >
                      <Typography
                        variant='h4'
                        className='text-center text-white mt-25'
                        style={{ fontWeight: "bold", width: "10" }}
                      >
<<<<<<< HEAD
                        Welcome to <br />
                        SESIS <br /> Co-OPERATIVE SOCIETY
                      </Typography>
                    </Grid>
=======
                        Welcome To <br />
							          SESIS <br /> CO-OPERATIVE SOCIETY
                      </Typography>
                    </Grid></Hidden>
>>>>>>> 8f4be41b8cb3eb7c1874baa4cdfc24fae10c0692
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
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
  register: userActions.register,
};

export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapState, actionCreators)(SignUp))
);
