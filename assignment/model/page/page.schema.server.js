/**
 * Created by mallika2493 on 3/21/17.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
        name: String,
        title: String,
        description: String,
        //widgets: [{type: mongoose.Schema.Types.ObjectId, ref:'WidgetModel'}],
        dateCreated: {type: Date, default: Date.now()}
    },{collections:'assignment.mongo.pages'});
    return PageSchema;
};

