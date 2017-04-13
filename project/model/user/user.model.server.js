/**
 * Created by mallika2493 on 3/20/17.
 */
module.exports = function () {

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserbyUsername: findUserbyUsername,
        findUserByCredentials: findUserByCredentials,
        setModel: setModel,
        updateUser: updateUser,
        deleteUser:deleteUser,
        updatelikeStatus:updatelikeStatus,
        isShowLiked:isShowLiked,
        addToFollowing:addToFollowing,
        addToFollowers:addToFollowers,
        removeFromFollowing:removeFromFollowing,
        removeFromFollowers:removeFromFollowers


    };

    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

    function createUser(user) {

        return UserModel.create(user);
    }

    function setModel(_model) {
        model = _model;
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserbyUsername(username) {
        return UserModel.find({"username":username});
    }

    function findUserByCredentials(_username, _password) {
        return UserModel.find({username:_username, password: _password});
    }

    function updateUser(userId, updatedUser) {
        return UserModel.update({_id:userId},{$set:updatedUser});
    }
    function deleteUser(userId) {
        console.log("I am deleting")
        return UserModel.remove({_id: userId})
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return response;
                }
            }, function (err) {
                return err;
            });
    }


    function updatelikeStatus(userId,showId,status) {
            if(status=='like')
            return UserModel.update({_id: userId}, {$addToSet: {likes: showId}});
            else if(status=='unlike')
                return UserModel.update({_id: userId}, {$pullAll: {likes: [showId]}});


    }

    function isShowLiked(userId,showId) {
        return UserModel.findOne({_id: userId, likes: {$in: [showId]}});
    }

    function addToFollowing(loggedInUserId,secondUserId) {

        return UserModel.update({_id: loggedInUserId}, {$addToSet: {following: secondUserId}});


    }

    function addToFollowers(secondUserId,loggedInUserId) {


        return UserModel.update({_id: secondUserId}, {$addToSet: {followers: loggedInUserId}});

    }

    function removeFromFollowing(loggedInUserId,secondUserId) {

        return UserModel.update({_id: loggedInUserId}, {$pullAll: {following: [secondUserId]}});


    }

    function removeFromFollowers(secondUserId,loggedInUserId) {


        return UserModel.update({_id: secondUserId}, {$pullAll: {followers: [loggedInUserId]}});

    }

};