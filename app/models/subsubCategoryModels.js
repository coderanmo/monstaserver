let mongoose=require('mongoose')

let subsubCategorySchema=mongoose.Schema({
    subsubCategoryName:{
        type:String,
        required:[true,'name is required']
    },
    subsubCategoryImage:{
      type:String,
      required:[true,'image is required']
    },
    parentCategory:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'category'
    },
    subCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subcategory'  

    },
    subsubCategoryStatus:{
        type:Boolean,
        default:true
    },
    subsubCategoryOrder:{
        type:Number,
        unique:true,
        required:[true,'order is required']
    }
})

subsubCategoryModel=mongoose.model('subsubcategory',subsubCategorySchema)

module.exports={subsubCategoryModel}