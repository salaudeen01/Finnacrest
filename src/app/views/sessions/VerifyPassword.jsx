import React, { Component } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  CircularProgress,
  Typography, Hidden
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
        // backgroundImage: `url(${"/assets/images/bg.png"})`,
        backgroundColor: '#0a131b',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        }}>
        <div className='p-4 flex w-full h-full-screen'>
	<Grid
		container
		className='p-2'
		spacing={3}
		justify='center'
		alignItems='center'>
		<Grid lg={11} md={11} sm={11} xs={11}>
			<Card className='' style={{ background: '#224459' }}>
				<Grid container className='p-2' spacing={3}>
					<Grid lg={4} md={4} sm={11} xs={11}>
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
									<Typography
										variant='h4'
										className='text-center text-gray'>
										Change Password
									</Typography>
								</Grid>
							</Grid>
							<Grid container className='bg-light-gray'>
								<ValidatorForm
									ref='form'
									onSubmit={this.handleFormSubmit}>
									<Grid item lg={12} md={12} sm={12} xs={12}>
										<div className='p-9 h-full position-relative'>
											<TextValidator
												className='mb-6 w-full'
												variant='outlined'
												label='Email'
												onChange={this.handleChange}
												type='email'
												name='email'
												value={data.email}
												validators={['required', 'isEmail']}
												errorMessages={[
													'this field is required',
													'email is not valid',
												]}
											/>
											<TextValidator
												className='mb-6 w-full'
												label='Password'
												variant='outlined'
												onChange={this.handleChange}
												name='password'
												type='password'
												value={data.password}
												validators={['required']}
												errorMessages={['this field is required']}
											/>
                      <TextValidator
												className='mb-6 w-full'
												label="Confirm Password"
												variant='outlined'
												onChange={this.handleChange}
												name="password_confirmation"
                        type="password"
												value={data.password_confirmation}
												validators={['required']}
												errorMessages={['this field is required']}
											/>
										
										<Grid
											item
											lg={12}
											md={12}
											sm={12}
											xs={12}
											>
											<Button
												variant='contained'
												color='warning'
												disabled={this.props.loggingIn}
												type='submit'
												className='capitalize font-medium w-full'
												style={{
													background: '#224459',
													color: '#fff',
													// width: '84%',
													padding: 10,
													// marginLeft: 36,
													// marginRight: 36,
												}}>
												Login
											</Button>
											{this.props.loggingIn && (
												<CircularProgress
													size={24}
													className={classes.buttonProgress}
												/>
											)}
										</Grid>
									</div>
										<Grid
											item
											lg={12}
											md={12}
											sm={12}
											xs={12}
											className='mb-1'
											style={{ textAlign: 'center' }}>
											<span className='mr-2 ml-5'>New Member?</span>
											<Button
												className='capitalize font-medium'
												onClick={() =>
													this.props.history.push('/signup')
												}>
												Sign up
											</Button>
										</Grid>
										<Grid
											item
											lg={12}
											md={12}
											sm={12}
											xs={12}
											className=' mb-10'
											style={{ textAlign: 'center' }}>
											<Button
												className='text-primary text-center'
												onClick={() =>
													this.props.history.push('/signin')
												}>
												Already have an account? Login
											</Button>
										</Grid>
									</Grid>
								</ValidatorForm>
							</Grid>
						</Card>
					</Grid>
					<Grid lg={7} md={7} sm={1} xs={1}>
					<Hidden xsDown smDown>
						<Grid
							container
							className='p-2 mt-8'
							justify='center'
							alignItems='center'>
							<Typography
								variant='h4'
								className='text-center text-white mt-25'
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
  verifypass: userActions.verifypass,
};

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}
export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(VerifyPassword))
);
