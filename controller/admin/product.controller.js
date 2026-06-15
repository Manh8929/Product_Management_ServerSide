const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatusHelper")
const searchHelper = require("../../helpers/searchHelper")
// [GET] admin/products
module.exports.product = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query)
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  const objSearch = searchHelper(req.query)
  if (objSearch.regex) {
    find.title = objSearch.regex;
  }
  //Pagination
  let objPagination = {
    currentPage: 1,
    limitItem: 4
  }
  if(req.query.page){
    objPagination.currentPage = parseInt( req.query.page)
  }
  objPagination.skip = (objPagination.currentPage - 1)*objPagination.limitItem;
  const countsProduct = await Product.countDocuments(find)
  const totalPage = Math.ceil(countsProduct/objPagination.limitItem)
  console.log(totalPage);
  objPagination.totalPage = totalPage

  const products = await Product.find(find).limit(objPagination.limitItem).skip(objPagination.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sach san pham",
    products: products,
    filterStatus: filterStatus,
    keyword: objSearch.keyword,
    pagination: objPagination
  });
};
