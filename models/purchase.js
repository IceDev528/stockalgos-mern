{
    /* (2020-08-13) - This is purchase Schema
     */
}

'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PurchaseSchema = new Schema({
    algoId: {
        type: Schema.ObjectId,
        ref: 'Algo'
    },
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    }

})

module.exports = mongoose.model('Purchase', PurchaseSchema)