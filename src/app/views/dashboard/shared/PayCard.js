import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import { Grid, Card, Checkbox, FormControlLabel } from '@material-ui/core';
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

  const [val, setVal] = React.useState('');
  const [check, setCheck] = React.useState(id? true : false);
  const change = (event) => {
    setVal(event.target.value);
  };

const classes = useStyles();
  const theme = useTheme();
        return (
            <Grid container spacing={3}>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                   {!id && check &&
                 <FormControlLabel
                    control={
                      <Checkbox
                        checked={id}
                        onChange={handleChange}
                        name="id"
                      />
                    }
                    label="Check box to add new card"
                  />}
                    <Card onClick={open} className={classes.root} elevation={5}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                            <Typography component="h6" variant="h6">
                                Add New Card
                            </Typography>
                            </CardContent>
                        </div>
                        <CardMedia
                            className={classes.cover}
                            image="/assets/images/visa.png"
                            title="Create New Card"
                        />
                    </Card>
                </Grid>
                {cards.map(card =>(
                    <Grid item lg={6} md={6} xs={12} sm={12}>
                        <GreenRadio
                        checked={value == card.id}
                        onChange={handleChange}
                        value={card.id}
                        name="card_id"
                        inputProps={{ 'aria-label': card.id }}/>
                        <Card className={classes.root} elevation={6}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                <Typography component="h6" variant="h6">
                                    {card.bank}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {card.bin + "*******" + card.last4}
                                </Typography>
                                </CardContent>
                            </div>
                            <CardMedia
                                className={classes.cover}
                                image="/assets/images/visa.png"
                                title={card.brand}
                            />
                        </Card>
                    </Grid>  
                )) 
                }
                
            </Grid>
        )
}
export default PayCard