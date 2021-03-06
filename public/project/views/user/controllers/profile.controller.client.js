/**
 * Created by mallika2493 on 2/14/17.
 */

(function () {
    angular
        .module("SeriesAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, $location, UserService, SeriesService,ActorService,$rootScope,loggedin) {
        var vm = this;
        //vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.getChoiceView = getChoiceView;
        vm.setChoice = setChoice;
        vm.getlikeDetails = getLikeDetails;
        vm.searchShow = searchShow;
        vm.getFollowers = getFollowers;
        vm.getFollowing = getFollowing;
        vm.logout=logout;

        var userId = loggedin.data._id;


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
            vm.userId=loggedin.data._id;
            vm.series = [];
            vm.followers = [];
            vm.following_users = [];
            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                    if(vm.user.role=="actor"){
                        $location.url("/user/actor/");
                    }

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
                    .then(function () {
                        UserService.findUsersToDeleteFromFollowers(user._id)
                            .then(function (response1) {
                                var deleteFromFollowers=response1.data;
                                deleteFromFollowers.forEach(function (element, index, array) {
                                    UserService.removeFromFollowers(deleteFromFollowers[index]._id, user._id);
                                })
                                UserService.findUsersToDeleteFromFollowing(user._id)
                                    .then(function (response2) {
                                        var deleteFromFollowing=response2.data;
                                        deleteFromFollowing.forEach(function (element, index, array) {
                                            UserService.removeFromFollowing(deleteFromFollowing[index]._id,user._id);
                                        })
                                    });
                            });
                    })
                    .then(function () {
                        if(user.role=="actor") {
                            ActorService.findActorByUserId(user._id)
                                .then(function (actor) {
                                    ActorService.deleteActor(actor.data._id)
                                        .success(function () {
                                            $location.url("/login");
                                        })
                                })

                        }
                        else{
                            $location.url("/login");
                        }

                    })
                    /*.error(function () {
                        vm.error = 'unable to remove user';
                    });*/
            }
        }

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
                $location.url("/user/search/" + searchTerm);
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

        function logout(){
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                )
        }


    }
})();