const Listing = require("../models/listing");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // Save the redirect URL
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    // Check if listing exists and if the current user is the owner
    if (!listing || !listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }

    // Call next if the user is the owner
    next();
};

module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    // If there's an error, throw an ExpressError to be caught by error handling middleware
    if (error) {
        return next(new ExpressError(400, error.details[0].message));
    }

    // If no errors, proceed to the next middleware or route handler
    next();
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    // If there's a validation error, pass the error to the error-handling middleware
    if (error) {
        return next(new ExpressError(400, error.details[0].message));
    }

    // If validation is successful, proceed to the next middleware/route handler
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;

    // Find the review by ID
    let review = await Review.findById(reviewId);

    // If review is not found, send an error
    if (!review) {
        req.flash("error", "Review not found.");
        return res.redirect(`/listings/${id}`);
    }

    // Check if the current user is the author of the review
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not authorized to delete this review");
        return res.redirect(`/listings/${id}`);
    }

    // If the user is the author, proceed to the next middleware
    next();
};

