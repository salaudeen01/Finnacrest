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

const NextOfKin = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState(props.profile);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <ValidatorForm onSubmit={props.handleSubmit} onError={(errors) => null}>
        {/* <CardHeader
          subheader='This information can be edited'
          title='Profile'
        /> */}
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

        {/* <CardActions>
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
        </CardActions> */}
      </ValidatorForm>
    </Card>
  );
};

NextOfKin.propTypes = {
  className: PropTypes.string,
};

export default NextOfKin;
