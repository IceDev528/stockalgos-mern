{
  /* (2020-08-13) - This is AlgoReview Schema
  */
}
 
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlgoReviewSchema = new Schema({
    
    algoId: {
        type: Schema.ObjectId,
        ref: 'Algo'
    },
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    reviewTitle: {
        type: String,
        required: true
    },
    reviewDescription: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AlgoReview', AlgoReviewSchema);
