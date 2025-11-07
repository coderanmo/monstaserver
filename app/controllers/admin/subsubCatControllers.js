const { categoryModel } = require("../../models/categoryModels")
const { subCategoryModel } = require("../../models/subCategoryModels")
const { subsubCategoryModel } = require("../../models/subsubCategoryModels")

let addSubSubCategory = async (req, res) => {
    let insertObj = req.body
    let obj
    if (req.file) {
        if (req.file.filename) {
            insertObj['subsubCategoryImage'] = req.file.filename
        }
    }
    await subsubCategoryModel.insertOne(insertObj)
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'insert data',
                resApi
            }
            res.send(obj)
        })
        .catch((error) => {
            let errorMsg
            if (error.code == 11000) {
                errorMsg = 'order no is already exist'
            }
            if (error.errors) {
                if (error.errors.subCategoryName) {
                    errorMsg = error.errors.subCategoryName.message
                }
                if (error.errors.subCategoryImage) {
                    errorMsg = error.errors.subCategoryImage.message
                }
                if (error.errors.subCategoryOrder) {
                    errorMsg = error.errors.subCategoryOrder.message
                }
            }

            obj = {
                status: 0,
                msg: 'no insert data',
                errorMsg
            }
            res.send(obj)
        })
}

let viewsubSubCategoryData=async (req,res)=>{
    let obj

    subsubCategoryModel.find().populate('parentCategory').populate('subCategory')
    .then((resApi)=>{
        obj={
            status:1,
            staticPath:process.env.STATICPATHSUBSUBCATEGORY,
            msg:'data view',
            data:resApi
        }
        res.send(obj)
    })
}

let deleteSubSubCategoryData=async (req,res)=>{

    let {id}=req.params
    let obj
    await subsubCategoryModel.deleteOne({_id:id})
    .then((resApi)=>{
        obj={
            status:1,
            msg:'delete query'
        }
    })
}

let updateSubSubCategoryRoutes= async (req,res)=>{
    let {id}=req.params
    let updateObj={...req.body}
    
    if(req.file)
    {
        if(req.file.filename)
        {
            updateObj['subsubCategoryImage']=req.file.filename
        }
    }

    await subsubCategoryModel.updateOne({_id:id},{$set:updateObj})
     .then((resApi) => {
            obj = {
                status: 1,
                msg: 'update data',
                resApi
            }
            res.send(obj)
        })
        .catch((error) => {
            let errorMsg
            if (error.code == 11000) {
                errorMsg = 'order no is already exist'
            }
            if (error.errors) {
                if (error.errors.subCategoryName) {
                    errorMsg = error.errors.subCategoryName.message
                }
                if (error.errors.subCategoryImage) {
                    errorMsg = error.errors.subCategoryImage.message
                }
                if (error.errors.subCategoryOrder) {
                    errorMsg = error.errors.subCategoryOrder.message
                }
            }

            obj = {
                status: 0,
                msg: 'no update data',
                errorMsg
            }
            res.send(obj)
        })

}

let muldelSubSubCategoryData=async (req,res)=>{
    let {ids}=req.body
     let obj
    await  subsubCategoryModel.deleteMany({
        _id:ids
    })
    .then((resApi)=>{
        obj={
            status:1,
            msg:"delete query"
        }
        res.send(obj)
    })
}



let parentCatgory = async (req, res) => {

    let obj
    await categoryModel.find({ categoryStatus: true }).select('categoryName')
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data view',
                data: resApi
            }
            res.send(obj)
        })

}

let subCategory = async (req, res) => {
    let { parentid } = req.params
    let obj
    await subCategoryModel.find({ subCategoryStatus: true, parentCategory: parentid }).select('subCategoryName')
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data view',
                data: resApi
            }
            res.send(obj)
        })

}
let singleDatasubsubCat=async (req,res)=>{
    let {id}=req.params
    let obj
    await subsubCategoryModel.findOne({_id:id})
    .then((resApi)=>{
      obj={
        status:1,
        data:resApi,
        staticPath:process.env.STATICPATHSUBSUBCATEGORY
      }
      res.send(obj)
    })
} 

module.exports = { addSubSubCategory, viewsubSubCategoryData ,deleteSubSubCategoryData,updateSubSubCategoryRoutes,muldelSubSubCategoryData, parentCatgory, subCategory,singleDatasubsubCat }