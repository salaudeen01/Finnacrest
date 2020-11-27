
import React from "react";
import { numberFormat } from '../../../config/config'
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  TablePagination,
  Card,
  TableFooter,
  Typography
} from "@material-ui/core";
import Paginate from "./paginate";
import dateFormat from "dateformat"

const PaginationTable = (props) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
  };

  return (
    <Card elevation={3} className="pt-5 mb-6">
    <div className="overflow-auto">
      <Table className=" product-table">
        <TableHead>
          <TableRow>
            <TableCell className="px-6" colSpan={4}>I.D</TableCell>
            <TableCell className="px-0" colSpan={4}>TYPE</TableCell>
            <TableCell className="px-0" colSpan={4}>AMOUNT</TableCell>
            <TableCell className="px-0" colSpan={3}>PAYMENT METHOD</TableCell>
            <TableCell className="px-0" colSpan={4}>TRANSACTION</TableCell>
            <TableCell className="px-0" colSpan={2}>DATE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.transactions.length != 0 ?
          props.transactions.map((data, index) => (
              <TableRow  className='tableRow'
              hover
              key={data.id}>
                <TableCell className="px-0 capitalize" align="left" colSpan={4}>
                SES{data.id}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left" colSpan={4}>
                {(data.wallet_category || data.transaction_category) == 1 && (data.wallet_type == "debit" || data.transaction_type== "debit") ? "Savings Withdrawal": 
                 ((data.wallet_category || data.transaction_category) == 1 && (data.wallet_type == "credit"|| data.transaction_type == "credit"))? "Regular Savings": 
                 ((data.wallet_category || data.transaction_category) == 2 && (data.wallet_type == "debit" || data.transaction_type == "debit" )) ? "Target Withdrawal":
                 ((data.wallet_category || data.transaction_category) == 2 && (data.wallet_type == "credit"|| data.transaction_type== "credit")) ? "Target Savings":
                 ((data.wallet_category || data.transaction_category) == 3) ? "Shareholding":
                  ((data.wallet_category || data.transaction_category) == 4) ? "Loan Repayment":
                  ((data.wallet_category || data.transaction_category) == 8) ? "Business Finance":
                  ((data.wallet_category || data.transaction_category) == 9) ? "Products Financing":
                  ((data.wallet_category || data.transaction_category) == 10) ? "Disbursement":
                  ((data.wallet_category || data.transaction_category) == 7) ? 
                  ((data.wallet_type || data.transaction_type) == "credit")?"Wallet Funding":" Wallet Withdrawal": ""}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left" colSpan={4}>
                  {numberFormat(data.amount)}
                </TableCell>
                <TableCell className="px-0 capitalize" colSpan={3}>
                  {data.payment_method}
                </TableCell>
                <TableCell className="px-0 capitalize" colSpan={4}>
                  <span style={{color:(data.wallet_type || data.transaction_type) == "credit"?'green':"red"}}><b>{data.wallet_type || data.transaction_type}</b></span>
                </TableCell>
                <TableCell className="px-0 capitalize" colSpan={3}>
                  {dateFormat(data.entry_date, "mmmm dS, yyyy")}
                </TableCell>
              </TableRow>
            )):
              
              <Typography style={{textAlign:'center'}}>  No Record Found</Typography>
          }
        </TableBody>
        <TableFooter>
          <Paginate pagination={props.pagination}
              fetch_prev_page={props.fetch_prev_page} 
              fetch_next_page={props.fetch_next_page} 
              fetch_page={props.fetch_page}
          />
      </TableFooter>
      </Table>
      
            {/* <Paginate pagination={props.pagination} 
            fetch_prev_page={props.fetch_prev_page} 
            fetch_next_page={props.fetch_next_page} 
            fetch_page={props.fetch_page}/> */}

    </div>
    </Card>
  );
};

export default PaginationTable;
