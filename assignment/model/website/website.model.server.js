/**
 * Created by mallika2493 on 3/21/17.
 */
module.exports = function () {
    var model = null;
    var api = {
        findWebsiteById: findWebsiteById,
        findAllWebsitesForUser: findAllWebsitesForUser,
        createWebsite: createWebsite,
        setModel: setModel,
        updateWebsite: updateWebsite

    };

    var mongoose = require('mongoose');

    var WebsiteSchema = require('./website.schema.server')();
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

    return api;

    function createWebsite(userId,website) {

        return WebsiteModel.create(website)
            .then(
                function (website) {
                    return model.UserModel
                        .findUserById(userId)
                        .then(function (user) {
                            website._user = user._id;
                            user.websites.push(website._id);
                            website.save();
                            user.save();
                            return website;
                        }, function (error) {
                            return error;
                        })

                });
    }


    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find({"_user": userId});
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findOne({_id: websiteId});

    }

    function setModel(_model) {
        model = _model;
    }

    function updateWebsite(websiteId, updatedWebsite) {
        return WebsiteModel.update({_id:websiteId},{$set:updatedWebsite});
    }

};
