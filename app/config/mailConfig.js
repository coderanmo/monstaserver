let nodemailer=require('nodemailer')

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "anmolyadav95200@gmail.com",
    pass:process.env.PASS
  },
});




module.exports={transporter}