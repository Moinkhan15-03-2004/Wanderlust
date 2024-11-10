const mongoose = require('mongoose');
const Schema = mongoose.Schema;// store Schema variable
const passportLocalMongoose = require("passport-local-mongoose");


const   userSchema = new Schema({
    email: {
        type: String,
        required:true,  // This ensures that a comment is mandatory
      },
   
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',  userSchema);

