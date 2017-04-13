/**
 * Created by mallika2493 on 4/3/17.
 */

module.exports = function () {

    var api = {
        setModel:setModel,
        addSeries: addSeries,
        findSeriesById:findSeriesById,
        getAllSeries:getAllSeries,
        deleteSeries:deleteSeries

    };

    var mongoose = require('mongoose');

    var SeriesSchema = require('./series.schema.server')();
    var SeriesModel = mongoose.model('SeriesModel', SeriesSchema);

    return api;
    
    function addSeries(series) {
        var newSeries = {
            "title": series.name,

            "imageUrl": series.image.original
        };

        return SeriesModel.findOneAndUpdate({_id: series.id}, newSeries, {upsert: true});
        
    }

    function findSeriesById(seriesId) {
        return SeriesModel.findById(seriesId);
    }

    function setModel(_model) {
        model = _model;
    }
    
    function getAllSeries() {
        return SeriesModel.find();
        
    }

    function deleteSeries(seriesId) {
        return SeriesModel.remove({_id: seriesId});

    }


};
