/**
 * Created by mallika2493 on 4/10/17.
 */
/**
 * Created by mallika2493 on 4/8/17.
 */
(function () {
    angular
        .module("SeriesAppMaker")
        .controller("registerActorController", registerActorController);

    function registerActorController($routeParams, $location, UserService, TvShowService, ActorService,loggedin,$rootScope) {
        var vm = this;

        vm.registerActor = registerActor;
        vm.saveSeries = saveSeries;
        vm.undoSeries=undoSeries;
        vm.createActor=createActor;
        vm.logout=logout;

        //var userId = $routeParams['uid'];

        vm.update = function (newUser) {
            var user = UserService.updateUser(userId, newUser)
                .success(function (response) {
                    vm.message = "user successfully updated"
                })
                .error(function () {
                    vm.error = "unable to update user";

                });

        };


        function init() {
            var userId = loggedin.data._id;
            vm.userId = userId;

            vm.series = [];
            vm.actor = {};
            //getSeriesIdBySeriesName(actor.series)
            vm.actor.series = [];
            vm.actor.userId = vm.userId;

            UserService
                .findUserById(userId)
                .success(function (user) {
                    vm.user = user;

                });

            vm.confirm='empty';
        }

        init();



        function registerActor() {

            for(s in vm.series){
                TvShowService
                    .searchShow(vm.series[s])
                    .then(function (response) {
                        var data = response.data;
                        var sh = [data[0]];

                        id = sh[0].show.id;

                        vm.actor.series.push(id);


            });
            vm.confirm='true';

            }
        }

        function createActor() {
            ActorService
                .createActor(vm.actor)
                .then(function (ac) {
                });
            $location.url('/user/actor/');

        }

        function saveSeries(s) {

            vm.series.push(s);
            vm.s = null;

        }



        function undoSeries(s,index) {
            vm.series.splice(index,1);

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
