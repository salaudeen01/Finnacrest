import React from "react";
import {
  Card,
  Icon,
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { Component } from "react";
import { numberFormat } from '../../../../config/config'
import dateFormat from 'dateformat';

class OrderDetails extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
        <Card elevation={4} className="pt-5 mb-6">
          {/* <div className="card-title px-6 mb-3">Latest Transactions</div> */}
          <div className="overflow-auto">
          {/* <TableContainer component={Paper}> */}
      {/* <Table className=" product-table"> */}
      <Table className="product-table">
        {/* <TableHead>
          <TableRow>
          <TableCell className="px-4" colSpan={4}>Items</TableCell>
          <TableCell className="px-4" colSpan={4}>Items Name</TableCell>
            <TableCell className="px-4" colSpan={5}>Quantity</TableCell>
            <TableCell className="px-4" colSpan={4}>Item Price</TableCell>
            <TableCell className="px-4" colSpan={4}>Action</TableCell>
          </TableRow>
        </TableHead>           */}
        <TableBody>
        {this.props.transactions.map((product, index) => (
          // {this.props.products.map(dat => ( 
              <TableRow key={product.id}>
                <TableCell className="px-1 capitalize" align="left" colSpan={4}>
                <img style={{width:200,height:100}} src={product.image}/>
                </TableCell>
                <TableCell className="px-4 capitalize" align="left" component="th" scope="row" colSpan={6}>
                 {product.product_name}
                </TableCell>
                <TableCell className="px-4 capitalize" align="left" colSpan={7}>
                  <b>{numberFormat(product.price)}</b>
                </TableCell>
                <TableCell className="px-4 capitalize" align="left" component="th" scope="row" colSpan={8}>
                 {product.short_description}
                </TableCell>
                {/* <TableCell className="px-4 capitalize" align="left" component="th" scope="row" colSpan={4}>
                 {product.product_name}
                </TableCell> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    {/* </TableContainer> */}
     </div>
        </Card>
      );
    };
  }

export default OrderDetails;
