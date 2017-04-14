/**
 * Created by mallika2493 on 4/5/17.
 */

(function(){
    angular
        .module("SeriesAppMaker")
        .controller("homeController",homeController);
    function homeController($routeParams,$location, UserService,$rootScope,loggedin) {
        var vm = this;

        vm.searchShow = searchShow;
        vm.findUserByUserId=findUserByUserId;
        vm.logout=logout;

        function init() {

            //vm.userId=$routeParams.uid;
            vm.userId=loggedin.data._id;
            if(vm.userId!=null){

                findUserByUserId(vm.userId);


            }
        }
        init();
        function searchShow(searchTerm) {
            if(vm.userId==null)
            $location.url("/search/"+searchTerm);
            else{
                $location.url("/user/search/"+searchTerm);
            }

        }
        function findUserByUserId(userId) {
            var promise = UserService
                .findUserById(userId)
                .success(function (user) {
                    vm.user=user;

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

