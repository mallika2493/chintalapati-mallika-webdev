/**
 * Created by mallika2493 on 4/3/17.
 */
/**
 * Created by mallika2493 on 3/20/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var SeriesSchema = mongoose.Schema({
        _id: String,
        title: String,
        imageUrl: String

    },{collections:'project.mongo.series'});


    return SeriesSchema;
};

