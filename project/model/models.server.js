/**
 * Created by mallika2493 on 3/20/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var UserModel = require("./user/user.model.server")();
    // var WebsiteModel = require("./website/website.model.server")();
    // var PageModel = require("./page/page.model.server")();
    // var WidgetModel = require("./widget/widget.model.server")();
    var model = {
        UserModel: UserModel
        /*WebsiteModel: WebsiteModel,
        PageModel: PageModel,
        WidgetModel: WidgetModel*/
    };

    //WebsiteModel.setModel(model);
    UserModel.setModel(model);
    /*PageModel.setModel(model);
    WidgetModel.setModel(model);*/
    mongoose.connection.on('connected', function(){

    });
    return model;
};