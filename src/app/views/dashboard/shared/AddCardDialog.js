import React from 'react'
import { Dialog, AppBar, Toolbar, IconButton, Typography, Card, Grid, Checkbox, Slide } from '@material-ui/core'
import PayOption from './PayOption'
import CloseIcon from "@material-ui/icons/Close";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { numberFormat } from 'app/config/config';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AddCardDialog = ({showSave, handleClose, add_card, callback}) => {
    return (
        // {/* Add card and pay to wallet Start */}
        <Dialog
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
          open={showSave}
          onClose={handleClose} >
          <AppBar style={{position: "relative"}} color='primary'>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="Close"
              >
                <CloseIcon className='text-white'/>
              </IconButton>
              <Typography variant="h6" className="text-white" style={{ flex: 1}}>
                Add New Card
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4">
            <ValidatorForm
              onError={errors => null}>
              <Grid container spacing={3}> 
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Card className="px-6 pt-2 pb-4">
                    <Typography variant="h6" gutterBottom>
                      Please enter your card details, A sum of 100 will be charged for card test
                    </Typography>
                  </Card>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <PayOption callback={callback} amount={add_card.amount}/>
                </Grid>
              </Grid>
            </ValidatorForm>
          </Card>
        </Dialog>
        // {/* Add card and pay to wallet end */}
    )
}

export default AddCardDialog
