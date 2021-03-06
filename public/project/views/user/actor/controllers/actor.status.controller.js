/**
 * Created by mallika2493 on 4/12/17.
 */

/**
 * Created by mallika2493 on 4/12/17.
 */
(function(){
    angular
        .module("SeriesAppMaker")
        .controller("actorStatusController", actorStatusController);

    function actorStatusController($routeParams, UserService,StatusService,ActorService,$rootScope,loggedin,RouteService,$location) {
        var vm = this;
        vm.seriesId = $routeParams.seriesId;
        vm.userId =  loggedin.data._id;
        vm.seriesName = $routeParams.seriesName;

        vm.logout=logout;

        vm.findAllStatusByActorId=findAllStatusByActorId;
        /*/user/actor/:actorId/loggedInUserId/:loggedInuserId/series/:seriesId" +
        "/serialName/:seriesName*/

        function init() {
            vm.statusList=[];

            /*var id=RouteService.getParam();
            if(id!=undefined)
                $rootScope.secondUserId = id;
            vm.actorId = $rootScope.secondUserId;*/
            vm.actorId=$routeParams['actorId'];
            UserService
                .findUserById(vm.userId)
                .then(function (user) {
                    vm.user = user.data;
                    //fetch the status list for that actor
                    //and set status list
                    ActorService.findActorByUserId(vm.actorId)
                        .then(function (actor) {

                            UserService
                                .findUserById(actor.data.userId)
                                .then(function (actorUser) {
                                    vm.actorUser = actorUser.data;

                                })
                            findAllStatusByActorId(actor.data._id);


                    })


                });


        }
        init();
        function findAllStatusByActorId(actorId) {
            StatusService
                .findAllStatusByActorId(actorId)
                .then(function (response) {
                    if (response.data) {
                        vm.statusList = response.data;
                        //findUserBySeriesReviewUserId(vm.reviews);
                        //movieAvgRatingByMovieId(vm.reviews);

                    }
                });
        }
        function logout(){
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                )
        }



    }


})();
