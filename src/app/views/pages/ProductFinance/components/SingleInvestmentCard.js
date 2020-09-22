import React from 'react';
import { Typography, Divider} from '@material-ui/core';

export default function SingleInvestmentcard(props) {

  const {news, investment, } = props
  return (
    <>
     <Divider variant="middle" />
    <Typography variant="h6" className="font-bold text-green">Product Description</Typography>
    {investment.map((newz, index) => (
      <div key={index} className="pt-4 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      
      <Typography variant="subtitle" className="">
        {newz.description} 
         
        </Typography>
      
    </div>
    ))}

    </>
  );
}
