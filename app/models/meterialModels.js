let mongoose=require('mongoose')

let materialSchema=new mongoose.Schema({
   materialName:{
         unique:true,
         required:[true,'material name is required'],
         type:String,
         min:2,
         max:20
   } ,
   materialStatus:{
      type:Boolean,
     default:true  
   },
   materialOrder:{
    type:Number,
    unique:true
   }

})

let materialModel=mongoose.model('material',materialSchema)
module.exports={materialModel}