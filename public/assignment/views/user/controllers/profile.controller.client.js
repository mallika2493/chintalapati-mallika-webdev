/**
 * Created by mallika2493 on 2/14/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, $location,UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        var userId = $routeParams['uid'];
        vm.update = function (newUser) {
            var user = UserService.updateUser(userId, newUser);
            if(user == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated"
            }
        };

        var user = UserService.findUserById(userId);
        vm.user = user;

        function updateUser(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if(user == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated"
            }
        };
        function deleteUser(){
            var user = UserService.deleteUser(userId);
            $location.url("/login");
        }



    }
})();