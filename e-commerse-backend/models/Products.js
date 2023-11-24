const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
   {
    productname: String,
    price: String,
    weight: String,
    quantity: String,
    description: String,
    category: String,
    subcategory: String,
    size: String,
    releasedate: String,
    imagelink: String,
    productspec: String,
   },
   {
    collection :"products"
   });

   module.exports = mongoose.model("Products",productSchema)