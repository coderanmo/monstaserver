let mongoose=require('mongoose')

let companyProfileSchema=mongoose.Schema({
    companyImage:{
        type:String
    },
    companyName:String,
    companyEmail:{
        type:String,
        trim:true,
        lowercase:true,
        required:[true,'email is required']   
    },
    companyNo:{
        type:Number,
        
    },
    companyAddress:String,
    googleMapUrl:String,
    linkedInUrl:String,
    instaUrl:String,  
})

let companyProfileModel=mongoose.model('companyprofile',companyProfileSchema)
module.exports={companyProfileModel}