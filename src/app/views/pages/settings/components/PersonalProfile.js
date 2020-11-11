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

const PersonalProfile = (props) => {
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

      </ValidatorForm>
    </Card>
  );
};

PersonalProfile.propTypes = {
  className: PropTypes.string,
};

export default PersonalProfile;
