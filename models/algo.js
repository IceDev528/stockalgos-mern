{
    /* (2020-08-13) - This is Algo Schema
     */
}

'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AlgoSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    stockAlgoName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    howToUse: {
        type: String,
        required: true
    },
    tags: [],
    priceDetails: {},
    algorithmSourceFileUrl: {
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
})

module.exports = mongoose.model('Algo', AlgoSchema)