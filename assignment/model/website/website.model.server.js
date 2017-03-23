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
        updateWebsite: updateWebsite,
        deleteWebsite:deleteWebsite,
        deleteWebsiteAndChildren:deleteWebsiteAndChildren

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
    function deleteWebsiteAndChildren(websiteId){
        // Delete the website and its children (pages)
        return WebsiteModel.findById({_id: websiteId}).select({'pages':1})
            .then(function (website) {
                var pagesOfWebsite = website.pages;
                return recursiveDelete(pagesOfWebsite, websiteId);
            }, function (err) {
                return err;
            });
    }

    function setModel(_model) {
        model = _model;
    }

    function updateWebsite(websiteId, updatedWebsite) {
        return WebsiteModel.update({_id:websiteId},{$set:updatedWebsite});
    }

    function deleteWebsite(websiteId){
        // Delete a website, its reference in parent and its children
        return WebsiteModel.findOne({_id:websiteId}).populate('_user').then(function (website) {
            website._user.websites.splice(website._user.websites.indexOf(websiteId),1);
            website._user.save();
            return deleteWebsiteAndChildren(websiteId);
        }, function (err) {
            return err;
        });
    }

    function recursiveDelete(pagesOfWebsite, websiteId) {
        if(pagesOfWebsite.length == 0){
            // All pages of website successfully deleted
            // Delete the website
            return WebsiteModel.remove({_id: websiteId})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (err) {
                    return err;
                });
        }

        return model.PageModel.deletePageAndChildren(pagesOfWebsite.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return recursiveDelete(pagesOfWebsite, websiteId);
                }
            }, function (err) {
                return err;
            });
    }




};
