import React, { Component } from "react";
import { Card, Grid, Button, CircularProgress, Typography } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import swal from 'sweetalert'
import { userActions } from "../../redux/actions/user.actions";
import { checkToken } from '../../config/config'

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

class ForgotPassword extends Component {
  state = {
    data: {email:""}
  };
  handleChange = event => {
    event.persist();
    this.setState({data:
      {[event.target.name]: event.target.value}
    });
  };
  handleFormSubmit = () => {
    const {data} = this.state
    if (data.email) {
      this.props.recoverpass(data);
  }else{
    swal(data.email);
}
    
  };
  render() {
    let { data } = this.state;
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
          <Card className="signup-card" >
            <Grid container className="p-12 bg-light-gray" direction="column" justify="center" alignItems="center">
              <Grid lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h6" className="text-center text-gray mb-4">Recover Password</Typography>
              </Grid>
              <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {/* <div className="p-9 h-full position-relative"> */}
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
                        ]}/>
                  {/* </div> */}
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12} className="mb-4">
                    <Button
                      variant="contained"
                      color="warning"
                      disabled={this.props.loggingIn}
                      type="submit"
                      className="capitalize font-medium"
                      style={{background:'#04956b', color:"#fff", width:"100%"}}
                    >
                      Reset
                    </Button>
                    {this.props.loggingIn && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />)}
                  </Grid>
                  
                  <Grid item lg={12} md={12} sm={12} xs={12} className="mb-1" style={{textAlign:"center"}}>
                      <span className="mr-2 ml-5">Already have an account?</span>
                      <Button
                        className="capitalize font-medium"
                        onClick={() =>
                        this.props.history.push("/signin")
                        }>
                        Sign in
                      </Button>
                  </Grid>
              </ValidatorForm>
            </Grid>
          </Card>
      </div>
      </div>
    );
  }
}
const actionCreators = {
  recoverpass: userActions.recoverpass,
};

const mapStateToProps = state => {
  const { loggingIn } = state.authentication;
  return { loggingIn };
};
export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps,  actionCreators)(ForgotPassword))
);