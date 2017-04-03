/**
 * Created by mallika2493 on 3/20/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        //followers
        //likes
        //reviews
        //websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
        series: [{type: mongoose.Schema.Types.ObjectId, ref: 'SeriesModel'}],
        dateCreated: {type: Date, default: Date.now()},
        likeStatus: String
    },{collections:'project.mongo.users'});


    return UserSchema;
};
