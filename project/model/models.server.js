/**
 * Created by mallika2493 on 3/20/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var UserModel = require("./user/user.model.server")();
    var SeriesModel = require("./series/series.model.server")();
    var ReviewModel = require("./review/review.model.server")();

    var model = {
        UserModel: UserModel,
        SeriesModel: SeriesModel,
        ReviewModel:ReviewModel

    };

    UserModel.setModel(model);
    SeriesModel.setModel(model);
    ReviewModel.setModel(model);

    mongoose.connection.on('connected', function(){

    });
    return model;
};