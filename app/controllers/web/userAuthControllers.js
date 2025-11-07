const { transporter } = require("../../config/mailConfig")
const bcrypt = require('bcrypt');
const { userAuthModel } = require("../../models/userAuthModels");
let jwt=require('jsonwebtoken')

let saltRounds = 10;
let userOtp = new Map()
let sendOtp = async (req, res) => {

   let { userEmail, userPhone } = req.body
   console.log(userEmail)
   let obj
   let checkData = await userAuthModel.findOne({ userEmail })
   if (checkData) {
      obj = {
         status: 0,
         msg: 'this email or phone no already exist'
      }
      res.send(obj)
   }
   else {
      let randomOtp = Number((Math.random() * 999999).toString().split('.')[0].slice(0, 4))
      userOtp.set('myOTP', randomOtp)
      let info = await transporter.sendMail({
         from: '"user mail" <anmolyadav95200@gmail.com>',
         to: userEmail,
         subject: "MONSTA",
         text: "MONSTA OTP",
         html: `<b>OTP ${randomOtp}</b>`,
      })

      obj = {
         status: 1,
         msg: 'send otp'
      }
      res.send(obj)
   }
}

let createUser = async (req, res) => {
   let { userName, userEmail, userPhone, userPassword, otp } = req.body
   let obj

   let myOtp = userOtp.get('myOTP')

   if (myOtp == otp) {
      let hash = bcrypt.hashSync(userPassword, saltRounds);
      let insertObj = { userName, userEmail, userPhone, userPassword: hash, otp }
      await userAuthModel.insertOne(insertObj)
         .then((resApi) => {
            obj = {
               status: 1,
               msg: 'successfull register',
               resApi
            }
            res.send(obj)
         })
   }
   else {
      obj = {
         status: 0,
         msg: 'please fill correct otp'
      }
      res.send(obj)
   }

}

let loginUser = async (req, res) => {
   let { userEmail, userPassword } = req.body

   let obj
   let checkEmail = await userAuthModel.findOne({ userEmail })
    
   if (checkEmail) {
      let encryptPass = checkEmail.userPassword
      console.log(encryptPass)
      let checkPass = bcrypt.compareSync(userPassword,encryptPass)
      
      // create token 
      let token = jwt.sign({ id: checkEmail._id},process.env.TOKENKEY);


      if (checkPass) {
         obj = {
            status: 1,
            msg: 'valid password',
            data:checkEmail,
            token
         }
      }
      else {
         obj = {
            status: 0,
            msg: 'Invalid password'
         }
      }
      res.send(obj)
   }
   else {
      obj = {
         status: 0,
         msg: 'Email inavalid'
      }
      res.send(obj)
   }
}

let viewUser= async (req,res)=>{
   let obj
    await userAuthModel.find()
   .then((resApi)=>{
      obj={
         status:1,
         msg:'data view',
         data:resApi
      }
      res.send(obj)
   })
   .catch((error)=>{
      obj={
         status:0,
         msg:'no data view'
      }
      res.send(obj)
   })
}

let changePassword=async (req,res)=>{
   let {id,userPassword,newPassword,rePassword}=req.body
   let obj
   
   let checkEmail=await userAuthModel.find({_id:id})
   console.log(checkEmail)
   let dbPass = checkEmail[0].userPassword
   console.log(dbPass)
   let checkOldPass =bcrypt.compareSync(userPassword,dbPass)
   if(checkOldPass)
   {
        if(newPassword==rePassword)
         {
            let hash = bcrypt.hashSync(newPassword, saltRounds)

            await userAuthModel.updateOne({_id:id},{
               $set:{
                  userPassword:hash
               }
            })
            .then((resApi)=>{
               obj={
                  status:1,
                  msg:'succesfully change password'
               }
            })
         } 
         else{
            obj={
               status:0,
               msg:'new password & confirm password are not same'
            }
         }
   }
   else{
      obj={
         status:0,
         msg:'please fill correct old password'
      }
   }
   res.send(obj)
}

let userChangeProfile=async (req,res)=>{
   let {id}=req.body
   let {userGender,userName,userPhone,userAddress}=req.body
   console.log(userGender)
   await userAuthModel.updateOne({_id:id},{$set:{
       userGender:userGender,
       userName:userName,
       userPhone:userPhone,
       userAddress:userAddress
   }})
   .then((resApi)=>{
      obj={
         status:1,
         msg:'update profile'
      }
   })
   .catch((error)=>{
      obj={
         status:0,
         msg:'fill userName or userPhone'
      }
   })
   res.send(obj)
}

let  viewProfile=async (req,res)=>{
   let {id}=req.body
   console.log(id)
   let obj
   await userAuthModel.findOne({_id:id})
   .then((resApi)=>{
      obj={
         status:1,
         data:resApi
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

let singlepRofile=async (req,res)=>{
   let {id}=req.params
   let obj
   await userAuthModel.findOne({_id:id})
   .then((resApi)=>{
      obj={
         status:1,
         data:resApi
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
module.exports = { sendOtp, createUser, loginUser , viewUser, changePassword,userChangeProfile,viewProfile,singlepRofile}