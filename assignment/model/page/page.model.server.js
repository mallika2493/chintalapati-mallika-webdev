/**
 * Created by mallika2493 on 3/21/17.
 */

module.exports = function () {

    var api = {
        findPageById: findPageById,
        findAllPagesForWebsite: findAllPagesForWebsite,
        createPage: createPage,
        setModel: setModel,
        updatePage: updatePage,
        deletePage:deletePage,
        deletePageAndChildren:deletePageAndChildren

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

    function deletePage(pageId) {
        // Delete a page, its reference in parent website and its children (widgets)
        return PageModel.findById(pageId).populate('_website').then(function (page) {
            page._website.pages.splice(page._website.pages.indexOf(pageId),1);
            page._website.save();
            console.log("deleted pageId:"+pageId);
            return deletePageAndChildren(pageId);
        }, function (err) {
            return err;
        });
    }

    function deletePageAndChildren(pageId) {
        // Delete the page and its children (widgets)
        return PageModel.findById({_id: pageId})
            .then(function (page) {
                console.log("page and children:"+page);
                var widgetsOfPage = page.widgets;

                return recursiveDelete(widgetsOfPage, pageId);
            }, function (err) {
                return err;
            });
    }


    function recursiveDelete(widgetsOfPage, pageId) {

        if(widgetsOfPage.length == 0){
            // All widgets of page successfully deleted
            // Delete the page
            return PageModel.remove({_id: pageId})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (err) {
                    return err;
                });
        }

        return model.WidgetModel.deleteWidgetOfPage(widgetsOfPage.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return recursiveDelete(widgetsOfPage, pageId);
                }
            }, function (err) {
                return err;
            });
    }

}
