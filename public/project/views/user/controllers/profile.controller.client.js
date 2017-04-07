/**
 * Created by mallika2493 on 2/14/17.
 */

(function(){
    angular
        .module("SeriesAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, $location,UserService,SeriesService) {
        var vm = this;
        //vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.getChoiceView=getChoiceView;
        vm.setChoice=setChoice;
        vm.getlikeDetails=getLikeDetails;

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
            vm.series=[];
            UserService
                .findUserById(userId)
                .success(function (user) {
                    vm.user=user;
                    getLikeDetails();
                });
            vm.choice=null;


        }
        init();

        function deleteUser(user){
            var answer = confirm("Are you sure?");
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

        function setChoice(choice) {
            vm.choice=choice;
            if(choice=='LIKE'){
            getLikeDetails();
            }


        }

        function getChoiceView(choice) {
            var url="views/user/templates/profile-"+choice+".view.client.html";
            return url;

        }
        
        function getLikeDetails() {

            for(var like in vm.user.likes){
                var series_id = vm.user.likes[like];
                SeriesService.findSeriesById(series_id)
                    .then(function (series) {
                        vm.series.push(series);


                    });


            }
            
        }



    }
})();