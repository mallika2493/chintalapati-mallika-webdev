/**
 * Created by mallika2493 on 3/20/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var UserModel = require("./user/user.model.server")();
    var SeriesModel = require("./series/series.model.server")();

    var model = {
        UserModel: UserModel,
        SeriesModel: SeriesModel

    };

    UserModel.setModel(model);
    SeriesModel.setModel(model);

    mongoose.connection.on('connected', function(){

    });
    return model;
};