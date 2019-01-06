"use strict";

const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {

    headers: Joi.object({
        'api-key': Joi.string().required()
            .description("Api Key of the api")
    }).options({
        allowUnknown: true
    }),

    params: Joi.object({
        cityId: Joi.string().example("2873891").description("The value of cityid ").required(),
    })

}