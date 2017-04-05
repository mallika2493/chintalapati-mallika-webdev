/**
 * Created by mallika2493 on 4/4/17.
 */

module.exports = function (app, model) {
    var ReviewModel = model.ReviewModel;
    app.post("/api/user/:userId/series/:series_id", addReview);
    app.get("/api/user/series/:series_id",findAllReviewsBySeriesId);


    function addReview(req, res) {
        var userId = req.params.userId;
        var seriesId = req.params.series_id;
        var review = req.body;
        console.log("userId"+userId+" seriesId"+seriesId+" review"+review);
        ReviewModel
            .addReview(userId, seriesId, review)
            .then(
                function (review) {
                    res.json(review);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllReviewsBySeriesId(req,res) {
        var seriesId = req.params.series_id;
        ReviewModel.findAllReviewsBySeriesId(seriesId)
            .then(function (allreviews) {
                res.json(allreviews);
            },function (err) {
                res.status(400).send(err);

            });

    }

};
