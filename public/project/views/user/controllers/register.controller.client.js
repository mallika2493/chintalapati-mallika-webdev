/**
 * Created by mallika2493 on 2/14/17.
 */
(function(){
    angular
        .module("SeriesAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location,$scope) {
        var vm = this;
        vm.register = register;

        function register(user) {

            UserService.findUserByUsername(user.username)
                .success(function (user) {
                    vm.error="sorry username is taken";
                })
                .error(function () {
                    //if (!$scope.register.$invalid && user.password == user.veryPassword) {
                        UserService
                            .createUser(user)
                            .success(function (user) {
                                if (user.role == "actor") {
                                    //ActorService add for Actor model by add
                                    $location.url('/user/actor/series/' + user._id);
                                }
                                else if(user.role=="admin"){
                                    $location.url('/admin/'+user._id);
                                }
                                else {
                                    $location.url('/user/' + user._id);
                                }

                            })
                            .error(function () {
                                vm.error = "Sorry could not register";
                            })

                    //}

                })

        }


    }
})();