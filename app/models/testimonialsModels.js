let mongoose=require('mongoose')

let testimonialsSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    testImage:{
        type:String
    },
    designation:{
        type:Number,
        required:[true,'designation is required']
    },
    rating:{
        type:Number,
        required:[true,'rating is required']
    },
    order:{
        type:Number,
        unique:true,
        required:[true,'Order is required']
    },
    testStatus:{
     type:Boolean,
     default:true
    },
    message:{
        type:String,
    }
})


let testimonialModel=mongoose.model('testimonial',testimonialsSchema)
module.exports={testimonialModel}