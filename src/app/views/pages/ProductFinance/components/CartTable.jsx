import React from "react";
import { numberFormat } from '../../../../config/config';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import swal from 'sweetalert';
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

const CartTable = (props) => {
  const { products, deleteCart, loading, ...rest} = props;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
  };

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        props.deleteFromCart(id);
        console.log(id)
        swal("Loading...",{   
          buttons:false
        });
      }
    });
    }

  return (
    <Card elevation={3} className="pt-5 mb-6">
    <div className="overflow-auto">
      <Table className=" product-table">
        <TableHead>
          <TableRow>
          <TableCell className="px-6" colSpan={3}>Items</TableCell>
          <TableCell className="px-6" colSpan={4}>Items Name</TableCell>
            <TableCell className="px-0" colSpan={3}>Quantity</TableCell>
            <TableCell className="px-0" colSpan={3}>Item Price</TableCell>
            <TableCell className="px-0" colSpan={3}>Action</TableCell>
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
          {products.map(dat => ( 
              <TableRow key={dat.id}>
                <TableCell className="px-0 capitalize" align="left" colSpan={3}>
                <img style={{width:100,height:50}} src={dat.image}/>
                </TableCell>
                <TableCell className="px-0 capitalize" align="left" colSpan={4}>
                 {dat.product_name}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left" colSpan={3}>
                <ButtonGroup size="small" aria-label="small outlined button group">
                  <Button>-</Button>
                  <Button>
                    {dat.cart_quantity}
                  </Button>
                  <Button>+</Button>
                </ButtonGroup>
                </TableCell>
                <TableCell className="px-0 capitalize" align="left" colSpan={3}>
                  {numberFormat(dat.cart_price)}
                </TableCell>
                <TableCell className="px-0 capitalize" colSpan={3}>
                <Button style={{backgroundColor:'#ef1616', color:'#ffffff'}}
                 startIcon={<DeleteIcon/>}
                 onClick={()=> handleDelete(dat.cart_id)}
                 >
                  Remove
                </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
         }
      </Table>

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
  );
};

const actionCreators = {
  timeOut: userActions.timeOut,
  logout: userActions.logout,
  deleteFromCart: userActions.deleteFromCart,
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(CartTable))
);
