import React, { Component, useEffect, useState } from "react";
import { numberFormat } from '../../../../config/config';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import swal from 'sweetalert';
import TableContainer from '@material-ui/core/TableContainer';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  FormControl,
  Table,
  NativeSelect,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  ButtonGroup,
  Button,
  Card,
  Paper
} from "@material-ui/core";

class CartTable extends Component{
  constructor(props){
    super(props)
  const { products} = this.props;
    this.state = {
      products:products,
      page:0,
      rowsPerPage:5

    }
    this.handleDelete =this.handleDelete.bind(this)
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [page, setPage] = React.useState(0);
  
  }

handleChangePage = (event, newPage) => {
    this.setState({page:newPage});
  };
  
 handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage:event.target.value});
  };

 handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.props.deleteFromCart(id);
        console.log(id)
        swal("Loading...",{   
          buttons:false
        });
      }
    });
    }
     
render(){
  const { products, deleteCart, loading} = this.props;
  const { product } =this.state
  return (
    <Card elevation={3} className="pt-5 mb-6">
    <div className="overflow-auto">
    <TableContainer component={Paper}>
      {/* <Table className=" product-table"> */}
      <Table style={{minWidth:680}} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell className="px-4" colSpan={4}>Items</TableCell>
          <TableCell className="px-4" colSpan={6}>Items Name</TableCell>
            <TableCell className="px-4" colSpan={5}>Quantity</TableCell>
            <TableCell className="px-4" colSpan={4}>Item Price</TableCell>
            <TableCell className="px-4" colSpan={4}>Action</TableCell>
          </TableRow>
        </TableHead>
          {loading?
            <div style={{marginTop:15, textAlign:"center", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
                <img
                    img
                    alt=""
                    className="loader"
                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                  />
            </div>: 
        <TableBody>
          {this.props.products.length != [] ?
                this.props.products.map(dat => (
          // {this.props.products.map(dat => ( 
              <TableRow key={dat.id}>
                <TableCell className="px-1 capitalize" align="left" colSpan={4}>
                <img style={{width:100,height:50}} src={dat.image}/>
                </TableCell>
                <TableCell className="px-4 capitalize" align="left" component="th" scope="row" colSpan={6}>
                 {dat.product_name}
                </TableCell>
                <TableCell className="px-4 capitalize" align="left" colSpan={5}>
                <ButtonGroup size="small" aria-label="small outlined button group">
                  <Button onClick={()=>this.props.DecrementItem(dat.cart_id)}>-</Button>
                  <Button>
                    {dat.cart_quantity}
                  </Button>
                  <Button onClick={()=>this.props.incrementItem(dat.cart_id)}>+</Button>
                </ButtonGroup>
                </TableCell>
                <TableCell className="px-4 capitalize" align="left" colSpan={4}>
                  {numberFormat(dat.cart_price)}
                </TableCell>
                <TableCell className="px-4 capitalize" align="left" colSpan={4}>
                <Button style={{backgroundColor:'#ef1616', color:'#ffffff'}}
                 startIcon={<DeleteIcon/>}
                 onClick={()=> this.handleDelete(dat.cart_id)}
                 >
                  Remove
                </Button>
                </TableCell>
              </TableRow>
            )):
            <TableRow>
                <TableCell colSpan={4}></TableCell>
                <TableCell colSpan={4}></TableCell>
                <TableCell className="px-4 capitalize" align="left" colSpan={8}>
                  <b>Your cart is empty.</b>  
                </TableCell>                
                </TableRow>
          }
        </TableBody>
         }
      </Table>
    </TableContainer>
      {/* <TablePagination
        className="px-4"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page"
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page"
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
    </div>
    </Card>
  )
};
};
const actionCreators = {
  timeOut: userActions.timeOut,
  logout: userActions.logout,
  deleteFromCart: userActions.deleteFromCart,
  updateUserCart: userActions.updateUserCart,
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(CartTable))
);
