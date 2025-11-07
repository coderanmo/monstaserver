const { transporter } = require("../../config/mailConfig")
const { contactModel } = require("../../models/contactModels")
const { userAuthModel } = require("../../models/userAuthModels")

let addContact = async (req, res) => {
    let { contactName, contactEmail, contactPhone, contactSubject, contactMessage } = req.body
    let insertObj = { contactName, contactEmail, contactPhone, contactSubject, contactMessage }
    let obj
    let checkEmail = await userAuthModel.findOne({ userEmail: contactEmail })
    if (checkEmail) {
        console.log(checkEmail.userEmail)
        await contactModel.insertOne(insertObj)
            .then(async (resApi) => {
                const info = await transporter.sendMail({
                    from: `"MONSTA NEW REQUEST" <youremail@gmail.com>`,
                    replyTo: checkEmail.userEmail,                   
                    to: "anmolyadav95200@gmail.com",                   
                    subject: "New Contact Request",
                    text:`New message from ${contactEmail}`,
                    html: `<p><b>New message from:</b> ${contactMessage}
                      <div>
                      </div>
                    </p>${contactEmail}</p>`,
                });
                obj = {
                    status: 1,
                    msg: 'request insert'
                }
            })
            .catch((error) => {
                let errorMsg
                if (error.errors) {
                    if (error.errors.contactName.message) {
                        errorMsg = error.errors.contactName.message
                    }
                    if (error.errors.contactEmail.message) {
                        errorMsg = error.errors.contactEmail.message
                    }
                    if (error.errors.contactPhone.message) {
                        errorMsg = error.errors.contactPhone.message
                    }
                    if (error.errors.contactSubject.message) {
                        errorMsg = error.errors.contactEmail.message
                    }
                    if (error.errors.contactMessage.message) {
                        errorMsg = error.errors.contactMessage.message
                    }
                }
                obj = {
                    status: 0,
                    msg: errorMsg
                }
            })
        res.send(obj)
    }
    else {
        obj = {
            status: 0,
            msg: 'Email is different from Login Mail'
        }
        res.send(obj)
    }
}

let viewContact = async (req, res) => {
   let obj
   await contactModel.find().skip(0).limit(10)
   .then((resApi)=>{
    obj={
        status:1,
        data:resApi
    }
   })
   .catch((error)=>{
    obj={
        status:0,
        msg:'no reqest'
    }
   })
   res.send(obj)
}


module.exports = { addContact, viewContact }