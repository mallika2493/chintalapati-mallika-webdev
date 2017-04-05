/**
 * Created by mallika2493 on 3/20/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var ReviewSchema = mongoose.Schema({
        title: String,
        description: String,
        /*timestamp: {
            type: Date,
            default: Date.now
        },*/
        seriesId: String,
        userId: String,
        //rating: String
    },{collections:'project.mongo.review'});


    return ReviewSchema;
};
