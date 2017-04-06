(function(){
    angular
        .module("SeriesAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var promise = UserService
                .findUserByCredentials(user.username, user.password)
                .success(function (user) {

                if(user != null) {
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