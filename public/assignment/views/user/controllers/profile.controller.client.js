/**
 * Created by mallika2493 on 2/14/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, $location,UserService) {
        var vm = this;
        //vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        var userId = $routeParams['uid'];

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

            var promise = UserService
                .findUserById(userId)
                .success(function (user) {
                    vm.user=user;
                });

        }
        init();

        function deleteUser(user){
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                UserService
                    .deleteUser(user._id)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = 'unable to remove user';
                    });
            }
        }



    }
})();