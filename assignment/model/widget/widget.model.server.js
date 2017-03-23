/**
 * Created by mallika2493 on 3/21/17.
 */
module.exports = function () {
    var model = null;
    var mongoose = require('mongoose');
    var WidgetSchema;
    var WidgetModel;

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        setModel: setModel,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        deleteWidgetOfPage: deleteWidgetOfPage

    };



    return api;

    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({"_page": pageId});
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findOne({_id: widgetId});

    }


    function createWidget(pageId,widget) {
        console.log(pageId);
        return WidgetModel.create(widget)
            .then(
                function (widget) {
                    return model.PageModel
                        .findPageById(pageId)
                        .then(function (page) {
                            console.log("pageId:"+pageId);
                            widget._page = page._id;
                            page.widgets.push(widget._id);
                            widget.save();
                            page.save();
                            return widget;
                        }, function (error) {
                            return error;
                        })

                });
    }

    function updateWidget(widgetId,widget) {
        return WidgetModel.update({_id:widgetId},{$set:widget});

    }

    function setModel(_model) {
        model = _model;
        WidgetSchema = require('./widget.schema.server')(_model);
        WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
    }

// Delete the widget, its reference in the parent page and delete the image
    // associated (if the widget is an IMAGE widget)
    function deleteWidget(widgetId){

        return WidgetModel.findById(widgetId).populate('_page').then(function (widget) {
            widget._page.widgets.splice(widget._page.widgets.indexOf(widgetId),1);
            widget._page.save();
            if(widget.type == "IMAGE"){
                deleteUploadedImage(widget.url);
            }
            return WidgetModel.remove({_id:widgetId});
        }, function (err) {
            return err;
        });
    }

    // Clean up method
    // Since we need to get rid of uploaded image for widgets of a page,
    // This model has to be prepared to delete a widget and clean up the
    // uploaded image if it is of type IMAGE
    function deleteUploadedImage(imageUrl) {
        // Local helper function
        if(imageUrl && imageUrl.search('http') == -1){
            // Locally uploaded image
            // Delete it
            fs.unlink(publicDirectory+imageUrl, function (err) {
                if(err){
                    console.log(err);
                    return;
                }
                console.log('successfully deleted '+publicDirectory+imageUrl);
            });
        }
    }
    function deleteWidgetOfPage(widgetId) {
        // Delete the widget and the associated image (if present)
        console.log("in wofp");
        return WidgetModel.findById(widgetId)
            .then(function (widget) {
                if(widget.type == "IMAGE"){
                    deleteUploadedImage(widget.url);
                }
                return WidgetModel.remove({_id: widgetId});
            }, function (err) {
                return err;
            });
    }

}
