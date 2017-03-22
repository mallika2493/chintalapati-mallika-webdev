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
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
        dateCreated: {type: Date, default: Date.now()}
    },{collections:'assignment.mongo.users'});

    /*UserSchema.post('remove', function(next) {
        var WebsiteModel =model.WebsiteModel.getModel();
        var PageModel = model.PageModel.getModel();
        var WidgetModel = model.WidgetModel.getModel();

        PageModel.find({_website: {$in: user.websites}}, '_id', function (err, pages) {
            if(err == null) {
                WidgetModel.remove({_page: {$in: pages}}).exec();
                PageModel.remove({_id: {$in: pages}}).exec();
                WebsiteModel.remove({_id: {$in: user.websites}}).exec();
            }
        });

    });*/
    return UserSchema;
};
