/**
 * Created by mallika2493 on 4/3/17.
 */
module.exports = function (app, model) {
    var SeriesModel = model.SeriesModel;

    app.post("/api/user/series",addSeries);
    app.get("/api/user/likes/series/:seriesId",findSeriesById);
    app.get("/api/getAllSeries/",getAllSeries);
    app.delete("/api/deleteSeries/:seriesId",deleteSeries);

    function addSeries(req,res) {
        var shows = req.body;

        for (var sh in shows) {
        SeriesModel
            .addSeries(shows[sh].show)
            .then(
                function (result) {
                    res.json(result);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }
    }
    function findSeriesById(req,res) {
        var seriesId=req.params.seriesId;
        SeriesModel.findSeriesById(seriesId)
            .then(function (show) {
                res.json(show);
                
            },
            function (err) {
                res.status(400).send(err);

            });
        
    }

    function getAllSeries(req,res) {
        SeriesModel.getAllSeries()
            .then(function (series) {
                res.json(series);
        })

    }

    function deleteSeries(req,res) {
        var sid = req.params['seriesId'];
        SeriesModel.deleteSeries(sid)
            .then(function (response) {
                res.sendStatus(200);
            },function (err) {
                res.sendStatus(404);
            });;


    }
};
