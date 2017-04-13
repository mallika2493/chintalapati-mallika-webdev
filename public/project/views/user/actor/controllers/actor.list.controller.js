/**
 * Created by mallika2493 on 4/12/17.
 */
(function(){
    angular
        .module("SeriesAppMaker")
        .controller("actorListController", actorListController);

    function actorListController($routeParams,$location, UserService,ActorService) {
        var vm = this;
        vm.seriesId = $routeParams.seriesId;
        vm.userId =  $routeParams.uid;
        vm.seriesName = $routeParams.searchTerm;
        vm.getStatusPage = getStatusPage;


        function init() {
            vm.actors = [];

            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;


                });
            console.log("im in actorlist");
            ActorService.getAllActorsForSeriesId(vm.seriesId)
                .success(function (actors) {

                    vm.actorsList=actors;
                    for(var i in vm.actorsList){
                        UserService.findUserById(vm.actorsList[i].userId)
                            .success(function (user) {
                                vm.actors.push(user);

                            })
                    }
                });
        }
        init();
        
        function getStatusPage(actor) {
            $location.url("/user/actor/"+actor._id+"/loggedInUserId/"+vm.userId+"/series/"
                +vm.seriesId+"/serialName/"+vm.seriesName);
            
        }
    }


})();