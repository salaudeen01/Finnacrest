import React from 'react';
import { Typography, Divider} from '@material-ui/core';

export default function SingleInvestmentcard(props) {

  const {news, investment, } = props
  return (
    <>
     <Divider variant="middle" />
    <Typography variant="h6" className="font-bold text-green">Investment News</Typography>
    {news.map((newz, index) => (
      <div key={index} className="pt-4 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      <Typography variant="subtitle" className="text-small font-bold" style={{fontStyle:"italic"}}>Posted Date( {newz.posted_date} )</Typography><br />
      <Typography variant="subtitle" className="">{newz.news} </Typography>
      
    </div>
    ))}
    </>
  );
}
