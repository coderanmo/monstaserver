let mongoose=require('mongoose')

let contactSchema=mongoose.Schema({
    contactName:{
        type:String,
        require:[true,'user name is required']
    },
    contactEmail:{
        type:String,
        trim:true,
        lowercase:true
    },
    contactPhone:{
        type:Number,
        minlength: [10, "Phone no must be at least 10 digits long"]
    },
    contactSubject:{
        type:String,
        require:[true,'subject name is required']
    },
    contactMessage:{
        type:String,
        require:[true,'message is required']
    }
})

let contactModel=mongoose.model('contact',contactSchema)

module.exports={contactModel}
