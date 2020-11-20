
import React from "react";
import {
  Card,
  Icon,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { Component } from "react";
import { numberFormat } from '../../../../config/config'
import dateFormat from "dateformat"
class OrderDetails extends Component{
  constructor(props){
    super(props)
  }


  render(){
    return (
        <Card elevation={3} className="pt-5 mb-6">
          {/* <div className="card-title px-6 mb-3">Latest Transactions</div> */}
          <div className="overflow-auto">
            <Table className="product-table">
              <TableHead>
                <TableRow>
                  <TableCell className="px-4" colSpan={4}>
                  ITEMS
                  </TableCell>
                  <TableCell className="px-0" colSpan={4}>
                  ITEMS NAME
                  </TableCell>
                  <TableCell className="px-0" colSpan={2}>
                  QUANTITY
                  </TableCell>
                  <TableCell className="px-0" colSpan={4}>
                  ITEMS PRICE
                  </TableCell>
                  <TableCell className="px-0" colSpan={8}>
                  DESCRIPTIONS
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.transactions.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-0" colSpan={4} >
                    <img style={{width:100,height:100}} src={product.image}/>
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left" colSpan={4}>
                    {product.product_name}
                    </TableCell>
                    <TableCell className="px-4 capitalize" align="left" colSpan={2}>
                    <b>{product.quantity}</b>
                    </TableCell>
                    <TableCell className="px-0" colSpan={4}>
                    <b>{numberFormat(product.price)}</b>
                    </TableCell>  
                    <TableCell className="px-0" colSpan={8}>
                    {product.short_description}
                    </TableCell>                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      );
    };
  }


export default OrderDetails;
