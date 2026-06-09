const Product = require("../../models/products.model")

module.exports.index = async(req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false
  })
  const newProduct = products.map(item =>{
    item.newPrice = (item.price * (100 - item.discountPercentage)/100).toFixed(0)
    return item;
  })
  console.log("product",newProduct);
  res.render("client/pages/products/index.pug",{
    pageTitle : "Danh  sách sản phẩm",
    products : newProduct
  });
}