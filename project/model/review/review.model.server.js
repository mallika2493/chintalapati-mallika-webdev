/**
 * Created by mallika2493 on 3/20/17.
 */
module.exports = function () {

    var api = {
        addReview:addReview,
        setModel:setModel,
        findAllReviewsBySeriesId:findAllReviewsBySeriesId,
        editReview:editReview,
        deleteReview:deleteReview,
        findReviews:findReviews

    };

    var mongoose = require('mongoose');

    var ReviewSchema = require('./review.schema.server')();
    var ReviewModel = mongoose.model('ReviewModel', ReviewSchema);

    return api;



    function setModel(_model) {
        model = _model;
    }
    
    function addReview(userId,seriesId,review) {
        review.userId = userId;
        review.seriesId = seriesId;
        return ReviewModel.create(review);
    }

    function findAllReviewsBySeriesId(seriesId) {
        return ReviewModel.find({seriesId: seriesId});
    }
    function editReview(reviewId,reviewObj) {
        return ReviewModel.update({_id: reviewId}, {$set: reviewObj});
    }

    function deleteReview(reviewId) {
        return ReviewModel.remove({_id:reviewId});

    }

    function findReviews() {
        return ReviewModel.find();
    }




};