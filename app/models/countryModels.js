let mongoose=require('mongoose')

let countrySchema=new mongoose.Schema({
    categoryName:String,
    categoryStatus:{
      type:Boolean,
      default:true
    },
    categoryOrder:{
        type:Number,
        unique:true
    }
})

let countryModel=mongoose.model('country',countrySchema)
module.exports={countryModel}