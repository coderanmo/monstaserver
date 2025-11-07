let mongoose=require('mongoose')

let sliderSchema=mongoose.Schema({
    sliderTitle:String,
    sliderImage:{
        type:String,
        required:[true,'image is required']
    } ,
    sliderStatus:{
     type:Boolean,
     default:true
    },
    sliderOrder:{
        type:Number,
        unique:true,
        require:[true,'order no is required'],
        
    }
})

let sliderModel=mongoose.model('slider',sliderSchema)

module.exports={sliderModel}

