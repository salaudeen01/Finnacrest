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
            { (this.props.status == 0 || this.props.status == 2 || this.props.status == 0) ?
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
                {/* {this.props.tdetails.map((det, index) => ( */}
                  <TableRow key='index'>
                    <TableCell className="px-4" colSpan={6} >
                      {this.props.name}
                    </TableCell>
                    <TableCell className="px-4 capitalize" align="left" colSpan={6}>
                      {this.props.loan_amount}
                    </TableCell>
                    <TableCell className="px-4" colSpan={6}>
                     {this.props.guaranteed_amount}
                    </TableCell>
                    <TableCell className="px-4" colSpan={6}>
                     {this.props.status == 2 ?
                     <span style={{color:'red'}}>Declained</span>:
                     this.props.status == 1?
                    <span style={{color:'green'}}>Approved</span>:
                    <span style={{color:'orange'}}>Pending</span>
                    }
                    </TableCell>
                    <TableCell className="px-4" colSpan={6}>
                   { this.props.status == 1 && <> 
                    <Button variant="outlined" className="mb-4" size="small" type="button" onClick={this.props.view}>Guarantors</Button>
                   </>  }
                   { this.props.status == 0 && <> 
                    <Button variant="outlined" className="mb-4" size="small" type="button" onClick={this.props.view}>Guarantors</Button>
                    <Button variant="outlined" className="mb-4" size="small" type="button" onClick={this.props.approvalLoan}>Approve</Button>
                    <Button variant="outlined" className="mb-4" size="small" type="button" onClick={this.props.declineLoan}>Decline</Button>
                   </>  }
                  </TableCell>
                  </TableRow>
                {/* ))}  */}
              </TableBody>
            </Table>:
            <Typography variant="p" className="font-bold">You currently do not have any ongoing loan</Typography>
            }
          </div>
        </Card>
      );
    };
  }


export default LoanTable;
