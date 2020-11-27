import React, { Component } from 'react';
import {
	Card,
	Grid,
	Button,
	CircularProgress,
	Typography, Hidden
} from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import { userActions } from '../../redux/actions/user.actions';
import { checkToken } from '../../config/config';

const styles = (theme) => ({
	wrapper: {
		position: 'relative',
	},

	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
});

class ForgotPassword extends Component {
	state = {
		data: { email: '' },
	};
	handleChange = (event) => {
		event.persist();
		this.setState({ data: { [event.target.name]: event.target.value } });
	};
	handleFormSubmit = () => {
		const { data } = this.state;
		if (data.email) {
			this.props.recoverpass(data);
		} else {
			swal(data.email);
		}
	};
	render() {
		let { data } = this.state;
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
		<Grid lg={11} md={11} sm={11} xs={11}>
		<Card className='' style={{ background: '#224459' }}>
			<Grid container className='p-2' spacing={3}>
			<Grid lg={4} md={4} sm={12} xs={12}>
			  <Card className='signup-card '>
				<Grid
				  container
				  className='p-2 bg-light-gray'
				  justify='center'
				  alignItems='center'
				>
				  <div className='p-4 mt-10'>
				  <Grid
					container
					className='p-2 '
					justify='center'
					alignItems='center'
				 	>
					<Grid lg={6} md={6} sm={6} xs={6}>
						{/* <img src='/assets/images/sesis.jpg' /> */}
					</Grid>
				  </Grid>
				  </div>
					<Grid lg={12} md={12} sm={12} xs={12}>
					  <Typography
						variant='h4'
						className='text-center text-gray'>
						Recover Password
					  </Typography>
					</Grid>
				</Grid>
				<Grid container className='bg-light-gray justify-center w-full'>
				<ValidatorForm
					ref='form'
					onSubmit={this.handleFormSubmit}>
					<Grid item lg={12} md={12} sm={12} xs={12} className='p-9 h-full position-relative'>
						{/* <div className='p-9 h-full position-relative'> */}
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
									className='capitalize font-medium w-full mb-4'
									style={{
										background: '#224459',
										color: '#fff',
										// width: '84%',
										padding: 10,
										// marginLeft: 36,
										// marginRight: 36,
									}}>
									Reset
								</Button>
								{this.props.loggingIn && (
									<CircularProgress
										size={24}
										className={classes.buttonProgress}
									/>
								)}
						    </Grid>
						{/* </div> */}
						<Grid
							item
							lg={12}
							md={12}
							sm={12}
							xs={12}
							className='mb-1'
							style={{ textAlign: 'center' }}>
							<span className='mr-2 ml-5'>Already have an account?</span>
							<Button
								className='capitalize font-medium'
								onClick={() =>
									this.props.history.push('/signin')
								}>
								Sign In
							</Button>
						</Grid>
					</Grid>
				</ValidatorForm>
				</Grid>
			  </Card>
			</Grid>


				<Grid lg={7} md={7} sm={6} xs={6}>
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
	recoverpass: userActions.recoverpass,
};

const mapStateToProps = (state) => {
	const { loggingIn } = state.authentication;
	return { loggingIn };
};
export default withStyles(styles, { withTheme: true })(
	withRouter(connect(mapStateToProps, actionCreators)(ForgotPassword))
);
