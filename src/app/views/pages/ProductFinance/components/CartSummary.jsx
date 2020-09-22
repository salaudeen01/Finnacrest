import React from "react";
import { numberFormat } from '../../../../config/config'
import {
  Grid,
  List,
  CardContent,
  Typography,
  Card,
  ListItem,
  Divider,
  Button
} from "@material-ui/core";

const CartSummary = (props) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
  };

  return (
    <Card elevation={3} className="mb-6">
    {/* <CardContent> */}
        <List>
            <ListItem className="pt-5">
                <Grid item lg={6} md={6} sm={6} xs={6}>
                   <b><h6>Order Summary</h6></b> 
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6} style={{textAlign:'right'}}>
                    <b>
                        1 item
                    </b>
                </Grid>
            </ListItem>
            <Divider/>
            <ListItem className="pt-5">
                <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography>Subtotal:</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6} style={{textAlign:'right'}}>
                    <b>
                        ₦42,000
                    </b>
                </Grid>
            </ListItem>
            <Divider/>
            <ListItem className="pt-5">
                <Grid item lg={6} md={6} sm={6} xs={6}>
                <Typography>Delivery Charges</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6} style={{textAlign:'right'}}>
                    <b>
                        ₦42,000
                    </b>
                </Grid>
            </ListItem>
            <Divider/>
            <ListItem className="pt-5">
                <Grid item lg={12} md={12} sm={12} xs={12}>
                <Button className="uppercase"
                        size="medium"
                        fullWidth 
                        variant="contained"
                        style={{backgroundColor:"#33B27B", color:"white", borderBottomRightRadius:10, 
                        borderBottomLeftRadius:10,borderTopRightRadius:10,borderTopLeftRadius:10}}>
                   Checkout
                   </Button>
                </Grid>
            </ListItem>
        </List>
    {/* </CardContent> */}
    </Card>
  );
};

export default CartSummary;
