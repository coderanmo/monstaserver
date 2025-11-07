let mongoose = require('mongoose')
let adminSchema = mongoose.Schema({
    adminEmail: {
        type:String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: true,
        
    },
    adminPassword: {
        unique:true,
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    }

})

let adminModel=mongoose.model('admin',adminSchema)

module.exports={adminModel}