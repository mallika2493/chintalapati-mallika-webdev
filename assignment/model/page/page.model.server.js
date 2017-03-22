/**
 * Created by mallika2493 on 3/21/17.
 */

module.exports = function () {

    var api = {
        findPageById: findPageById,
        findAllPagesForWebsite: findAllPagesForWebsite,
        createPage: createPage,
        setModel: setModel,
        updatePage: updatePage

    };
    var model = null;
    var mongoose = require('mongoose');

    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model('PageModel', PageSchema);

    return api;

    function createPage(websiteId, newPage){
        return PageModel
            .create(newPage)
            .then(function (newPage) {
                return model
                    .WebsiteModel
                    .findWebsiteById(websiteId)
                    .then(function (website) {
                        website.pages.push(newPage);
                        newPage._website = website._id;
                        website.save();
                        newPage.save();
                        return newPage;
                    }, function (err) {
                        return err;
                    });
            }, function (err) {
                return err;
            });
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({"_website": websiteId});
    }

    function findPageById(pageId) {
        return PageModel.findOne({_id: pageId});

    }

    function setModel(_model) {
        model = _model;
    }

    function updatePage(pageId, updatedPage) {
        return PageModel.update({_id:pageId},{$set:updatedPage});
    }

}
