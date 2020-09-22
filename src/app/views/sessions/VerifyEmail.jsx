import React, { Component } from "react";
import {
  Card,
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

class VerifyEmail extends Component {
  constructor(props){
    super(props)
    const id = this.props.match.params.id;
    this.state = {
        code: id,
      };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  
  handleFormSubmit = event => {
    const { code } = this.state;
    this.props.verifyemail(code);
  };
  render() {
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
            <Grid container className="p-5 bg-light-gray" direction="column" justify="center" alignItems="center">
              <Grid lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h6" className="text-center text-gray mt-5 mb-5">Click the button below to complete your registration.</Typography>
              </Grid>
              <Grid lg={12} md={12} sm={12} xs={12} >
                <Button onClick={this.handleFormSubmit} variant="contained" style={{background:'#04956b'}} className="mt-5 text-white" size="large">Complete Registration</Button>
                {this.props.loggingIn && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />)}
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
      </div>
    );
  }
}

const actionCreators = {
  verifyemail: userActions.verifyemail,
};

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}
export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(VerifyEmail))
);
