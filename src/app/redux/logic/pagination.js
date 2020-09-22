export function paginate(pagination){
    var pages =[]
    var pageIndex = 0;
    var i = 0;
    while(i < pagination.total){
      if(i % 10 == 0){
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

