(function(){
    angular
        .module("SeriesAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location,$rootScope) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var promise = UserService
                .findUserByCredentials(user.username, user.password)
                .success(function (user) {
                    $rootScope.currentUser = user;
                    if(user!=null && user.role=="admin"){
                        $location.url('/admin/'+user._id);
                    }
                else if(user != null && user.role!="admin") {
                    $location.url('/home/'+user._id);
                } else {
                    vm.error = 'user not found';
                }
            })
                .error(function(err) {
                    vm.error = 'user not found';
                });

        }
    }
})();