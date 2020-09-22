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
import dateFormat from 'dateformat';

class TableCard extends Component{
  constructor(props){
    super(props)
  }


  render(){
    return (
        <Card elevation={4} className="pt-5 mb-6">
          {/* <div className="card-title px-6 mb-3">Latest Transactions</div> */}
          <div className="overflow-auto">
            <Table className="product-table">
              <TableHead>
                <TableRow>
                  <TableCell className="px-" colSpan={3}>
                  ID
                  </TableCell>
                  <TableCell className="px-0" colSpan={4}>
                  AMOUNT
                  </TableCell>
                  <TableCell className="px-0" colSpan={3}>
                  TYPE
                  </TableCell>
                  <TableCell className="px-0" colSpan={4}>
                  DATE
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.transactions.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-0 capitalize" colSpan={3}>
                      {index+1}
                    </TableCell>
                    <TableCell className="px-0 capitalize" colSpan={4}>
                      {numberFormat(product.amount)}
                    </TableCell>
                    <TableCell className="px-0" colSpan={3} >
                      {product.transaction_type}
                    </TableCell>
                    <TableCell className="px-0" colSpan={4}>
                      {dateFormat(product.date_time, "mmmm dS, yyyy")}
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

export default TableCard;
