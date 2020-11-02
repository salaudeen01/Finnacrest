import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography, Grid, Box, ButtonGroup, Button} from '@material-ui/core';
import {numberFormat} from '../../../../config/config'
import { CancelOutlined } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function ModalForm(props) {
  const classes = useStyles();
  const {data, view, manage, repayment, status, cancelLoan} = props

  return (
    <div className="pt-7 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography variant="h6">{data.group_name} </Typography><br/>
          <Typography variant="p" color="text-secondary font-bold"> Loan Amount: {numberFormat(data.loan_amount)}</Typography><br/>
          <Typography variant="p" color="text-secondary font-bold"> Amount Repaid: {numberFormat(data.repaid)}</Typography><br/>
          <Typography variant="p" color="text-secondary font-bold"> Loan Status: <span style={{backgroundColor: "green", color:"#fff", padding:3, borderRadius:5}}> {data.loan_status == 0? "Pending":data.loan_status == 1?"Processing":data.loan_status == 2?"Approved": "Completed"}</span> </Typography>
        </Grid>
        <div className="py-4" />
        
        <Grid item lg={12} md={12} sm={12} xs={12}>
        {(data.loan_status == 0 || data.loan_status == 2) ?
        <ButtonGroup variant="outlined" color="primary" aria-label="text primary button group">
          <Button onClick={view}>View</Button>
          <Button onClick={cancelLoan}>Cancel</Button>          
        </ButtonGroup>:
        <ButtonGroup variant="outlined" color="primary" aria-label="text primary button group">
          <Button onClick={view}>View</Button>
          <Button onClick={repayment}>Repay Loan</Button>
        </ButtonGroup>
        } 
        {/* {data.loan_status == 1 &&} */}
        </Grid>
      </Grid>
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmitRepay}
        onError={errors => null}>
        <Card className="px-6 pt-2 pb-4">
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextValidator
                className="mb-4 w-full"
                label="Enter Repayment Amount"
                onChange={this.handleChangeRepay}
                type="text"
                value={repay_data.repayment_amount}
                name="repayment_amount"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextField
               className="mb-4 w-full"
                id="standard-select-currency"
                select
                label="Select Payment Method"
                value={repay_data.payment_method}
                name="payment_method"
                onChange={this.handleChangeRepay}
                helperText="Please select Payment Method"
              >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"Wallet"}> Wallet</MenuItem>
                  <MenuItem value={"Debit Card"}> Debit Card </MenuItem>
              </TextField>
              {this.props.savings &&
               <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
              {repay_data.payment_method === "Wallet" &&
              <Button className="uppercase"
                type="submit"
                size="large"
                variant="contained"
                style={{backgroundColor:"#04956a", color:"white"}}>
                   Repay Loan
              </Button>}
            </Grid>
            {repay_data.payment_method == "Debit Card" &&
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography>Choose Card</Typography>
              <PayCard cards={cards} value={repay_data.card_id} open={(e)=>this.setState({ repay_data:{...repay_data, card_id:""}})} handleChange={this.handleChangeRepay}/>
            </Grid>}
            {repay_data.payment_method == "Debit Card" && repay_data.card_id == "" &&
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Checkbox
                      name="save_card"
                      checked={repay_data.save_card}
                      onChange={this.handleChangeRepay}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                  /><Typography variant="caption">Would you like to save your card</Typography>
              </Grid>}
            {(repay_data.payment_method === "Debit Card"&& repay_data.card_id == "") &&
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <PayOption callback={this.callback} amount={repay_data.repayment_amount}/>
            </Grid>}
          </Grid>
        </Card>
      </ValidatorForm>
    </div>
  );
}

