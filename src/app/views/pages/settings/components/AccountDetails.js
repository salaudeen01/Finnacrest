import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Checkbox,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
}));

const AccountDetails = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState(props.profile);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <ValidatorForm onSubmit={props.handleSubmit} onError={(errors) => null}>
        <CardHeader
          subheader='This information can be edited'
          title='Profile'
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                margin='dense'
                label='Enter First name'
                name='first_name'
                onChange={props.handleChange}
                required
                value={props.profile.first_name}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                margin='dense'
                label='Enter Last name'
                name='last_name'
                onChange={props.handleChange}
                required
                value={props.profile.last_name}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                margin='dense'
                label='Enter Email'
                name='email'
                onChange={props.handleChange}
                required
                value={props.profile.email}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                margin='dense'
                label='Enter Phone number'
                name='phone_no'
                max='11'
                onChange={props.handleChange}
                type='number'
                value={props.profile.phone_no}
                variant='outlined'
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                margin='dense'
                label='Enter Address'
                name='address'
                onChange={props.handleChange}
                type='text'
                value={props.profile.address}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                margin='dense'
                label='State of Origin'
                name='state_of_origin'
                onChange={props.handleChange}
                type='text'
                value={props.profile.state_of_origin}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                margin='dense'
                label='Local Govt. Area (LGA)'
                name='local_govt'
                onChange={props.handleChange}
                type='text'
                value={props.profile.local_govt}
                variant='outlined'
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>
                  <h6>Marital Status</h6>
                </FormLabel>
               <RadioGroup
                  aria-label={props.profile.marital_status}
                  name='marital_status'
                  value={props.profile.marital_status}
                  onChange={props.handleChange}
                  required
               >                 
                 <FormControlLabel
                      value='married'
                      control={<Radio />}
                      label='Married'
                 />
                 <FormControlLabel
                      value='single'
                      control={<Radio />}
                      label='Single'
                 />
                 <FormControlLabel
                      value='widow'
                      control={<Radio />}
                      label='Widow'
                 />
               </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>

        {/* <Divider /> */}
        {/* <CardHeader
          subheader='Please choose your marital status'
          title='Marital Status'
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Checkbox
                checked={props.profile.marital_status}
                onChange={props.handleChange}
                name='marital_status'
                color='primary'
              />
              Married
              <Checkbox
                checked={props.profile.marital_status}
                onChange={props.handleChange}
                name='marital_status'
                color='primary'
              />
              Single
              <Checkbox
                checked={props.profile.marital_status}
                onChange={props.handleChange}
                name='marital_status'
                color='primary'
              />
              Widowed
            </Grid>
          </Grid>
        </CardContent> */}

        <Divider />
        <CardHeader
          subheader='Please fill-in as appropriate'
          title='Business Information'
        />

        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                margin='dense'
                label='Occupation'
                name='occupation'
                onChange={props.handleChange}
                required
                type='text'
                value={props.profile.occupation}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                margin='dense'
                label='Business Address'
                name='business_address'
                onChange={props.handleChange}
                required
                type='text'
                value={props.profile.business_address}
                variant='outlined'
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>
                  <h6>Business Type</h6>
                </FormLabel>
                <RadioGroup
                  aria-label='business_type'
                  name='business_type'
                  value={props.profile.business_type}
                  onChange={props.handleChange}
                  required
                >
                    <FormControlLabel
                      value='sole'
                      control={<Radio />}
                      label='Sole Proprietorship'
                    />
                    <FormControlLabel
                      value='partnership'
                      control={<Radio />}
                      label='Partnership'
                    />
                    <FormControlLabel
                      value='ltd'
                      control={<Radio />}
                      label='Limited Liability Company (LTD)'
                    />
                    <FormControlLabel
                      value='plc'
                      control={<Radio />}
                      label='Public Limited Company (PLC)'
                    />
                  <div style={{display:"flex"}}>
                    <FormControlLabel
                      value='other'
                      control={<Radio />}
                      label='Other:'
                      style={{}}
                    />
                      <TextValidator
                        margin='dense'
                        label='Please Specify'
                        name='business_type_others'
                        onChange={props.handleChange}
                        type='text'
                        value={props.profile.business_type_others}
                        variant='outlined'
                      />
                  </div>
                </RadioGroup>
              </FormControl>
            </Grid>

            
            {/* <Grid item md={6} xs={12}>
              <Checkbox
                checked={props.profile.business}
                onChange={props.handleChange}
                name='business'
                color='primary'
              />
              Sole Proprietorship
            </Grid>
            <Grid item md={6} xs={12}>
              <Checkbox
                checked={props.profile.sole}
                onChange={props.handleChange}
                name='sole'
                color='primary'
              />
              Partnership
            </Grid>
            <Grid item md={6} xs={12}>
              <Checkbox
                checked={props.profile.partnership}
                onChange={props.handleChange}
                name='partnership'
                color='primary'
              />
              Limited Liability Company
            </Grid>
            <Grid item md={6} xs={12}>
              <Checkbox
                checked={props.profile.ltd}
                onChange={props.handleChange}
                name='ltd'
                color='primary'
              />
              Public Limited Company
            </Grid>
            <Grid item md={6} xs={12}>
              <Checkbox
                checked={props.profile.plc}
                onChange={props.handleChange}
                name='plc'
                color='primary'
              />
              Other:
            </Grid> */}           

            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                margin='dense'
                label="Employer's Name"
                name='employers_name'
                onChange={props.handleChange}
                required
                type='text'
                value={props.profile.employers_name}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                margin='dense'
                label="Employer's Phone Number"
                name='employers_phone_no'
                onChange={props.handleChange}
                required
                type='text'
                value={props.profile.employers_phone_no}
                variant='outlined'
              />
            </Grid>
          </Grid>
        </CardContent>

        <Divider />
        <CardHeader
          subheader='This information can be edited'
          title='Next Of Kin'
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                label="Enter Kin's Last Name"
                margin='dense'
                name='kin_last_name'
                onChange={props.handleChange}
                required
                value={props.profile.kin_last_name}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                margin='dense'
                label="Enter Kin's First Name"
                name='kin_first_name'
                onChange={props.handleChange}
                type='text'
                required
                value={props.profile.kin_first_name}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                margin='dense'
                label="Enter Kin's Phone Number"
                name='kin_phone_no'
                max='11'
                onChange={props.handleChange}
                type='number'
                required
                value={props.profile.kin_phone_no}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                margin='dense'
                label="Enter Kin's Email"
                name='kin_email'
                onChange={props.handleChange}
                type='email'
                value={props.profile.kin_email}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                margin='dense'
                label="Enter Kin's Relationship"
                name='relationship'
                onChange={props.handleChange}
                type='text'
                value={props.profile.relationship}
                variant='outlined'
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          {props.savings && (
            <img
              img
              alt=''
              src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
            />
          )}
          <Button
            color='secondary'
            variant='contained'
            style={{ color: "#fff" }}
            type='submit'
          >
            Update Profile
          </Button>
        </CardActions>
      </ValidatorForm>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
};

export default AccountDetails;
