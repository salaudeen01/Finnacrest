import React from "react";
import {
  Card,
  Icon,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography
} from "@material-ui/core";
import { Component } from "react";
import { numberFormat } from '../../../../config/config'
import dateFormat from "dateformat"
class ComLoanTable extends Component{
  constructor(props){
    super(props)
  }


  render(){
    return (
        <Card elevation={3} className="pt-5 mb-6">
          {/* <div className="card-title px-6 mb-3">Latest Transactions</div> */}
          <div className="overflow-auto">
            {/* {(this.props.status == 3 || this.props.status == 1 || this.props.status == 9) ? */}
              <Table className="product-table">
              <TableHead>
                <TableRow>
                  <TableCell className="px-4" colSpan={6}>
                    NAME
                  </TableCell>
                  <TableCell className="px-4" colSpan={6}>
                    LOAN
                  </TableCell>
                  <TableCell className="px-4" colSpan={6}>
                    GUARANTEED AMOUNT
                  </TableCell>
                  <TableCell className="px-4" colSpan={6}>
                    STATUS
                  </TableCell>
                  <TableCell className="px-4" colSpan={6}>
                    ACTION
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.tdetails.map((det, index) => (
                 det.status == 1 || det.status == 9 ?
                  <TableRow key='index'>
                    <TableCell className="px-4" colSpan={6} >
                    {(det.first_name +" "+ det.last_name)}
                    </TableCell>
                    <TableCell className="px-4 capitalize" align="left" colSpan={6}>
                      {det.loan_amount}
                    </TableCell>
                    <TableCell className="px-4" colSpan={6}>
                     {det.guaranteed_amount}
                    </TableCell>
                    <TableCell className="px-4" colSpan={6}>
                     {det.status == 9 ?
                     <span style={{color:'orange'}}>Cancelled</span>:
                     det.status == 1?
                    <span style={{color:'green'}}>Approved</span>:
                   <span/> }
                    </TableCell>
                    <TableCell className="px-4" colSpan={6}>
                   
                    <Button variant="outlined" className="mb-4" size="small" type="button" onClick={()=>this.props.view(det.loan_id)}>Guarantors</Button>
                   
                  </TableCell>
                  </TableRow>: 
                <Typography variant="body1">No Completed Loan Guaranted</Typography> 
                )) 
              } 
              </TableBody>
            </Table>
            {/* // :
            // <Typography variant="p" className="font-bold">You currently do not have any ongoing loan</Typography>
            // } */}
          </div>
        </Card>
      );
    };
  }


export default ComLoanTable;
