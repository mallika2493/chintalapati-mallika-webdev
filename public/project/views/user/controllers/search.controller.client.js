/**
 * Created by mallika2493 on 3/30/17.
 */
/**
 * Created by mallika2493 on 3/20/17.
 */
(function(){
    angular
        .module("SeriesAppMaker")
        .controller("searchController", searchController);

    function searchController($routeParams,$location, TvShowService,UserService,ReviewService,SeriesService) {
        var vm=this;
        vm.searchShow = searchShow;
        vm.findUserByUserId=findUserByUserId;
        vm.setLikeStatus=setLikeStatus;
        vm.isShowLiked=isShowLiked;
        vm.addReview=addReview;
        vm.selectReviewBox=selectReviewBox;
        vm.editReview=editReview;
        vm.undoReview=undoReview;
        vm.deleteReview=deleteReview;
        vm.follow=follow;


        function init() {
            vm.userId = $routeParams.uid;
            vm.searchTerm = $routeParams.searchTerm;
            searchShow(vm.searchTerm);
            if(vm.userId!=null){

                findUserByUserId(vm.userId);


            }

        }
        init();
        function searchShow(searchTerm) {
            var id;
            TvShowService
                .searchShow(searchTerm)
                .then(function (response) {
                    var data = response.data;
                    var sh = [data[0]];
                    var summary = sh[0].show.summary;
                    cleanText = summary.replace(/<\/?[^>]+(>|$)/g, "");
                    sh[0].show.summary=cleanText;
                    id = sh[0].show.id;
                    vm.shows = sh;
                    console.log(vm.shows)
                    vm.id=id;
                    TvShowService.getCastDetails(id)
                        .then(function (response) {
                            var cast = response.data;
                            vm.cast = cast;
                            findAllReviewsBySeriesId(id);
                            if (vm.userId != null) {
                                isShowLiked(id);
                                setAllFollowingUsers(vm.userId);

                        }
                        else{

                            }


                        });
               });

        }

        function findUserByUserId(userId) {
            var promise = UserService
                .findUserById(userId)
                .success(function (user) {
                    vm.user=user;

                });

        }

        function setLikeStatus(likeStatus) {

            UserService
                .setLikeStatus(likeStatus,vm.userId, vm.id)
                .then(function (response) {
                    var status = response.data;

                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.user.status=likeStatus;
                        console.log(vm.shows);
                        return SeriesService.addSeries(vm.shows);
                    }
                })
                .then(function (response) {
                    console.log("Series Inserted !");
                });

        }

        function isShowLiked(series_id) {

            UserService
                .isShowLiked(vm.userId, series_id)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        console.log(user);
                        vm.user.status = 'like';
                        console.log(vm.user.status);
                    }
                    else {
                        vm.user.status = 'unlike';
                        console.log(vm.user.status);
                    }
                });
        }

        function addReview(review) {

            ReviewService
                .addReview(vm.userId, vm.id, review)
                .then(function (response) {
                    if (response.data) {
                        vm.selectedIndex = -1;
                        //vm.review = {};
                        vm.reviews.push(response.data);
                        findUserBySeriesReviewUserId(vm.reviews);
                        //movieAvgRatingBySeriesId(vm.reviews);
                        return SeriesService.addSeries(vm.series);
                    }
                })
                .then(function (response) {
                    console.log("Series Inserted !");
                });

        }

        function editReview(reviewer_userId) {
            ReviewService.editReview(reviewer_userId);

        }

        function findUserBySeriesReviewUserId(reviews) {
            reviews.forEach(function (element, index, array) {
                UserService.findUserById(reviews[index].userId)
                    .then(function (response) {
                        if (response.data) {
                            reviews[index].userFirstName = response.data.firstName;
                            reviews[index].userId = response.data._id;
                            //reviews[index].imgUrl = response.data.imgUrl;
                        }
                    });
            });
        }

        function findAllReviewsBySeriesId(seriesId) {
            ReviewService
                .findAllReviewsBySeriesId(seriesId)
                .then(function (response) {
                    if (response.data) {
                        vm.reviews = response.data;
                        findUserBySeriesReviewUserId(vm.reviews);
                        //movieAvgRatingByMovieId(vm.reviews);

                    }
                });
        }

        function follow(secondUserId) {
            UserService
                .follow(vm.userId, secondUserId.userId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.allFollowing.push(secondUserId)
                    }

                });
        }

        function setAllFollowingUsers(userId) {
            vm.allFollowing=[];
            //vm.AllFollowing=following
            //sets the all following users
            // should be called in init()
        }

        function selectReviewBox(index) {
            vm.selectedIndex = index;
            var editedReviewObject = {
                "_id": vm.reviews[index]._id,
                "title": vm.reviews[index]["title"],
                "description": vm.reviews[index]["description"],
                "seriesId": vm.reviews[index].seriesId,
                "userId": vm.reviews[index]["userId"],

            }
            vm.editedReviewObject = editedReviewObject;

        }

        function editReview(editReviewObj) {
            ReviewService
                .editReview(editReviewObj)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.reviews[vm.selectedIndex] = editReviewObj;
                        vm.selectedIndex = -1;
                        vm.review = {};
                        findUserBySeriesReviewUserId(vm.reviews);

                    }
                });
        }

        function undoReview() {
            vm.selectedIndex=-1;
        }
        
        function deleteReview(index_review) {
            var reviewId = vm.reviews[index_review]._id;
            ReviewService
                .deleteReview(reviewId)
                .then(function (response) {
                    var status = response.data;

                    if (status.n == 1 && status.ok == 1) {
                        vm.reviews.splice(index_review, 1);
                        vm.selectedIndex = -1;

                        findUserBySeriesReviewUserId(vm.reviews);

                    }
                });
            
        }




    }
})();

