/**
 * Created by mallika2493 on 2/14/17.
 */
(function(){
    angular
        .module("SeriesAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location,$scope,$rootScope) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if (!$scope.register.$invalid && user.password == user.veryPassword) {

            UserService.findUserByUsernameDup(user.username)
                .success(function (user) {
                    vm.error="sorry username is taken";
                })
                .error(function () {

                        UserService
                            .register(user)
                            .success(function (user) {
                                if (user.role == "actor") {
                                    $rootScope.currentUser = user;
                                    //ActorService add for Actor model by add
                                    $location.url('/user/actor/series/');
                                }
                                else if(user.role=="admin"){
                                    $rootScope.currentUser = user;
                                    $location.url('/admin/');
                                }
                                else {
                                    $rootScope.currentUser = user;
                                    $location.url('/user/');
                                }

                            })
                            .error(function () {
                                vm.error = "Sorry could not register";
                            })



                })

        }
        else{
                vm.error="Please fill the required credentials";
            }
    }

    }
})();