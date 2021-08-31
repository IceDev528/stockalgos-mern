"use strict";

const User = require("../../models/user");
const Algo = require("../../models/algo");
const AlgoReview = require("../../models/algoReview");
const Purchase = require("../../models/purchase");
const Message = require("./../../common/constant");
const validator = require("./../../common/schemaValidator");

const AlgoValidator = require("./../../validators/Algo");
var Promise = require("promise");
const algoReview = require("../../models/algoReview");
const S3 = require("../../config/aws");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const profileImgUpload = multer({
  storage: multerS3({
    s3: S3,
    bucket: "development-local-jiang",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: {
    fileSize: 2000000,
  }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("profileImage");

const algoSouceUpload = multer({
  storage: multerS3({
    s3: S3,
    bucket: "development-local-jiang",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: {
    fileSize: 2000000,
  }, // In bytes: 2000000 bytes = 2 MB
}).single("sourceCode");

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

exports.createAlgo = function (req, res) {
  let body = req.body;
  const { isError, errors } = validator(body, AlgoValidator.saveAlgo);

  if (isError) {
    return res.json({
      status: 0,
      message: "Invalid Input, Contact Support",
      error: errors,
      status_code: 400,
    });
  }

  User.findOne(
    {
      _id: body.userId,
    },
    function (err, user) {
      if (err) {
        return res.json({
          status: 0,
          message: Message.SERVER_ERROR,
          status_code: 500,
        });
      } else {
        if (user) {
          Algo.create(body, function (err, algo) {
            if (err) {
              console.log(err);
              return res.json({
                status: 0,
                message: Message.SERVER_ERROR,
                status_code: 500,
              });
            } else {
              return res.json({
                status: 1,
                message: Message.SUCCESS,
                status_code: 200,
              });
            }
          });
        } else {
          return res.json({
            status: 0,
            message: Message.USER_NOT_EXIST,
            status_code: 400,
          });
        }
      }
    }
  );
};

exports.updateAlgo = function (req, res) {
  let body = req.body;
  const { isError, errors } = validator(body, AlgoValidator.updateAlgo);
  if (isError) {
    return res.json({
      status: 0,
      message: "Invalid Input, Contact Support",
      error: errors,
      status_code: 400,
    });
  }

  User.findOne(
    {
      _id: body.userId,
    },
    function (err, user) {
      if (err) {
        return res.json({
          status: 0,
          message: Message.SERVER_ERROR,
          status_code: 500,
        });
      } else {
        if (user) {
          console.log("req44", req);
          const id = req.params.algoId;
          console.log("req33", id);
          Algo.findByIdAndUpdate(id, req.body)
            .then((data) => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update Algo with id=${id}. Maybe Algo was not found!`,
                });
              } else
                res.send({
                  message: "Algo was updated successfully.",
                });
            })
            .catch((err) => {
              res.status(500).send({
                message: "Error updating Algo with id=" + id,
              });
            });
        }
      }
    }
  );
};

exports.deleteAlgo = function (req, res) {
  const id = req.params.algoId;

  Algo.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Algo with id=${id}. Maybe Algo was not found!`,
        });
      } else {
        res.send({
          message: "Algo was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Algo with id=" + id,
      });
    });
};

exports.deleteAlgoReview = function (req, res) {
  const id = req.params._id;

  AlgoReview.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete AlgoReview with id=${id}. Maybe AlgoReview was not found!`,
        });
      } else {
        res.send({
          message: "AlgoReview was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete AlgoReview with id=" + id,
      });
    });
};

exports.saveAlgoReview = function (req, res) {
  let body = req.body;

  const { isError, errors } = validator(body, AlgoValidator.saveAlgoReview);

  if (isError) {
    return res.json({
      status: 0,
      message: Message.INVALID_INPUT,
      error: errors,
      status_code: 400,
    });
  }

  User.findOne(
    {
      _id: body.userId,
    },
    function (err, user) {
      if (err) {
        return res.json({
          status: 0,
          message: Message.SERVER_ERROR,
          status_code: 500,
        });
      } else {
        if (user) {
          Algo.findOne(
            {
              _id: body.algoId,
            },
            function (err, algo) {
              if (err) {
                return res.json({
                  status: 0,
                  message: Message.SERVER_ERROR,
                  status_code: 500,
                });
              } else {
                if (algo) {
                  AlgoReview.create(body, function (err, algoReview) {
                    if (err) {
                      return res.json({
                        status: 0,
                        message: Message.SERVER_ERROR,
                        status_code: 500,
                      });
                    } else {
                      return res.json({
                        status: 1,
                        message: Message.SUCCESS,
                        status_code: 200,
                      });
                    }
                  });
                } else {
                  return res.json({
                    status: 0,
                    message: "Algo Not Exist",
                    status_code: 400,
                  });
                }
              }
            }
          );
        } else {
          return res.json({
            status: 0,
            message: Message.USER_NOT_EXIST,
            status_code: 404,
          });
        }
      }
    }
  );
};
exports.getReviewFromAlgo = function (req, res) {
  AlgoReview.find({
    algoId: req.params.algoId,
  }).exec(function (err, algoReview) {
    if (err) {
      return res.json({
        status: 0,
        message: Message.SERVER_ERROR,
        status_code: 500,
      });
    } else {
      if (algoReview) {
        var totalReviewRating = 0;
        var totalRating = 0;
        var reviewLength = algoReview.length;
        for (let review of algoReview) {
          totalReviewRating += parseFloat(review.rating);
        }
        totalRating = totalReviewRating / reviewLength;
        if (reviewLength == 0) totalRating = 0;
        totalRating = round(totalRating, 2);
        return res.json({
          status: 0,
          message: Message.SUCCESS,
          status_code: 200,
          data: totalRating,
        });
      } else return 0;
    }
  });
};

exports.getAllAlgos = function (req, res) {
  Algo.find({})
    .populate("userId algoReviewIds")
    .exec(function (err, algos) {
      if (err) {
        return res.json({
          status: 0,
          message: Message.SERVER_ERROR,
          status_code: 500,
        });
      } else {
        if (algos) {
          var algosReview = [];
          var promises = [];
          for (let algo of algos) {
            let promise = new Promise(function (resolve, reject) {
              AlgoReview.find({
                algoId: algo._id,
              }).exec(function (err, algoReview) {
                if (err) {
                  return res.json({
                    status: 0,
                    message: Message.SERVER_ERROR,
                    status_code: 500,
                  });
                } else {
                  if (algoReview) {
                    var totalReviewRating = 0;
                    var totalRating = 0;
                    var reviewLength = algoReview.length;
                    for (let review of algoReview) {
                      totalReviewRating += parseInt(review.rating);
                    }
                    totalRating = totalReviewRating / reviewLength;
                    if (reviewLength == 0) totalRating = 0;
                    totalRating = round(totalRating, 2);
                    algo._doc.review = totalRating;
                    resolve(totalRating);
                  } else {
                    resolve(0);
                  }
                }
              });
            });
            promises.push(promise);
          }
          Promise.all(promises).then(function (response) {
            return res.json({
              status: 1,
              message: Message.SUCCESS,
              status_code: 200,
              data: algos,
            });
          });
        } else {
          return res.json({
            status: 1,
            message: Message.SUCCESS,
            status_code: 200,
            data: algos,
            totalRating: 0,
          });
        }
      }
    });
};

exports.getAlgoDetails = function (req, res) {
  let body = {};
  if (req.params.algoId) {
    body.algoId = req.params.algoId;
  } else {
    body.algoId = "";
  }

  const { isError, errors } = validator(body, AlgoValidator.algoDetails);

  if (isError) {
    return res.json({
      status: 0,
      message: "Invalid Input, Contact Support",
      error: errors,
      status_code: 400,
    });
  }

  let query = {
    _id: body.algoId,
  };

  Algo.findOne({
    _id: body.algoId,
  })
    .populate("userId algoReviewIds")
    .exec(function (err, algo) {
      if (err) {
        return res.json({
          status: 0,
          message: Message.SERVER_ERROR,
          status_code: 500,
        });
      } else {
        if (algo) {
          AlgoReview.find({
            algoId: body.algoId,
          })
            .populate("userId")
            .exec(function (err, algoReview) {
              if (err) {
                return res.json({
                  status: 0,
                  message: Message.SERVER_ERROR,
                  status_code: 500,
                });
              } else {
                if (algoReview) {
                  var promises = [];
                  var totalReviewRating = 0;
                  var reviewLength = algoReview.length;
                  for (let review of algoReview) {
                    totalReviewRating += parseFloat(review.rating);
                    let promise = new Promise(function (resolve, reject) {
                      let reviewRecords = {};
                      User.findOne({
                        _id: review.userId,
                      })
                        .populate("userId")
                        .exec(function (err, user) {
                          if (err) {
                            reviewRecords.review = review;
                            reviewRecords.user = {};
                          } else {
                            reviewRecords.review = review;
                            reviewRecords.user = {};
                            reviewRecords.user.name = user.name;
                            reviewRecords.user.email = user.email;
                            reviewRecords.user.first_name = user.first_name;

                            resolve(reviewRecords);
                          }
                        });
                    });
                    promises.push(promise);
                  }

                  Promise.all(promises).then(function (response) {
                    totalReviewRating = round(
                      totalReviewRating / reviewLength,
                      2
                    );
                    return res.json({
                      status: 1,
                      message: Message.SUCCESS,
                      status_code: 200,
                      data: algo,
                      totalReviewRating: totalReviewRating,
                      reviewsDetails: response,
                    });
                  });
                } else {
                  return res.json({
                    status: 1,
                    message: Message.SUCCESS,
                    status_code: 200,
                    data: algo,
                    totalReviewRating: 0,
                    reviewsDetails: algoReview,
                  });
                }
              }
            });
        } else {
          return res.json({
            status: 0,
            message: "Algo Not Exist",
            status_code: 400,
          });
        }
      }
    });
};

exports.getAlgoReview = function (req, res) {};

exports.profileImgUpload = function (req, res) {
  profileImgUpload(req, res, (error) => {
    console.log("requestOkokok", req.file);
    console.log("error", error);
    if (error) {
      console.log("errors", error);
      res.json({
        error: error,
      });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected");
      } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        // Save the file name into database into profile model
        res.json({
          image: imageName,
          location: imageLocation,
        });
      }
    }
  });
};

exports.algoSouceUpload = function (req, res) {
  console.log("aareqeust", req);
  algoSouceUpload(req, res, (error) => {
    console.log("requestaaa", req.file);
    console.log("error", error);
    if (error) {
      console.log("errors", error);
      res.json({
        error: error,
      });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected");
      } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        // Save the file name into database into profile model
        res.json({
          image: imageName,
          location: imageLocation,
        });
      }
    }
  });
};

exports.createPurchase = function (req, res) {
  let body = req.body;

  User.findOne(
    {
      _id: body.userId,
    },
    function (err, user) {
      if (err) {
        return res.json({
          status: 0,
          message: Message.SERVER_ERROR,
          status_code: 500,
        });
      } else {
        if (user) {
          Purchase.create(body, function (err, purchase) {
            if (err) {
              console.log(err);
              return res.json({
                status: 0,
                message: Message.SERVER_ERROR,
                status_code: 500,
              });
            } else {
              return res.json({
                status: 1,
                message: Message.SUCCESS,
                status_code: 200,
              });
            }
          });
        } else {
          return res.json({
            status: 0,
            message: Message.USER_NOT_EXIST,
            status_code: 400,
          });
        }
      }
    }
  );
};

exports.getMyPurchase = function (req, res) {
  console.log("1111", req.params.userId);
  Purchase.find({
    userId: req.params.userId,
  })
    .populate("algoId userId")
    .exec(function (err, purchases) {
      if (err) {
        return res.json({
          status: 0,
          message: Message.SERVER_ERROR,
          status_code: 500,
        });
      } else {
        if (purchases) {
          var algosReview = [];
          var promises = [];
          for (let algo of purchases) {
            let promise = new Promise(function (resolve, reject) {
              AlgoReview.find({
                algoId: algo.algoId,
              }).exec(function (err, algoReview) {
                if (err) {
                  return res.json({
                    status: 0,
                    message: Message.SERVER_ERROR,
                    status_code: 500,
                  });
                } else {
                  if (algoReview) {
                    var totalReviewRating = 0;
                    var totalRating = 0;
                    var reviewLength = algoReview.length;
                    for (let review of algoReview) {
                      totalReviewRating += parseInt(review.rating);
                    }
                    totalRating = totalReviewRating / reviewLength;
                    if (reviewLength == 0) totalRating = 0;
                    totalRating = round(totalRating, 2);
                    algo._doc.review = totalRating;
                    console.log("222", algo);
                    resolve(totalRating);
                  } else {
                    resolve(0);
                  }
                }
              });
            });
            promises.push(promise);
          }
          Promise.all(promises).then(function (response) {
            return res.json({
              status: 1,
              message: Message.SUCCESS,
              status_code: 200,
              data: purchases,
            });
          });
        } else {
          return res.json({
            status: 1,
            message: Message.SUCCESS,
            status_code: 200,
            data: purchases,
          });
        }
      }
    });
};

exports.searchAlgo = function (req, res) {
  let body = req.body;
  var tempAlgos = [];
  if (body.tags.length == 0) {
    searchWithoutTags(req, res);
  } else {
    let promise = new Promise(function (resolve, reject) {
      Algo.find({
        stockAlgoName: {
          $regex: body.search,
          $options: "i",
        },
      }).exec(function (err, algos) {
        if (algos.length > 0) {
          // Algo.find({})
          //   .populate({
          //     path: "userId",
          //     match: {
          //       name: {
          //         $regex: body.search,
          //         $options: "i",
          //       },
          //     },
          //   })
          //   .find({
          //     stockAlgoName: {
          //       $regex: body.search,
          //       $options: "i",
          //     },
          //     tags: {
          //       $all: body.tags,
          //     },
          //   })
          //   .exec(function (err, algos) {
          //     if (err) {
          //       return res.json({
          //         status: 0,
          //         message: Message.SERVER_ERROR,
          //         status_code: 500,
          //       });
          //     } else {
          //       resolve(algos);
          //     }
          //   });

          Algo.find({
            $and: [
              { stockAlgoName: { $regex: body.search, $options: "i" } },
              { tags: { $all: body.tags } },
            ],
          })
            .populate({
              path: "userId",
            })
            .exec(function (err, algos) {
              if (err) {
                return res.json({
                  status: 0,
                  message: Message.SERVER_ERROR,
                  status_code: 500,
                });
              } else {
                resolve(algos);
              }
            });
        } else {
          Algo.find({
            tags: {
              $all: body.tags,
            },
          })
            .populate({
              path: "userId",
              match: {
                name: {
                  $regex: body.search,
                  $options: "i",
                },
              },
            })
            .exec(function (err, algos) {
              if (err) {
                return res.json({
                  status: 0,
                  message: Message.SERVER_ERROR,
                  status_code: 500,
                });
              } else {
                resolve(algos);
              }
            });
        }
      });
    });
    promise.then(function (response) {
      var resAlgos = getTotalReviews(response, res);
    });
  }
};

exports.checkPurchase = function (req, res) {
  var body = req.body;
  Purchase.find({
    $and: [{ userId: body.userId }, { algoId: body.algoId }],
  }).exec(function (err, purchases) {
    if (err) {
      return res.json({
        status: 0,
        message: Message.SERVER_ERROR,
        status_code: 500,
        purchased: false,
      });
    } else {
      if (purchases.length > 0) {
        return res.json({
          message: Message.SUCCESS,
          purchased: true,
        });
      } else {
        return res.json({
          message: "No purchased",
          purchased: false,
        });
      }
    }
  });
};

exports.checkMyAlgo = function (req, res) {
  var body = req.body;
  Algo.find({
    $and: [{ userId: body.userId }],
  }).exec(function (err, algos) {
    if (err) {
      return res.json({
        status: 0,
        message: Message.SERVER_ERROR,
        status_code: 500,
        isMyAlgo: false,
      });
    } else {
      if (algos.length > 0) {
        return res.json({
          message: Message.SUCCESS,
          isMyAlgo: true,
        });
      } else {
        return res.json({
          message: "No my algo",
          isMyAlgo: false,
        });
      }
    }
  });
};

exports.getMyAlgos = function (req, res) {
  var userId = req.params.userId;

  Algo.find({ userId: userId })
    .populate("userId algoReviewIds")
    .exec(function (err, algos) {
      if (err) {
        return res.json({
          status: 0,
          message: Message.SERVER_ERROR,
          status_code: 500,
        });
      } else {
        if (algos) {
          var algosReview = [];
          var promises = [];
          for (let algo of algos) {
            let promise = new Promise(function (resolve, reject) {
              AlgoReview.find({
                algoId: algo._id,
              }).exec(function (err, algoReview) {
                if (err) {
                  return res.json({
                    status: 0,
                    message: Message.SERVER_ERROR,
                    status_code: 500,
                  });
                } else {
                  if (algoReview) {
                    var totalReviewRating = 0;
                    var totalRating = 0;
                    var reviewLength = algoReview.length;
                    for (let review of algoReview) {
                      totalReviewRating += parseInt(review.rating);
                    }
                    totalRating = totalReviewRating / reviewLength;
                    if (reviewLength == 0) totalRating = 0;
                    totalRating = round(totalRating, 2);
                    algo._doc.review = totalRating;
                    resolve(totalRating);
                  } else {
                    resolve(0);
                  }
                }
              });
            });
            promises.push(promise);
          }
          Promise.all(promises).then(function (response) {
            return res.json({
              status: 1,
              message: Message.SUCCESS,
              status_code: 200,
              data: algos,
            });
          });
        } else {
          return res.json({
            status: 1,
            message: Message.SUCCESS,
            status_code: 200,
            data: algos,
            totalRating: 0,
          });
        }
      }
    });
};

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
function getTotalReviews(tAlgos, res) {
  var algos = [];
  for (let algo of tAlgos) {
    if (algo.userId != null) algos.push(algo);
  }
  if (algos) {
    var promises = [];
    for (let algo of algos) {
      let promise = new Promise(function (resolve, reject) {
        AlgoReview.find({
          algoId: algo._id,
        }).exec(function (err, algoReview) {
          if (err) {
            return res.json({
              status: 0,
              message: Message.SERVER_ERROR,
              status_code: 500,
            });
          } else {
            if (algoReview) {
              var totalReviewRating = 0;
              var totalRating = 0;
              var reviewLength = algoReview.length;
              for (let review of algoReview) {
                totalReviewRating += parseInt(review.rating);
              }
              totalRating = totalReviewRating / reviewLength;
              if (reviewLength == 0) totalRating = 0;
              totalRating = round(totalRating, 2);
              algo._doc.review = totalRating;
              resolve(totalRating);
            } else {
              resolve(0);
            }
          }
        });
      });
      promises.push(promise);
    }
    Promise.all(promises).then(function (response) {
      return res.json({
        status: 1,
        message: Message.SUCCESS,
        status_code: 200,
        data: algos,
      });
    });
  } else {
    return res.json({
      status: 1,
      message: Message.SUCCESS,
      status_code: 200,
      data: algos,
    });
  }
}

function searchWithoutTags(req, res) {
  let body = req.body;
  let promise = new Promise(function (resolve, reject) {
    Algo.find({
      stockAlgoName: {
        $regex: body.search,
        $options: "i",
      },
    }).exec(function (err, algos) {
      if (algos.length > 0) {
        Algo.find({
          stockAlgoName: { $regex: body.search, $options: "i" },
        })
          .populate({
            path: "userId",
          })
          .exec(function (err, algos) {
            if (err) {
              return res.json({
                status: 0,
                message: Message.SERVER_ERROR,
                status_code: 500,
              });
            } else {
              resolve(algos);
            }
          });
      } else {
        Algo.find()
          .populate({
            path: "userId",
            match: {
              name: {
                $regex: body.search,
                $options: "i",
              },
            },
          })
          .exec(function (err, algos) {
            if (err) {
              return res.json({
                status: 0,
                message: Message.SERVER_ERROR,
                status_code: 500,
              });
            } else {
              resolve(algos);
              // return res.json({
              //   status: 0,
              //   message: Message.SUCCESS,
              //   status_code: 200,
              //   data: algos,
              // });
            }
          });
      }
    });
  });
  promise.then(function (response) {
    getTotalReviews(response, res);
  });
}
