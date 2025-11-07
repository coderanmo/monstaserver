const { transporter } = require("../../config/mailConfig")
const { adminModel } = require("../../models/adminModels")

let adminOtp = new Map()

let adminLogin = async (req, res) => {
   let { adminEmail, adminPassword } = req.body
   console.log(req.body)
   let resObj
   let admin = await adminModel.findOne({ adminEmail, adminPassword })
   console.log(admin)
   if (admin) {
      resObj = {
         status: 1,
         data: admin
      }
      res.send(resObj)
   }
   else {
      resObj = {
         status: 0,
         msg: 'check email  & password'
      }
      res.send(resObj)
   }
}

let checkCookiesId = async (req, res) => {
   let { id } = req.params

   await adminModel.findOne({ _id: id })
      .then((resApi) => {
         obj = {
            status: 1,
            data: resApi
         }
         res.send(obj)
      })
      .catch((error) => {
         obj = {
            status: 0

         }
         res.send(obj)
      })
}

let adminChangePassword = async (req, res) => {
   let { adminPassword, newPassword, rePassword } = req.body
   let obj
   let checkPassword = await adminModel.findOne({ adminPassword })
   if (checkPassword) {
      if (newPassword == rePassword) {
         let ids=checkPassword._id
         console.log(ids)
         await adminModel.updateOne({_id:ids},
            { $set: { adminPassword: newPassword } }
         )
             .then((resApi) => {
               obj = {
                  status: 1,
                  msg: 'Successfully changed password'
               };
            })
            .catch((error) => {   
               let errorMsg = 'Error updating password';
               if (error.code == 11000) {
                  errorMsg = 'Password must be unique';
               } else if (error.errors?.adminPassword?.message) {
                  errorMsg = error.errors.adminPassword.message;
               }

               obj = {
                  status: 0,
                  msg: errorMsg
               };
            });
      }
      else {
         obj = {
            status: 0,
            msg: 'New Password & Re-Passowrd are not same'
         }
      }
   }
   else {
      obj = {
         status: 0,
         msg: 'old password Not exist'
      }
   }
   res.send(obj)
}

let adminOTPForgetPassword = async (req, res) => {
   let { adminEmail, adminPassword, readminPassword } = req.body
   let obj
   let checkEmail = await adminModel.findOne({ adminEmail })
   if (checkEmail) {
      if (adminPassword == readminPassword) {

      }
      let randomOtp = (Math.random() * 999999).toString().split('.')[0].slice(0, 4)
      adminOtp.set('ADMIN', randomOtp)
      const info = await transporter.sendMail({
         from: '"Maddison Foo Koch" <anmolyadav95200@gmail.com>',
         to: checkEmail.adminEmail,
         subject: "MONSTA ADMIN ",
         text: "OTP",
         html: `MONSTA Admin : ${randomOtp}</b>`,
      });

      obj = {
         status: 1,
         msg: 'send otp'
      }
   }
   else {
      console.log(checkEmail)
      obj = {
         status: 0,
         msg: 'please fill valid email'
      }
   }

   res.send(obj)
}

let adminForgetPassword = async (req, res) => {
   let { adminEmail, adminPassword, readminPassword, otp } = req.body

   let checkOtp = adminOtp('ADMIN')
   console.log(checkOtp)

   res.send('hello')
}

module.exports = { adminLogin, checkCookiesId, adminOTPForgetPassword, adminForgetPassword, adminChangePassword }