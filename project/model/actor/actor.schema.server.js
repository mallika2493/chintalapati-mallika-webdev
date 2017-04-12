/**
 * Created by mallika2493 on 4/11/17.
 */
/**
 * Created by mallika2493 on 3/20/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var ActorSchema = mongoose.Schema({
        userId : {type: mongoose.Schema.Types.ObjectId},
        series: [String],
        //status: [{type: mongoose.Schema.Types.ObjectId, ref: 'StatusModel'}],

        dateCreated: {type: Date, default: Date.now()}

    },{collections:'project.mongo.actors'});


    return ActorSchema;
};
