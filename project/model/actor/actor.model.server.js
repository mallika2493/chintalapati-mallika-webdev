/**
 * Created by mallika2493 on 4/11/17.
 */

module.exports = function () {

    var api = {
        setModel:setModel,
        createActor:createActor,
        getActorByUserId:getActorByUserId
    };


    var mongoose = require('mongoose');

    var ActorSchema = require('./actor.schema.server')();
    var ActorModel = mongoose.model('ActorModel', ActorSchema);
    return api;

    function createActor(actor) {

        return ActorModel.create(actor);
    }

    function setModel(_model) {
        model = _model;
    }

    function getActorByUserId(userId) {
        return ActorModel.findOne({"userId":userId});

    }

};
