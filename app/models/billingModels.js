let mongoose=require('mongoose')

let billingSchema=mongoose.Schema({
    user:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'userauth'
    },
    
    billingName:{
        type:String,
        require:[true,'please fill biiling name ']
    },
    billingEmail:{
        type:String,
        unique:true,
        required:[true,'please fill email']
    },
    billinhNumber:{
        type:Number,
        minLength:10,
        required:[true,'please fill phone number ']
    },
    billingAddress:{
        type:String,
        required:[true,'please fill address']
    },
    billingCountry:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'country'
    },
    billingState:{
       type:String,
       required:[true,'please fill state name']
    },
    billingCity:{
        type:String,
        require:[true,'please fill cinty ame']
    }
})

let billingModel=mongoose.model('billing',billingSchema)

module.exports={billingModel}