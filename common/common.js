const nodemailer = require('nodemailer');
const async = require("async");
const ejs = require('ejs');
const moment = require('moment')
const mongoose = require('mongoose');
const config = require('../config/nodemailer');
var path = require("path");
const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(config.sg_transporter);
var common = module.exports = {

    // /**
    //  * Template for Notification, forget password, member credentials, payment
    //  * @param {data} data 
    //  * @param {textObj} textObj 
    //  * @param {type} type 
    //  */
    htmlTemplate(response, textObj, type) {      
        var record = {
            data: response,
            type: 'Forgot password'
        }
        
        return new Promise(function (resolve, reject) {
            var path = require("path").join(__dirname, '..', 'template', 'emailTemplate.ejs');
            ejs.renderFile(path, record).then((data) => {
                const msg = {
                    from:['test@gmail.com'],
                    to: ['testdeveloperninja7@gmail.com'],
                    subject: textObj,
                    html: data
                }

                resolve(common.mailSend(msg))
            }).catch((err) => {
                reject(err)
            })
        })
    },



    mailSend(msg) {
        return new Promise(function (resolve, reject) {
            config.sendMail(msg).then((mailresponse) => {
              console.log(mailresponse)
                resolve('success')
            }).catch((error) => {
                console.log(JSON.stringify(error), 'error ')
                reject(error)
            })
        })
    },
  }