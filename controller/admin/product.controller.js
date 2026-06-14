const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatusHelper")
// [GET] admin/products
module.exports.product = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query)
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  let keyword = "";
  if (req.query.keyword) {
    keyword = req.query.keyword;
    const regex = new RegExp(keyword, "i");
    find.title = regex;
  }
  console.log("req", req);
  console.log(req.query.status);
  const products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sach san pham",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword,
  });
};
