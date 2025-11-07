const { adminProfileModel } = require("../../models/adminProfileModels")

let getAdminProfileData=async (req,res)=>{
    let obj
    await adminProfileModel.findOne()
    .then((resApi)=>{
     obj={
        status:1,
        staticPath:process.env.STATICPATHCOMPANYPROFILE,
        data:resApi,
     }
     res.send(obj)
    })
}
let getAdminProfileSingle=async (req,res)=>{
    let {id}=req.params
    let obj
    await adminProfileModel.findOne({_id:id})
    .then((resApi)=>{
     obj={
        status:1,
        staticPath:process.env.STATICPATHCOMPANYPROFILE,
        data:resApi,
     }
     res.send(obj)
    })
}
module.exports={getAdminProfileData,getAdminProfileSingle}