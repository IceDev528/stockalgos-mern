"use strict";

const User = require("../../models/user");
const MailFunction = require("./../../common/common");
const Message = require("./../../common/constant");

exports.create_user = function(req, res) {
    console.log('yes')
    User.findOne({ email: req.body.email })
        .lean()
        .exec((err, user) => {
            if (user) {
                res.json({ status: Message.USER_EXIST });
            } else if (err) {
                res.json({ status: Message.ERROR, message: err });
            } else {
                const user = new User({
                    name: req.body.name,
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    ib_port: Math.floor(Math.random() * 65535) + 1024,
                });
                User.applyHash(req, res, user, (err, updated_user) => {
                    let hash_code = JSON.stringify(updated_user._id);
                    let hash = 0;
                    for (let i = 0; i < hash_code.length; i++) {
                        let chr = hash_code.charCodeAt(i);
                        hash = (hash << 5) - hash + chr;
                        hash |= 0; // Convert to 32bit integer

                        if (i + 1 === hash_code.length) {
                            User.updateOne({ _id: updated_user._id }, {
                                ib_client_id: Math.abs(hash),
                            }).then((result) => {
                                res.json({
                                    status: Message.SUCCESS,
                                    data: updated_user,
                                });
                            });
                        }
                    }

                    // req.login(user, function(error) {
                    //     if (!err) {
                    //       res.json({
                    //         status: 'success',
                    //         data: user
                    //       })
                    //     } else {
                    //       res.json({
                    //         status: 'error',
                    //         error
                    //       })
                    //     }
                    //   })
                });
            }
        });
};

exports.forgot_password = function(req, res) {
    User.findOne({ email: req.body.email })
        .lean()
        .exec((err, user) => {
            if (!user) {
                res.json({ status: Message.USER_NOT_EXIST });
            } else if (err) {
                res.json({ status: Message.ERROR, message: err });
            } else {
                MailFunction.htmlTemplate(user, "Forgot Password", "forgot")
                    .then((sendResponse) => {
                        res.json({ status: Message.EMAIL_SENT });
                    })
                    .catch((error) => {
                        console.log(error, "yes");
                        res.json({ status: error });
                    });
            }
        });
};