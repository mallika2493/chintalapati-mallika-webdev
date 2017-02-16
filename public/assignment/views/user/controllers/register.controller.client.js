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
            var loginUser = UserService.findUserByCredentials(user.username,user.password);
            if(loginUser == null){
                loginUser= UserService.createUser(user);
                $location.url('/user/' + loginUser._id);
            }
            else{
             //alert user already exists
            }


        }


    }
})();