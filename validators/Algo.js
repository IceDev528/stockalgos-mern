const Joi = require('Joi');

module.exports = {

    saveAlgo: Joi.object().keys({
        userId: Joi.string().required().error(() => 'userId is required'),
        algoReviewIds: Joi.array().items(Joi.string().allow('').error(() => 'AlgoReview is not required')),
        image: Joi.string().allow('').regex(/^https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}$/)
            .error(() => 'For Image, a valid URL is required'),
        stockAlgoName: Joi.string().required().error(() => 'Stock Algo Name is required'),
        description: Joi.string().required().error(() => 'Description is required'),
        howToUse: Joi.string().required().error(() => 'How to use is required'),
        tags: Joi.array().items(Joi.string().allow('').error(() => 'Valid Tags are required')),
        priceDetails: Joi.object().keys({
            type: Joi.string().required().valid('One-time purchase', 'Monthly subscription', ).error(() => 'Type could be 1 for One Time,2 for monthly subscription'),
            price: Joi.string().required().error(() => 'Price is required'),
        }).required().error(() => 'Price details are needed'),
        algorithmSourceFileUrl: Joi.string().allow('').regex(/^https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}$/)
            .error(() => 'For algorithm source file ,a valid URL is required')
    }),

    updateAlgo: Joi.object().keys({
        userId: Joi.string().required().error(() => 'userId is required'),
        image: Joi.string().allow('').regex(/^https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}$/)
            .error(() => 'For Image, a valid URL is required'),
        stockAlgoName: Joi.string().required().error(() => 'Stock Algo Name is required'),
        description: Joi.string().required().error(() => 'Description is required'),
        howToUse: Joi.string().required().error(() => 'How to use is required'),
        tags: Joi.array().items(Joi.string().allow('').error(() => 'Valid Tags are required')),
        priceDetails: Joi.object().keys({
            type: Joi.string().required().valid('One-time purchase', 'Monthly subscription', ).error(() => 'Type could be 1 for One Time,2 for monthly subscription'),
            price: Joi.string().required().error(() => 'Price is required'),
        }).required().error(() => 'Price details are needed'),
        algorithmSourceFileUrl: Joi.string().allow('').regex(/^https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}$/)
            .error(() => 'For algorithm source file ,a valid URL is required')
    }),

    saveAlgoReview: Joi.object().keys({
        userId: Joi.string().required().error(() => 'User Id is required'),
        algoId: Joi.string().required().error(() => 'Algo Id is required'),
        reviewTitle: Joi.string().required().error(() => 'Title is required'),
        reviewDescription: Joi.string().required().error(() => 'Description is required'),
        rating: Joi.string().required().error(() => 'Rating is required')
    }),

    algoDetails: Joi.object().keys({
        algoId: Joi.string().required().error(() => 'Algo Id is required')
    })

};