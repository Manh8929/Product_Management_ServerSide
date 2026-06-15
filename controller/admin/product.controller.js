const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatusHelper");
const searchHelper = require("../../helpers/searchHelper");
const paginationHelper = require("../../helpers/paginationHelper");
// [GET] admin/products
module.exports.product = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  const objSearch = searchHelper(req.query);
  if (objSearch.regex) {
    find.title = objSearch.regex;
  }
  //Pagination
  const countsProduct = await Product.countDocuments(find);
  let objPagination = paginationHelper(
    {
      currentPage: 1,
      limitItem: 4,
    },
    req.query,
    countsProduct,
  );

  const products = await Product.find(find)
    .limit(objPagination.limitItem)
    .skip(objPagination.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sach san pham",
    products: products,
    filterStatus: filterStatus,
    keyword: objSearch.keyword,
    pagination: objPagination,
  });
};
