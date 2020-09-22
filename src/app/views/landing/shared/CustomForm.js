import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Button,
  Icon,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

class CustomForm extends Component {
  state = {
    username: "",
    firstName: "",
    email: "",
    date: new Date(),
    creditCard: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "",
    agreement: ""
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  handleSubmit = event => {
    // console.log("submitted");
    // console.log(event);
  };

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = date => {
    // console.log(date);

    this.setState({ date });
  };

  render() {
    let {
      last_name,
      first_name,
      creditCard,
      mobile,
      password,
      confirmPassword,
      gender,
      date,
      email
    } = this.state;
    return (
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => null}
        >
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="First Name"
                onChange={this.handleChange}
                type="text"
                name="first_name"
                value={first_name}
                validators={[
                  "required",
                ]}
                errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="Last Name"
                onChange={this.handleChange}
                type="text"
                name="last_name"
                value={last_name}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="First Name"
                onChange={this.handleChange}
                type="text"
                name="first_name"
                value={first_name}
                validators={[
                  "required",
                ]}
                errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="Last Name"
                onChange={this.handleChange}
                type="text"
                name="last_name"
                value={last_name}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="Last Name"
                onChange={this.handleChange}
                type="text"
                name="last_name"
                value={last_name}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </Grid>
          </Grid>
          <Button color="primary" variant="contained" type="submit">
            <Icon>send</Icon>
            <span className="pl-2 capitalize">Submit</span>
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default CustomForm;
