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
  Card
} from "@material-ui/core";

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
            <TableCell className="px-0" colSpan={3}>PAYMENT</TableCell>
            <TableCell className="px-0" colSpan={4}>TRANSACTION</TableCell>
            <TableCell className="px-0" colSpan={2}>DATE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.transactions
            .map((data, index) => (
              <TableRow key={index}>
                <TableCell className="px-0 capitalize" align="left" colSpan={4}>
                cub{data.id}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left" colSpan={4}>
                  {(data.wallet_category || data.transaction_category) == 1 ? "Regular Savings": 
                  ((data.wallet_category || data.transaction_category) == 2) ? "Target Savings":
                  ((data.wallet_category || data.transaction_category) == 3) ? "Save To Loan":
                  ((data.wallet_category || data.transaction_category) == 4) ? "Loan":
                  ((data.wallet_category || data.transaction_category) == 5) ? "Market Investment":
                  ((data.wallet_category || data.transaction_category) == 6) ? "Halal Financing":
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
                  {data.wallet_type || data.transaction_type}
                </TableCell>
                <TableCell className="px-0 capitalize" colSpan={3}>
                  {data.entry_date}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
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
      />
    </div>
    </Card>
  );
};

export default PaginationTable;
