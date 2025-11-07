const { categoryModel } = require("../../models/categoryModels")
const { colorModel } = require("../../models/colorModels")
const { companyProfileModel } = require("../../models/companyProfileModels")
const { countryModel } = require("../../models/countryModels")
const { faqModel } = require("../../models/faqModels")
const { materialModel } = require("../../models/meterialModels")
const { productModel } = require("../../models/productModels")
const { sliderModel } = require("../../models/sliderModels")

let viewSlider = async (req, res) => {

    let obj
    await sliderModel.find({ sliderStatus: true })
        .then((resApi) => {
            obj = {
                status: 1,
                staticPath: process.env.STATICPATHSLIDER,
                msg: 'data view',
                data: resApi
            }
            res.send(obj)
        })
}


let viewComapnyProfle = async (req, res) => {
    let obj
    await companyProfileModel.findOne()
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data view',
                staticPath: process.env.STATICPATHCOMPANYPROFILE,
                data: resApi,
            }
            res.send(obj)
        })
}

let viewHomeCategory = async (req, res) => {
    let obj
    await categoryModel.find({ categoryStatus: true })
        .then((resApi) => {
            obj = {
                status: 1,
                data: resApi
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no data'
            }
        })
    res.send(obj)
}

let homeProduct = async (req, res) => {
    let { catid } = req.params
    let obj
    await productModel.find({ parentCategory: catid, productStatus: true })
        .then((resApi) => {
            obj = {
                status: 1,
                staticPath: process.env.STATICPATHPRODUCT,
                data: resApi
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no data'
            }
        })
    res.send(obj)
}

let   categoriesSingleProduct = async (req, res) => {
    let {id} = req.params
    
    let obj
    await productModel.find({_id:id, productStatus: true })
        .then((resApi) => {
            obj = {
                status: 1,
                staticPath: process.env.STATICPATHPRODUCT,
                data: resApi[0]
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no data'
            }
        })
    res.send(obj)
}

let homeFaq = async (req, res) => {
    let obj

    await faqModel.find({ faqStatus: true })
        .then((resApi) => {
            obj = {
                status: 1,
                data: resApi
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no data view'
            }
        })
    res.send(obj)
}

let bestSelling = async (req, res) => {
    let obj
    await productModel.find({ productStatus: true, bestSelling: true })
        .then((resApi) => {
            obj = {
                status: 1,
                staticPath: process.env.STATICPATHPRODUCT,
                data: resApi
            }

        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no data'
            }

        })
    res.send(obj)

}

let homeCountry = async (req, res) => {
    let obj
    await countryModel.find({ categoryStatus: true })
        .then((resApi) => {
            obj = {
                status: 1,
                data: resApi
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no data'
            }
        })
    res.send(obj)
}

let categoriesMaterial = async (req, res) => {
    let obj
    await materialModel.find().select('materialName')
        .then((resApi) => {
            obj = {
                status: 1,
                data: resApi
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no data'
            }
        })
    res.send(obj)
}
let categoriesColor = async (req, res) => {
    let obj
    await colorModel.find().select('colorName')
        .then((resApi) => {
            obj = {
                status: 1,
                data: resApi
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no data'
            }
        })
    res.send(obj)
}

let categoriesApi = async (req, res) => {
    let obj

    await categoryModel.find().select('categoryName')
        .then((resApi) => {
            obj = {
                status: 1,
                data: resApi
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no data'
            }
        })
    res.send(obj)

}

let categoriesProduct = async (req, res) => {
    let {category}=req.query
    console.log(category)
    let filter = { productStatus: true };
    if (category && category !== "all") filter.parentCategory = category;
    console.log(filter)
    let obj
    await productModel.find(filter)
        .then((resApi) => {
            obj = {
                status: 1,
                staticPath: process.env.STATICPATHPRODUCT,
                data: resApi
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no data'
            }
        })
    res.send(obj)
}

module.exports = { viewSlider, viewComapnyProfle, viewHomeCategory, homeProduct, homeFaq, bestSelling, homeCountry, categoriesMaterial, categoriesColor, categoriesApi, categoriesProduct,categoriesSingleProduct }
