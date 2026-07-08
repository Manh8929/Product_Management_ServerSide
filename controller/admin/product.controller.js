const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatusHelper");
const searchHelper = require("../../helpers/searchHelper");
const paginationHelper = require("../../helpers/paginationHelper");
const systemConfig = require("../../config/system")
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
      req.flash('success', `Successfully deleted ${ids.length} products.`);
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
      req.flash('success', `Successfully changed position ${ids.length} products.`);

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
    req.flash('success', `Delete Successfully `);

    const referer = req.get("Referer") || "/admin/products";
    res.redirect(referer);
};


// [GET] admin/products/create
module.exports.createProduct = async (req, res) => {
  
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
  });
};
// [POST] admin/products/create
module.exports.createProductPost = async (req, res) => {
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)
  
  if(req.body.position === ""){
    const countProduct = await Product.countDocuments();
    req.body.position = countProduct + 1
    
  }else{
    req.body.position = parseInt(req.body.position)
  }
  console.log(req.body);
  const product = new Product(req.body)
  await product.save()
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};