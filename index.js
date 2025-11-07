let express = require('express')
let mongoose = require('mongoose')

require('dotenv').config()
let app = express()
let cors = require('cors')
const { adminRouter } = require('./app/routes/admin/adminRoutes')
const { adminModel } = require('./app/models/adminModels')
const { adminProfileModel } = require('./app/models/adminProfileModels')
const { webRouter } = require('./app/routes/web/webRoutes')
const { companyProfileModel } = require('./app/models/companyProfileModels')
app.use(cors())
app.use(express.json())

app.use('/web',webRouter)


app.use('/admin', adminRouter)
app.use('/upload/category', express.static('upload/category'))
app.use('/upload/subcategory', express.static('upload/subcategory'))
app.use('/upload/subsubcategory', express.static('upload/subsubcategory'))
app.use('/upload/product', express.static('upload/product'))
app.use('/upload/testimonials', express.static('upload/testimonials'))
app.use('/upload/whychooseus', express.static('upload/whychooseus'))
app.use('/upload/slider', express.static('upload/slider'))
app.use('/upload/companyprofile', express.static('upload/companyprofile'))

mongoose.connect(`mongodb+srv://anmolriya693_db_user:puiBbGVLCSrPjFUk@cluster0.vb6tjrb.mongodb.net/${process.env.DBNAME}`)
    .then(async (resApi) => {

        let checkAdmin = await adminModel.find()

        if(checkAdmin.length==0)
        {
            await adminModel.insertOne({
              adminEmail:process.env.ADMINEMAIL,
              adminPassword: process.env.ADMINPASSWORD 
            })
        }

        let adminProfileCheck=await adminProfileModel.find()
        if(adminProfileCheck.length==0)
        {
            await adminProfileModel.insertOne({
                 adminName:'anmol',
                adminEmail:process.env.ADMINEMAIL,
            })
        }
        let comapnyProfileCheck=await companyProfileModel.find()
        if(comapnyProfileCheck.length==0)
        {
            await companyProfileModel.insertOne({
                companyName:'monsta',
                companyEmail:process.env.ADMINEMAIL,
            })
        }


        app.listen(process.env.PORT, () => {
            console.log('server start')
        })
    })