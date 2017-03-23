/**
 * Created by mallika2493 on 2/14/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(user) {

            UserService.findUserByUsername(user.username)
                .success(function (user) {
                    vm.error="sorry username is taken";
                })
                .error(function () {
                    UserService
                        .createUser(user)
                        .success(function (user) {
                            $location.url('/user/' + user._id);

                        })
                        .error(function () {
                            vm.error="Sorry could not register";
                        })

                })

        }


    }
})();