const { companyProfileModel } = require("../../models/companyProfileModels")


let viewCompanyProfile=async (req,res)=>{
    let obj
   await companyProfileModel.findOne()
   .then((resApi)=>{
     obj={
        status:1,
        msg:'data view',
        staticPath:process.env.STATICPATHCOMPANYPROFILE,
        data:resApi,
     }
     res.send(obj)
   })
}

let updateProfile = async (req, res) => {
    let {id} = req.params
    let updateObj={...req.body}
    if (req.file) {
        if (req.file.filename) {
            updateObj['companyImage'] = req.file.filename
        }
    }
    
    
    await companyProfileModel.updateOne({_id:id},{$set:updateObj})
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'update data'
            }
        })
        .catch((error) => {
            let errorMsg
            if (error.errors) {
                if (error.errors.companyEmail) {
                    errorMsg = error.errors.companyEmail.message
                }
            }
            obj ={
                status: 0,
                msg: 'no update data',
                errorMsg,
                error
            }
        })
        res.send(obj)
}

let singleData=async (req,res)=>{
    let {id}=req.params
    let obj
   await companyProfileModel.findOne({_id:id})
   .then((resApi)=>{
     obj={
        status:1,
        msg:'data view',
        staticPath:process.env.STATICPATHCOMPANYPROFILE,
        data:resApi,
     }
   })
   .catch((error)=>{
    obj={
        status:0,
        msg:'no data'
    }
   })
   res.send(obj)
}
module.exports = { viewCompanyProfile,updateProfile,singleData }
