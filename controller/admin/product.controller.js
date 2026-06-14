const Product = require("../../models/products.model");
// [GET] admin/products
module.exports.product = async (req, res) => {
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  let index; // Khai báo biến index

  if (req.query.status) {
    index = filterStatus.findIndex((item) => item.status === req.query.status);
  } else {
    index = filterStatus.findIndex((item) => item.status === "");
  }

  // Kiểm tra nếu index hợp lệ
  if (index !== -1) {
    filterStatus[index].class = "active";
  }

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
