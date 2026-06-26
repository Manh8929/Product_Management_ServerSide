module.exports = (objPagination,query,countsProduct)=> {
  if(query.page){
    objPagination.currentPage = parseInt( query.page)
  }
  objPagination.skip = (objPagination.currentPage - 1)*objPagination.limitItem;
  const totalPage = Math.ceil(countsProduct/objPagination.limitItem)
  // console.log(totalPage);
  objPagination.totalPage = totalPage
  return objPagination;
}