/**
 * Created by mallika2493 on 4/3/17.
 */
module.exports = function (app, model) {
    var SeriesModel = model.SeriesModel;

    app.post("/api/user/series",addSeries);

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
};
