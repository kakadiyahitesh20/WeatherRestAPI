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
        lat: Joi.string().example("10.3").description("The value of lat ").required(),
        lon: Joi.string().example("50.3").description("The value of lon ").required(),
    })

}