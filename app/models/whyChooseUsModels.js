let mongoose=require('mongoose')

let whyChooseSchema=mongoose.Schema({
  whyTitle:{
    type:String,
    required:[true,'title is required']
  },
  whyImage:{
    type:String,
    required:[true,'image is required']
  },
  whyStatus:{
    type:Boolean,
    default:true  
  },
  whyOrder:{
    unique:true,
    type:Number,
    required:[true,'order is required']
  },
  whyMessage:{
    type:String
  }
})

let whyChooseModel=mongoose.model('whychooseus',whyChooseSchema)
module.exports={whyChooseModel}
