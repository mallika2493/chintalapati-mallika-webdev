/**
 * Created by mallika2493 on 4/11/17.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    var StatusSchema = mongoose.Schema({
        actorId: String,
        description: String,
        url: String,
        dateCreated: {type: Date, default: Date.now()}

    },{collections:'project.mongo.status'});


    return StatusSchema;
};

