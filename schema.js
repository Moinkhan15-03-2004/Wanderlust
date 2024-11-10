const Joi = require('joi');
// for client side validation we use 
module.exports.listingSchema = Joi.object({
    listing:Joi.object ({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required(),
        location:Joi.string().required(),
       country:Joi.string().required().min(0),
       rating: Joi.number().min(0).max(5),
       image: Joi.string().optional() 
        
    }).required(),
})

module.exports. reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5)
    }).required(),
});