let mongoose=require('mongoose')

let categorySchema=new mongoose.Schema({
    categoryName:{
        type:String
    },
    categoryImage:{
        type:String,
        required:[true,'image is required']
    },
    categoryStatus:{
        type:Boolean,
        default:true
    },
    categoryOrder:{
        type:Number,
        unique:true,
        required:[true,'order is required']
    }
})

let categoryModel=mongoose.model('category',categorySchema)

module.exports={categoryModel}