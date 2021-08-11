
import React from 'react'
import {Button, IconButton} from "@material-ui/core"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
export default function Paginate(props) {

    const pages = page(props.pagination);
    console.log(props.pagination)
    return (
      <div >
      {props.pagination.total > 0 && <Button variant="contained" size="small" style={{color:"white", backgroundColor:'green'}}
      onClick={props.fetch_prev_page}><ArrowBackIosIcon/></Button>}
      {pages.map((page)=>(
          <Button component="span" size="small" 
          variant={props.pagination.current_page == page ? "contained":""}
           onClick={()=>props.fetch_page(page)}>{page}</Button>
      ))}
      {props.pagination.total > 21 &&<Button variant="contained" size="small" style={{color:"white", backgroundColor:'green'}} 
      onClick={props.fetch_next_page}><ArrowForwardIosIcon/></Button>}
      </div>
    )
}

function page(pagination){
    var pages =[]
    var pageIndex = 0;
    var i = 0;
    while(i < pagination.total){
      if(i % 21 == 0){
        pageIndex+=1
        pages.push(pageIndex)
      }else if(i == pagination.total){
        pageIndex+=1
        pages.push(pageIndex)
      }
      i++;
    }
    return pages;
}

