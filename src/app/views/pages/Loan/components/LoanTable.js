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
class LoanTable extends Component{
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
                  <TableCell className="px-4" colSpan={6}>
                    NAME
                  </TableCell>
                  <TableCell className="px-4" colSpan={6}>
                    LOAN
                  </TableCell>
                  <TableCell className="px-4" colSpan={6}>
                    GUARANTEED AMOUNT
                  </TableCell>
                  {/* <TableCell className="px-4" colSpan={6}>
                    STATUS
                  </TableCell> */}
                  <TableCell className="px-4" colSpan={6}>
                    ACTION
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.tdetails.length == 0?
                <Typography variant="p" className="font-bold text-center">You do not have any loan Request</Typography>:
                this.props.tdetails.map((det, index) => (
                  <TableRow key='index'>
                    <TableCell className="px-4" colSpan={6} >
                    {(det.first_name +" "+ det.last_name)}
                    </TableCell>
                    <TableCell className="px-4 capitalize" align="left" colSpan={6}>
                      {numberFormat (det.loan_amount)}
                    </TableCell>
                    <TableCell className="px-4" colSpan={6}>
                     {numberFormat (det.guaranteed_amount)}
                    </TableCell>
                    {/* <TableCell className="px-4" colSpan={6}>
                     {det.status == 2 ?
                     <span style={{color:'red'}}>active</span>:
                     det.status == 0?
                    <span style={{color:'orange'}}>Pending</span>:""
                    }
                    </TableCell> */}
                    <TableCell className="px-4" colSpan={6}>
                   { (det.status == 1 || det.status == 2) ?
                    <Button variant="outlined" className="mb-4" size="small" type="button" onClick={()=>this.props.view(det.loan_id)}>Guarantors</Button>:
                    det.status == 0 && <> 
                    <Button variant="outlined" className="mb-4" size="small" type="button" onClick={()=>this.props.view(det.loan_id)}>Guarantors</Button>
                    <Button variant="outlined" className="mb-4" size="small" type="button" onClick={()=>this.props.approvalLoan(det.loan_group, det.loan_id)}>Approve</Button>
                    <Button variant="outlined" className="mb-4" size="small" type="button" onClick={()=>this.props.declineLoan(det.loan_group, det.loan_id)}>Decline</Button>
                   </>  }                   

                  </TableCell>
                  </TableRow>
                
                 ))
               }
              </TableBody>
            </Table>
          </div>
        </Card>
      );
    };
  }


export default LoanTable;
