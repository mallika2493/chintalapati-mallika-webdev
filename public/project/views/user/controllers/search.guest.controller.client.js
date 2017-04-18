/**
 * Created by mallika2493 on 4/15/17.
 */

/**
 * Created by mallika2493 on 3/30/17.
 */
/**
 * Created by mallika2493 on 3/20/17.
 */
(function(){
    angular
        .module("SeriesAppMaker")
        .controller("searchGuestController", searchGuestController);

    function searchGuestController($routeParams,$location, TvShowService,UserService,ReviewService) {
        var vm=this;
        vm.searchShow = searchShow;




        function init() {

            vm.searchTerm = $routeParams.searchTerm;
            searchShow(vm.searchTerm);


        }
        init();
        function searchShow(searchTerm) {
            var id;
            TvShowService
                .searchShow(searchTerm)
                .then(function (response) {
                    if(response.data.length==0){
                        vm.error="Sorry show not found!!";

                    }
                    else {
                        var data = response.data;
                        var sh = [data[0]];
                        var summary = sh[0].show.summary;
                        cleanText = summary.replace(/<\/?[^>]+(>|$)/g, "");
                        sh[0].show.summary = cleanText;
                        id = sh[0].show.id;
                        vm.shows = sh;

                        vm.id = id;
                        TvShowService.getCastDetails(id)
                            .then(function (response) {
                                var cast = response.data;
                                vm.cast = cast;
                                findAllReviewsBySeriesId(id);


                            });
                    }
                });

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


    }
})();


