/**
 * Created by mallika2493 on 4/10/17.
 */
/**
 * Created by mallika2493 on 4/8/17.
 */
(function () {
    angular
        .module("SeriesAppMaker")
        .controller("registerActorController", registerActorController);

    function registerActorController($routeParams, $location, UserService,TvShowService,ActorService) {
        var vm = this;
        //vm.updateUser = updateUser;
        //vm.deleteUser = deleteUser;
        vm.getChoiceView = getChoiceView;
        vm.setChoice = setChoice;
        /*vm.getlikeDetails = getLikeDetails;
        vm.searchShow = searchShow;
        vm.getFollowers = getFollowers;
        vm.getFollowing = getFollowing;*/
        vm.registerActor = registerActor;

        //var userId = $routeParams['uid'];

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
            var userId = $routeParams['uid'];
            vm.userId=userId;
            UserService
                .findUserById(userId)
                .success(function (user) {
                    vm.user = user;
                    // getLikeDetails();
                    // getFollowers();
                    // getFollowing();

                });

        }

        init();

        function setChoice(choice) {
            vm.choice = choice;
            if (choice == 'LIKE') {
                //getLikeDetails();
            }
            if (choice == 'FOLLOWER') {
                //getFollowers();
            }


        }

        function getChoiceView(choice) {
            var url = "views/user/templates/profile-" + choice + ".view.client.html";
            return url;

        }



        function registerActor(actor) {


                 //getSeriesIdBySeriesName(actor.series)
            TvShowService
                .searchShow(actor.series)
                .then(function (response) {
                    var data = response.data;
                    var sh = [data[0]];

                    id = sh[0].show.id;

                    actor.series =id;
                    actor.userId=vm.userId;
                    ActorService
                        .createActor(actor)
                        .then(function (user) {

                            //ActorService add for Actor model by add


                        });
                    $location.url('/user/actor/'+vm.userId);
                        /*.error(function () {
                            vm.error="Sorry could not register";
                        })*/
                });


        }

        function getSeriesIdBySeriesName(searchTerm) {

                var id;
                TvShowService
                    .searchShow(searchTerm)
                    .then(function (response) {
                        var data = response.data;
                        var sh = [data[0]];

                        id = sh[0].show.id;
                        return id;
                    });

        }


        /*function init() {
            vm.series = [];
            vm.followers = [];
            vm.following_users = [];
            UserService
                .findUserById(userId)
                .success(function (user) {
                    vm.user = user;
                    getLikeDetails();
                    getFollowers();
                    getFollowing();

                });
            vm.choice = null;


        }

        init();

        function deleteUser(user) {
            var answer = confirm("Are you sure?");
            if (answer) {
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



        function getLikeDetails() {

            for (var like in vm.user.likes) {
                var series_id = vm.user.likes[like];
                SeriesService.findSeriesById(series_id)
                    .then(function (series) {
                        vm.series.push(series);


                    });


            }

        }

        function searchShow(searchTerm) {
            if (vm.user._id == null)
                $location.url("/search/" + searchTerm);
            else {
                $location.url("/user/" + vm.user._id + "/search/" + searchTerm);
            }

        }

        function getFollowers() {
            vm.followers = [];

            for (var f in vm.user.followers) {
                UserService
                    .findUserById(vm.user.followers[f])
                    .success(function (user) {
                        vm.followers.push(user);

                    });


            }
        }

        function getFollowing() {
            vm.following_users = [];
            for (var f in vm.user.following) {
                UserService
                    .findUserById(vm.user.following[f])
                    .success(function (user) {
                        vm.following_users.push(user);

                    });

            }
        }

*/
    }
})();
