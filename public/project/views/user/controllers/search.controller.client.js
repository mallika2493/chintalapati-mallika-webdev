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

    function searchController($routeParams,$location, TvShowService,UserService,ReviewService) {
        var vm=this;
        vm.searchShow = searchShow;
        vm.findUserByUserId=findUserByUserId;
        vm.setLikeStatus=setLikeStatus;
        vm.isShowLiked=isShowLiked;
        vm.addReview=addReview;


        function init() {
            vm.userId = $routeParams.uid;

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
                            var cast=response.data;
                            vm.cast=cast;
                            isShowLiked(id);
                            findAllReviewsBySeriesId(id);

                        });
               });

        }

        function findUserByUserId(userId) {
            var promise = UserService
                .findUserById(userId)
                .success(function (user) {
                    vm.user=user;
                    //vm.user.status="like";
                });

        }

        function setLikeStatus(likeStatus) {

            UserService
                .setLikeStatus(likeStatus,vm.userId, vm.id)
                .then(function (response) {
                    var status = response.data;

                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.user.status=likeStatus;
                        //return SeriesService.addSeries(vm.shows);
                    }
                })
                .then(function (response) {
                    console.log("Series Inserted !");
                });
            //vm.user.status=status;
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
                        //vm.selectedIndex = -1;
                        //vm.review = {};
                        vm.reviews.push(response.data);
                        findUserBySeriesReviewUserId(vm.reviews);
                        //movieAvgRatingByMovieId(vm.reviews);
                        //return SeriesService.addSeries(vm.series);
                    }
                })
                .then(function (response) {
                    console.log("Series Inserted !");
                });

        }

        function findUserBySeriesReviewUserId(reviews) {
            reviews.forEach(function (element, index, array) {
                UserService.findUserById(reviews[index].userId)
                    .then(function (response) {
                        if (response.data) {
                            reviews[index].userFirstName = response.data.firstName;
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




    }
})();

