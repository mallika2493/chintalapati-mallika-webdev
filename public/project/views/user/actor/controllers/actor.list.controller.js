/**
 * Created by mallika2493 on 4/12/17.
 */
(function(){
    angular
        .module("SeriesAppMaker")
        .controller("actorListController", actorListController);

    function actorListController($routeParams,$location, UserService,ActorService,loggedin,$rootScope,RouteService) {
        var vm = this;
        vm.seriesId = $routeParams.seriesId;

        vm.seriesName = $routeParams.searchTerm;
        vm.getStatusPage = getStatusPage;
        vm.logout=logout;


        function init() {
            vm.actors = [];
            vm.userId=loggedin.data._id;

            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;


                });
            console.log("im in actorlist");
            ActorService.getAllActorsForSeriesId(vm.seriesId)
                .success(function (actors) {

                    vm.actorsList=actors;
                    vm.actorsList.forEach(function (element, index, array) {
                        UserService.findUserById(vm.actorsList[index].userId)
                            .success(function (user) {
                                vm.actors.push(user);

                            })
                    })

                });
        }
        init();
        
        function getStatusPage(actor) {

            //RouteService.setParam(actor._id);
            $location.url("/user/actor/"+actor._id+"/loggedInUserId/series/"
                +vm.seriesId+"/serialName/"+vm.seriesName);
            
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