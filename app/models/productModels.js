let mongoose = require('mongoose')

let productSchema = mongoose.Schema({
    productImage: {
        type: String,
        required: [true, 'Product image is required']
    },
    backImage: {
        type: String,
        required: [true,'Back image is required']
    },
    galleryImage: {
        type: [String],
        required: [true,'gallery image is required']
    },
    productName: {
        type: String,
        required: [true,'product name is required']
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    subsubCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subsubcategory'
    },
    productColor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'color'
        }
    ],
    productMaterial: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'material'
        }
    ],
    productType: {
        type: String,
        enum: ['Featured', 'New Arrivals', 'OnSale']
    },
    bestSelling: Boolean,
    topRated: Boolean,
    upSell: Boolean,
    actualPrice: Number,
    salePrice: Number,
    totalStocks: Number,
    productDescip: String,
    productStatus:{
        type:Boolean,
        default:true
    },
    productOrder: {
        type: Number,
        unique: true,
        required: [true, 'order no is required']
    }
})

let productModel = mongoose.model('product', productSchema)

module.exports = { productModel }