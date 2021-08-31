{
  /* (2019-06-07) - This is the aws setup file for the S3. Mainly used throughout
    the code for storing the fileuploads and returing the location via url.
  */
}
const AWS = require('aws-sdk');

const S3 = new AWS.S3({
  accessKeyId: process.env.db_user ? process.env.aws_id : 'AKIASBB226JJF3A43EOS',
  secretAccessKey: process.env.db_user ? process.env.aws_secret : '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',
  Bucket: process.env.db_user ? process.env.aws_bucket : 'development-local-jiang',
});
// const S3 = new AWS.S3({
//   accessKeyId: process.env.db_user ? process.env.aws_id : 'AKIAJUIMYEF5UVFSI5TQ',
//   secretAccessKey: process.env.db_user ? process.env.aws_secret : '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',
//   Bucket: process.env.db_user ? process.env.aws_bucket : 'development-local-trevor',
// });

module.exports = S3;
