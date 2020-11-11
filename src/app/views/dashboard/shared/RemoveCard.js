import React, {useState, useEffect} from 'react'
import { Grid, Card, Fab, Icon, Tooltip } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import swal from 'sweetalert';
import AddCardDialog from './AddCardDialog';

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
  // cards:{
  //   height:100,
  //   width:300,
  //   // backgroundImage:"/assets/images/visa.png"
  // }
}));

const RemoveCard = ({cards, open, removeCards, saveWallet, date_time}) => {
  
const removeCard =(id)=>{
    swal("Are you sure you want to remove this card?", {
      buttons: {
        cancel: "Cancel",
        
        confirm: {
          text: "Confirm",
          value: "catch"}
      },
    })
    .then((value) => {
      switch (value) {
        case "catch":
          removeCards(id)
          swal("Loading...", {
            buttons: false
          });
          break;
      
        default:
          swal("cancelled!");
      }
    });
}

const callback = (response) => {
    if (data.amount ) {
      setData(data=>({...data, paystack_id: response.reference }))
  }
}

useEffect(() => {
  if (data.paystack_id !== "") {
    saveWallet(data);
    setData(data=>({...data, paystack_id:""}))
  }
});

const [data, setData] = useState({
      date_time: date_time,
      amount: 100,
      payment_method: "Debit Card",
      paystack_id: "",
      save_card:true,
      card_id:"0",
      id:"",
})
const [show, setShow] = useState(false)

const handleShow = (id) => {
  setShow(true)
  setData(data=>({...data, id: id}))
}

const handleClose = () => {
  setShow(false)
}
const classes = useStyles();
  const theme = useTheme();
        return (
            <Grid container spacing={3}>
                <Grid item lg={12} md={12} xs={12} sm={12}>
                    <Card className={classes.root} elevation={2}>
                      <div className={classes.details}>
                          <CardContent className={classes.content}>
                          <Typography component="h6" variant="h6">
                              Add New Card
                          </Typography>
                          </CardContent>
                      </div>
                      <Tooltip title="Add New Card" aria-label="add">
                        <Fab onClick={open} className="ml-4 mt-5 bg-primary box-shadow-none text-white"
                            size="small" >
                          <Icon>add</Icon>
                        </Fab>
                      </Tooltip>
                    </Card>
                </Grid>
                {cards.map(card =>(
                  <Grid item lg={12} md={12} xs={12} sm={6}>
                      <Card className={classes.root} elevation={5} className='text-center' style={{background:'aqua'}}>
                            <Typography component="h6" variant="h6" className='text-right px-6 py-1'>
                                SESIS
                            </Typography>
                          <div className={classes.details}>
                            <CardContent className={classes.content}>                            
                            <Typography variant="subtitle1" color="textSecondary">
                                {card.bin + "************************" + card.last4}
                            </Typography>
                            <Typography component="h6" variant="h6">
                                {card.bank}
                            </Typography>
                            </CardContent>
                          </div>
                          <Tooltip title="Delete Card">
                            <Fab onClick={()=>removeCard(card.id)}
                              className="ml-25 mb-5 bg-error box-shadow-none text-white"
                              size="small">
                              <Icon>delete</Icon>
                            </Fab>
                          </Tooltip>
                          <Tooltip title="Replace Card">
                            <Fab onClick={()=>handleShow(card.id)}
                              className="ml-2 mb-5  bg-green box-shadow-none text-white text-right"
                              size="small">
                              <Icon>edit</Icon>
                            </Fab>
                          </Tooltip>
                      </Card>
                  </Grid>  
                ))}
              <AddCardDialog callback={callback} showSave={show} handleClose={handleClose} add_card={data}/>
            </Grid>
        )
}
export default RemoveCard