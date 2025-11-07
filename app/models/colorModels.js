let mongoose=require('mongoose')

let colorSchema=new mongoose.Schema({
    colorName:{
        required:[true,'color name is required'],
        type:String,
        min:2,
        max:20,
        unique:true
    },
    colorCode:{
        type:String,
        unique:true
    },
    colorStatus:{
       type:Boolean,
       default:true
    },
    colorOrder:{
        type:Number,
        unique:true
    }
})

let colorModel=mongoose.model('color',colorSchema)

module.exports={colorModel}
