var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });

//SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [ //array of comment IDs -> reference to comments
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment" //name of model
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);