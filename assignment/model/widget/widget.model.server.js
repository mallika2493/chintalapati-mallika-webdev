/**
 * Created by mallika2493 on 3/21/17.
 */
module.exports = function () {
    var model = null;
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        setModel: setModel,
        updateWidget: updateWidget

    };
    var mongoose = require('mongoose');

    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

    return api;

    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({"_page": pageId});
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findOne({_id: widgetId});

    }

    function setModel(_model) {
        model = _model;
    }

    function createWidget(pageId,widget) {

        return WidgetModel.create(widget)
            .then(
                function (widget) {
                    return model.PageModel
                        .findPageById(pageId)
                        .then(function (page) {
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

}
