
module.exports.trackReferrer = function (req, res, next) {
  if (!req.cookies.original_referrer) {
    var referrer = req.query.referrer || req.header('Referer');
    if (referrer) {
      res.cookie('original_referrer', referrer);
    }
  }

  next();
}

module.exports.isAuthenticated = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(401).json({
      status: "error",
      message: "user not logged in"
    });
  }
}

module.exports.forceSSL = function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, ['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};
