const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatusHelper");
const searchHelper = require("../../helpers/searchHelper");
const paginationHelper = require("../../helpers/paginationHelper");
// [GET] admin/products
module.exports.index = async (req, res) => {
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
    .sort({position: "desc"})
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

// [PATCH] admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });
  
  req.flash('success', 'Status Change Successful!');

  // res.redirect("/admin/products")
  const referer = req.get("Referer") || "/admin/products"; // Đặt URL mặc định
  res.redirect(referer);
};
// [PATCH] admin/products/change-multi
module.exports.changeMultiStatus = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash('success', `${ids.length} Status Change Successful!`);
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash('success', `${ids.length} Status Change Successful!`);
      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: ids } }, { 
        deleted: true,
        deletedAt: new Date(),
      });
      break;
    case "change-position":
      console.log(ids);
      for (const item of ids) {
        let[id , position] = item.split("-")
        position = parseInt(position)
        await Product.updateOne({ _id: id }, { 
          position: position
         });
      }

      break;
    default:
      break;
  }
  const referer = req.get("Referer") || "/admin/products"; 
  res.redirect(referer);
};
      

// [DELETE] admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    // await Product.deleteOne({ _id: id });
    await Product.updateOne({ _id: id },{
      deleted: true,
      deletedAt: new Date()
    });

    const referer = req.get("Referer") || "/admin/products";
    res.redirect(referer);
};
