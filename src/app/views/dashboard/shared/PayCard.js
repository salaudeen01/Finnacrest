import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import { Grid, Card, Checkbox, FormControlLabel, Fab, Icon } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));


const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const PayCard = ({cards, handleChange, open, value, id}) => {

  // const [val, setVal] = React.useState('');
  const [check, setCheck] = React.useState(id? true : false);
  // const change = (event) => {
  //   setVal(event.target.value);
  // };

const classes = useStyles();
  const theme = useTheme();
        return (
            <Grid container spacing={3}>
                {!id && check &&
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={id}
                      onChange={handleChange}
                      name="id"
                    />}
                  label="Check box to add new card"
                />}
                <Grid item md={12}>
                <Card onClick={open} className="py-4 px-4 project-card">
                  <Grid container alignItems="center">
                    <Grid item md={6} xs={7}>
                      <div className="flex items-center">
                        <Fab
                          className="ml-4 mr-4 bg-primary box-shadow-none text-white"
                          size="small">
                          <Icon>fiber_new</Icon>
                        </Fab>
                        <span className="card__roject-name font-medium">
                          Use new card
                        </span>
                      </div>
                    </Grid>
                    <Grid item md={6} xs={4}>
                      <div className="text-muted">
                        Click to use new card
                      </div>
                    </Grid>
                  </Grid>
                </Card>
                </Grid>
                {cards && cards.map(card =>(
                <Grid item md={12}>
                  <Card className="py-2 px-4 project-card">
                    <Grid container alignItems="center">
                      <Grid item md={5} xs={5}>
                        <div className="flex items-center">
                          <Fab
                            className="ml-4 mr-4 bg-primary box-shadow-none text-white"
                            size="small">
                                <Icon>credit_card</Icon>
                          </Fab>
                          <span className="card__roject-name font-medium">
                            Use {card.bank}
                          </span>
                        </div>
                      </Grid>
                      <Grid item md={6} xs={6}>
                        <div className="text-muted">
                          {card.bin + "***" + card.last4}
                        </div>
                      </Grid>
                      <Grid item md={1} xs={1}>
                        <GreenRadio
                        checked={value == card.id}
                        onChange={handleChange}
                        value={card.id}
                        name="card_id"
                        inputProps={{ 'aria-label': card.id }}/>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>))}
            </Grid>
        )
}
export default PayCard