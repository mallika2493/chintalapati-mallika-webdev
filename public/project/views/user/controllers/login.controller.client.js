(function(){
    angular
        .module("SeriesAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location,$rootScope) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var promise =  UserService.login(user)
                .success(function (user) {
                    $rootScope.currentUser = user;
                    if(user!=null && user.role=="admin"){
                        $location.url('/admin');
                    }
                else if(user != null && user.role!="admin") {
                    $location.url('/home/login');
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