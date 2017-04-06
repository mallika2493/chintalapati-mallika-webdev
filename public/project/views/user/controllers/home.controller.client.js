/**
 * Created by mallika2493 on 4/5/17.
 */

(function(){
    angular
        .module("SeriesAppMaker")
        .controller("homeController",homeController);
    function homeController($routeParams,$location, UserService) {
        var vm = this;

        vm.searchShow = searchShow;
        vm.findUserByUserId=findUserByUserId;

        function init() {
            vm.userId=$routeParams.uid;
            if(vm.userId!=null){

                findUserByUserId(vm.userId);


            }
        }
        init();
        function searchShow(searchTerm) {
            if(vm.userId==null)
            $location.url("/search/"+searchTerm);
            else{
                $location.url("/user/"+vm.userId+"/search/"+searchTerm);
            }

        }
        function findUserByUserId(userId) {
            var promise = UserService
                .findUserById(userId)
                .success(function (user) {
                    vm.user=user;

                });

        }

    }




})();

