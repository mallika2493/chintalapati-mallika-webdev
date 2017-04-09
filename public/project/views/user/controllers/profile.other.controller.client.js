/**
 * Created by mallika2493 on 4/8/17.
 */
(function () {
    angular
        .module("SeriesAppMaker")
        .controller("profileOtherController", profileOtherController);

    function profileOtherController($routeParams, $location, UserService, SeriesService) {
        var vm = this;

        vm.getChoiceView = getChoiceView;
        vm.setChoice = setChoice;
        vm.getlikeDetails = getLikeDetails;
        vm.getFollowers = getFollowers;
        vm.follow = follow;
        vm.unfollow = unfollow;
        vm.getFollowing=getFollowing;


        function init() {
            vm.series = [];
            vm.followers = [];
            vm.following_users = [];
            vm.userId = $routeParams['uid1'];
            vm.secondUserId = $routeParams['uid2'];
            UserService
                .findUserById(vm.secondUserId)
                .success(function (user) {
                    vm.secondUser = user;
                    getLikeDetails();
                    getFollowers();
                    getFollowing();
                });
            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                    isLoggedInUserFollowing();
                });
            vm.choice = null;

        }

        init();

        function isLoggedInUserFollowing() {
            vm.following=false;
            for(var f in vm.user.following){
                if(vm.user.following[f]==vm.secondUserId){
                    vm.following=true;
                    break;
                }
            }

        }

        function setChoice(choice) {
            vm.choice = choice;
            if (choice == 'LIKE') {
                //getLikeDetails();
            }
            if (choice == 'FOLLOWER') {
                vm.allFollowing=[];
                //getFollowers();
            }

        }

        function getChoiceView(choice) {
            var url = "views/user/templates/profile-other-" + choice + ".view.client.html";
            return url;

        }

        function getLikeDetails() {

            for (var like in vm.secondUser.likes) {
                var series_id = vm.secondUser.likes[like];
                SeriesService.findSeriesById(series_id)
                    .then(function (series) {
                        vm.series.push(series);
                    });
            }
        }

        function getFollowers() {
            vm.followers = [];
            for (var f in vm.secondUser.followers) {
                UserService
                    .findUserById(vm.secondUser.followers[f])
                    .success(function (user) {
                        vm.followers.push(user);
                    });
            }
        }
        function follow() {
            //vm.allFollowing=[];
            vm.following=false;
            UserService
                .follow(vm.userId, vm.secondUserId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        //vm.allFollowing.push(vm.secondUserId);
                        vm.following=true;
                    }

                });

        }

        function unfollow() {
            vm.allFollowing=[];

            UserService
                .unfollow(vm.userId, vm.secondUserId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        //vm.allFollowing.push(vm.secondUserId);
                        vm.following=false;
                    }

                });

        }

        function getFollowing() {
            //vm.following_users = [];
            for (var f in vm.secondUser.following) {
                UserService
                    .findUserById(vm.secondUser.following[f])
                    .success(function (user) {
                        vm.following_users.push(user);

                    });

            }
        }


    }
})();
