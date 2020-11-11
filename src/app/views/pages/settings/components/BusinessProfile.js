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

const BusinessProfile = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState(props.profile);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <ValidatorForm onSubmit={props.handleSubmit} onError={(errors) => null}>
        {/* <CardHeader
          subheader='This information can be edited'
          title='Profile'
        />        */}

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
        {/* <CardHeader
          subheader='This information can be edited'
          title='Next Of Kin'
        /> */}
    </ValidatorForm>
    </Card>
  );
};

BusinessProfile.propTypes = {
  className: PropTypes.string,
};

export default BusinessProfile;
