let mongoose=require('mongoose')

let adminProfileSchema=mongoose.Schema({
    adminImage:{
        type:String
    },
    adminName:{
        type:String
    },
    adminEmail:{
        type:String,
        trim:true,
        lowercase:true,
    },
    adminPhone:{
        type:Number,
        minlength: [10, "Phone no must be at least 10 digits long"],
    }
})

let adminProfileModel=mongoose.model('adminprofile',adminProfileSchema)

module.exports={adminProfileModel}
