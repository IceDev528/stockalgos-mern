{
  /* (2019-06-07) - This is the config file that outlines the functions used
    for multer. Multer is a library used to handle file uploads. Currently,
    it is set to a very high file size. This should changed and should allow various
    file sizes for various types of files. Ex. Pitch deck should expect larger, while
    profile picture should be smaller.
  */
}
const multer = require('multer');
const path = require('path');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 99000000
  }
});

module.exports = upload;
