const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: [true, 'Review comment is required'], 
    },
    rating: {  // This field must be defined in the schema
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Rating is required'], // This ensures the rating field is required
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});


module.exports = mongoose.model("Review",reviewSchema);

