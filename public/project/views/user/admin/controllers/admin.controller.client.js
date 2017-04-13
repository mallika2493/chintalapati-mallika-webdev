/**
 * Created by mallika2493 on 4/13/17.
 */

(function(){
    angular
        .module("SeriesAppMaker")
        .controller("adminController", adminController);

    function adminController($routeParams,UserService, $location,$rootScope) {
        var vm = this;
        vm.getAllRegUsers = getAllRegUsers;
        vm.deleteUserAdmin=deleteUserAdmin;
        vm.select=select;
        vm.update=update;
        vm.AddNewUser=AddNewUser;

        function init() {
            vm.userId=$routeParams['uid'];
            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    if (user != null) {
                        vm.user = user;
                    }
                })
                .error(function () {
                });

            getAllRegUsers();
            //getAllHotels();
            //getAllReviews();
            
        }
        
        init();
        
        function getAllRegUsers() {
            UserService.getAllRegUsers()
                .success(function (users) {
                    vm.users = users;
                })
            
        }

        function deleteUserAdmin(user,index) {
            var userId = vm.users[index]._id;
            UserService
                .deleteUser(userId)
                .then(function (response) {
                    UserService
                        .getAllRegUsers()
                        .then(function (users) {
                            console.log("set user");
                            vm.users = users;
                            getAllRegUsers();
                        },function (err) {
                            res.sendStatus(404).send(err);
                        })
                },function (err) {
                    res.sendStatus(err);
                });

        }

        function select(user) {
            vm.inputUser = angular.copy(user);
            vm.selected = 0;
        }

        function update(user) {
            console.log(user._id);
            UserService.updateUser(user._id,user)
                .success(function (user) {
                    vm.user = user;
                    getAllRegUsers();
                    vm.inputUser=null;
                })
        }

        function AddNewUser(user) {
            UserService.createUser(user)
                .success(function (user) {
                    vm.user = user;
                    getAllRegUsers();
                })
        }

    }
})();
