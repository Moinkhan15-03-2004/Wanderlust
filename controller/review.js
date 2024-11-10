const Listing = require("../models/listing");
const Review = require("../models/review")
module.exports.createReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    // Create new review and associate it with the current user
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    // Add the review to the listing
    listing.reviews.push(newReview);

    // Save both the new review and the updated listing
    await newReview.save();
    await listing.save();

    req.flash("success", "Review added successfully.");
    res.redirect(`/listings/${listing._id}`);
}
module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;

    // Remove review reference from the listing and delete the review document
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted successfully.");
    res.redirect(`/listings/${id}`);
}