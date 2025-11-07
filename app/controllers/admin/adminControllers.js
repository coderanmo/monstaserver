const { adminModel } = require("../../models/adminModels")

let checkAdminData=async (req,res)=>{
    let {adminEmail,adminPassword}=req.body

    adminModel.insertOne({})
}