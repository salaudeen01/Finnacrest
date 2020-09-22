import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState(props.profile);

  


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <ValidatorForm
        onSubmit={props.handleSubmit}
        onError={errors => null}>
        <CardHeader subheader="The information can be edited" title="Profile"/>
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextValidator
                fullWidth
                margin="dense"
                label="Enter First name"
                name="first_name"
                onChange={props.handleChange}
                required
                value={props.profile.first_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextValidator
                fullWidth
                margin="dense"
                label="Enter Last name"
                name="last_name"
                onChange={props.handleChange}
                required
                value={props.profile.last_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextValidator
                fullWidth
                margin="dense"
                label="Enter Email"
                name="email"
                onChange={props.handleChange}
                required
                value={props.profile.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextValidator
                fullWidth
                margin="dense"
                label="Enter Phone number"
                name="phone_no"
                max="11"
                onChange={props.handleChange}
                type="number"
                value={props.profile.phone_no}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextValidator
                fullWidth
                margin="dense"
                label="Enter Occupation"
                name="occupation"
                onChange={props.handleChange}
                type="text"
                value={props.profile.occupation}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextValidator
                fullWidth
                margin="dense"
                label="Enter Address"
                name="address"
                onChange={props.handleChange}
                type="text"
                value={props.profile.address}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        
        <Divider />
        <CardHeader subheader="The information can be edited" title="Next Of Kin"/>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextValidator
                fullWidth
                label="Enter Kin Last name"
                margin="dense"
                name="kin_last_name"
                onChange={props.handleChange}
                required
                value={props.profile.kin_last_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextValidator
                fullWidth
                margin="dense"
                label="Enter Kin First name"
                name="kin_first_name"
                onChange={props.handleChange}
                type="text"
                required
                value={props.profile.kin_first_name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                margin="dense"
                label="Enter Kin Phone number"
                name="kin_phone_no"
                max="11"
                onChange={props.handleChange}
                type="number"
                required
                value={props.profile.kin_phone_no}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextValidator
                fullWidth
                margin="dense"
                label="Enter Kin Email"
                name="kin_email"
                onChange={props.handleChange}
                type="email"
                value={props.profile.kin_email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextValidator
                fullWidth
                margin="dense"
                label="Enter Kin Relationship"
                name="relationship"
                onChange={props.handleChange}
                type="text"
                value={props.profile.relationship}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
        {props.savings &&
          <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        }
          <Button
            color="secondary"
            variant="contained"
            style={{color:"#fff"}}
            type="submit"
          >
            Update Profile
          </Button>
        </CardActions>
      </ValidatorForm>
    </Card>
  
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
