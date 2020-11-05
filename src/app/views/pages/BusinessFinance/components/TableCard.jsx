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
class TableCard extends Component{
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
                  <TableCell className="px-0" colSpan={4}>
                  TRANSACTION ID
                  </TableCell>
                  <TableCell className="px-0" colSpan={4}>
                  AMOUNT REPAID
                  </TableCell>
                  <TableCell className="px-0" colSpan={4}>
                  DATE
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.details.map((det, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-0" colSpan={4} >
                    cub{det.id}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left" colSpan={4}>
                      {numberFormat(det.repayment_amount)}
                    </TableCell>
                    <TableCell className="px-0" colSpan={4}>
                      {dateFormat(det.trans_date, "mmmm dS, yyyy")}
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
