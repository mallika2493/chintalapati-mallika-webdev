/**
 * Created by mallika2493 on 4/3/17.
 */
/**
 * Created by mallika2493 on 3/20/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var SeriesSchema = mongoose.Schema({

        //websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],

        //dateCreated: {type: Date, default: Date.now()},

    },{collections:'project.mongo.series'});


    return SeriesSchema;
};

