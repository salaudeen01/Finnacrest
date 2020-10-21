import React, { Component } from "react";
import {
  Card,
  Grid,
  Button,
  CircularProgress,
  Typography,
  Hidden
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
      <div
      className='signup flex justify-center w-full h-full-screen'
      style={{
        backgroundColor: '#0a131b',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}>
    <div className='p-4 flex w-full h-full-screen'>
    <Grid
      container
      className='p-2'
      spacing={3}
      justify='center'
      alignItems='center'>
      <Grid lg={8} md={8} sm={10} xs={10}>
        <Card className='' style={{ background: '#224459' }}>
          <Grid container className='p-2' spacing={3}>
            <Grid lg={4} md={4} sm={12} xs={12}>
              <Card className='signup-card '>
                <Grid
                  container
                  className='p-2 bg-light-gray'
                  justify='center'
                  alignItems='center'>
                  <div className='p-4 mt-10'>
                    <Grid
                      container
                      className='p-2 '
                      justify='center'
                      alignItems='center'>
                      <Grid lg={6} md={6} sm={6} xs={6}>
                        <img src='/assets/images/sesis.jpg' />
                      </Grid>
                    </Grid>
                  </div>
                  <Grid lg={12} md={12} sm={12} xs={12}>
                  <Typography variant="h6" className="text-center text-gray mt-5 mb-5">
                    Click the button below to complete your registration.
                  </Typography>
                  </Grid>
                </Grid>
                <Grid container className='bg-light-gray justify-center w-full'>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className='mb-1'
                  style={{ textAlign: 'center' }}>
                  <Button onClick={this.handleFormSubmit} variant="contained" color='warning' type='submit'
                 className='capitalize font-medium w-full mb-4' size="large" 
                 style={{ background: '#224459', color: '#fff', padding: 10}}>
                   Complete Registration</Button>
                  {this.props.loggingIn && (
                    <CircularProgress
                      size={24}
                      color='secondary'
                      className={classes.buttonProgress}
                    />)}
                </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid lg={8} md={8} sm={1} xs={1}>
            <Hidden xsDown smDown>
              <Grid
                container
                className='p-2 mt-8'
                justify='center'
                alignItems='center'>
              
                <Typography
                  variant='h4'
                  className='text-center text-white mt-10'
                  style={{ fontWeight: 'bold', width: '10' }}>
                  Welcome To <br />
                  SESIS <br /> CO-OPERATIVE SOCIETY
                </Typography>
              </Grid></Hidden>
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
