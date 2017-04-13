/**
 * Created by mallika2493 on 4/11/17.
 */

module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    mongoose.Promise = q.Promise;

    var ActorSchema = require('./actor.schema.server')();
    var ActorModel = mongoose.model('ActorModel', ActorSchema);

    var api = {
        setModel:setModel,
        createActor:createActor,
        getActorByUserId:getActorByUserId,
        addtoSeriesForActor:addtoSeriesForActor,
        deleteActor:deleteActor,
        getAllActorsForSeriesId:getAllActorsForSeriesId,
        getActorByActorId:getActorByActorId,
        deleteShow:deleteShow
    };
    return api;

    function createActor(actor) {
        //var deferred = q.defer();
        console.log("hi", actor);
        return ActorModel
            .create(actor);/*, function (err, doc){
            if(err)
                deferred.abort(err);
            else{
                console.log("h",doc);
                deferred.resolve(doc);
            }

        });
        return deferred.promise;*/
    }

    /*function createUser(newUser) {
        var deferred = q.defer();
        var user = {
            username: newUser.username,
            facebook:newUser.facebook,
            type: newUser.type,
            password: newUser.password,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        };
        movieUserModel
            .create(user, function (err, user){
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(user);
            });
        return deferred.promise;
    }*/

    function setModel(_model) {
        model = _model;
    }

    function getActorByUserId(userId) {
        return ActorModel.findOne({"userId":userId});

    }

    function addtoSeriesForActor(seriesId,actorId) {

        return ActorModel.update({_id: actorId}, {$addToSet: {series: seriesId}});


    }

    function deleteActor(actorId) {
        return ActorModel.remove({_id: actorId});
            /*.then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return response;
                }
            }, function (err) {
                return err;
            });*/

    }
    function getAllActorsForSeriesId(seriesId) {
        return ActorModel.find({series: {$in: [seriesId]}});

    }
    function getActorByActorId(actorId) {
        return ActorModel.findOne({_id:actorId});

    }
    
    function deleteShow(actorId,showId) {
        return ActorModel.update({_id: actorId}, {$pullAll: {series: [showId]}});
        
    }
    //

};
