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
        updateUser: updateUser
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

};