let mongoose=require('mongoose')

let subCategorySchema=({
    subCategoryName:{
        type:String,
        required:[true,'name is required']
    },
    subCategoryImage:{
        type:String,
        required:[true,'image is required']
    },
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    subCategoryStatus:{
        type:Boolean,
        default:true
    },
    subCategoryOrder:{
        type:Number,
        unique:true,
        required:[true,'order  is required']
    }
})

let subCategoryModel=mongoose.model('subcategory',subCategorySchema)
module.exports={subCategoryModel}