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
  console.log("req", req);
  console.log(req.query.status);
  const products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sach san pham",
    products: products,
    filterStatus: filterStatus,
    keyword: objSearch.keyword,
  });
};
