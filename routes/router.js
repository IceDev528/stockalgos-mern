{
  /* (2019-06-06) - This contains the sites RESTful API.
    All of the routes are connected to the controllers.
  */
}
("use strict");
const express = require("express");
const router = express.Router();
var https = require("https");
const helmet = require("helmet");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const async = require("async");
const S3 = require("../config/aws");
const URL = require("url");
const cron = require("node-cron");
const { body, validationResult } = require("express-validator");
const Message = require("../common/constant");
// new
const correlation = require("../controllers/yahoofinance/correlation");
const file_management = require("../controllers/code_development/attempt_1");

const rsi = require("../controllers/algotrader/relativeStrength");
const stock_price_data = require("../controllers/common/fetch_stock_price");
const robinhood = require("../controllers/robinhood/commands");
const interactive_brokers_stocks = require("../controllers/interactive_brokers/stock_commands");
const interactive_brokers_options = require("../controllers/interactive_brokers/options_commands");

const user_registration = require("../controllers/user/registration");
const authentication = require("../controllers/authentication/auth");
const trading_authentication = require("../controllers/authentication/trading_auth");

const neural_net = require("../controllers/algotrader/neural_net");
const algo = require("../controllers/algo/algo");
const payment = require("../controllers/payment/payment");

router.post("/profile-img-upload", algo.profileImgUpload);

router.post("/algo-source-upload", algo.algoSouceUpload);

router.post("/get_correlation", correlation.stock_req);
router.get("/create_file", file_management.test_create_file);

// options

// Options Best
// router.post('/fetch_initial_options_data', options_trader.fetch_initial_options_data)

router.post("/get_rsi_with_slope", rsi.relative_strength_with_slope);
router.post("/fetch_stock_price", stock_price_data.fetch_stock);

// robinhood
router.post("/robinhood_buy_func", robinhood.robinhood_buy_func);
//
// interactive_brokers_stocks
router.post(
  "/authenticate_trading",
  trading_authentication.validate_trading_auth
);
router.post(
  "/generate_auth_key",
  trading_authentication.generate_authentication_tokens
);

router.post(
  "/buy_long",
  trading_authentication.validate_trading_auth,
  interactive_brokers_stocks.ib_buy_func
);
router.post(
  "/buy_long_with_trail",
  trading_authentication.validate_trading_auth,
  interactive_brokers_stocks.ib_buy_then_sell_trailing_func
);
router.post(
  "/buy_short",
  trading_authentication.validate_trading_auth,
  interactive_brokers_stocks.ib_short_func
);
router.post(
  "/buy_short_with_trail",
  trading_authentication.validate_trading_auth,
  interactive_brokers_stocks.ib_short_then_buy_trailing_func
);
router.post(
  "/exit_long_position",
  trading_authentication.validate_trading_auth,
  interactive_brokers_stocks.exit_long_position
);
router.post(
  "/exit_short_position",
  trading_authentication.validate_trading_auth,
  interactive_brokers_stocks.exit_short_position
);

// User
router.post(
  "/create_user",
  [body("email").isEmail(), body("name").exists(), body("password").exists()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: Message.ERROR, message: errors });
    } else return user_registration.create_user(req, res);
  }
);

router.post("/forgot_password", user_registration.forgot_password);

router.get(
  "/fetch_user_details",
  authentication.ensureAuthentication,
  authentication.fetch_user_details
);

router.post(
  "/sign_in",
  authentication.authenticate_user,
  authentication.fetch_user_details
);

router.get("/log_out", authentication.log_out);

// admin_dashboard
// router.get('/fetch_admin_company_services',admin_dashboard_service.fetch_company_and_service)

router.get("/check_security", function (req, res) {
  console.log(req.url);
});

/***. Algo Section.  ***/

router.post("/algos/save", algo.createAlgo);
router.get("/algos/:algoId", algo.getAlgoDetails);
router.get("/myAlgos/:userId", algo.getMyAlgos);
router.post("/checkPurchase/", algo.checkPurchase);
router.post("/checkMyAlgo/", algo.checkMyAlgo);
router.get("/algos", algo.getAllAlgos);
router.get("/algoReview/:algoId", algo.getReviewFromAlgo);
router.put("/algos/:algoId", algo.updateAlgo);
router.delete("/algos/:algoId", algo.deleteAlgo);
router.post("/algos/review/save", algo.saveAlgoReview);
router.delete("/algos/review/:_id", algo.deleteAlgoReview);

router.post("/myPurchases/save", algo.createPurchase);
router.get("/myPurchases/:userId", algo.getMyPurchase);

router.post("/marketplace/search", algo.searchAlgo);

/***  End  ***/
router.post("/create-payment-intent", payment.createPayment);

module.exports = router;
