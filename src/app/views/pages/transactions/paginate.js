import React from 'react'
import {Button, IconButton} from "@material-ui/core"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function Paginate(props) {

    const pages = page(props.pagination);
    return (
      <div >
      {props.pagination.current_page > 0 && <IconButton variant="contained" component="span" 
      onClick={props.fetch_prev_page}><ArrowBackIosIcon/></IconButton>}
      {pages.map((page)=>(
          <Button component="span" size="small" 
          variant={props.pagination.current_page == page ? "contained":""}
           onClick={()=>props.fetch_page(page)}>{page}</Button>
      ))}
      {props.pagination.current_page > 20 &&<IconButton variant="contained" component="span" color="primary" 
      onClick={props.fetch_next_page}><ArrowForwardIosIcon/></IconButton>}
      </div>
    )
}


function page(pagination){
    var pages =[]
    var pageIndex = 0;
    var i = 0;
    while(i < pagination.current_page){
      if(i % 10 == 0){
        pageIndex+=1
        pages.push(pageIndex)
      }else if(i == pagination.current_page){
        pageIndex+=1
        pages.push(pageIndex)
      }
      i++;
    }
    return pages;
}

