let mongoose=require('mongoose')

let faqSchema=new mongoose.Schema({
     faqQuestion:{
        required:[true,'Question is mandatory'],
        type:String,
        minLength:10,
        maxLength:100,
        unique:true
     },
     faqAnswer:{
        type:String,
        minLength:5,
        maxLength:150,
        
     },
     faqStatus:{
      type:Boolean,
      default:true
     },
     faqOrder:{
      type:Number,
      unique:true
     }
})

faqModel=mongoose.model('faq',faqSchema)
module.exports={faqModel}