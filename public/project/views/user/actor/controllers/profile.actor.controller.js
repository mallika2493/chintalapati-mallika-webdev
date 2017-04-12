/**
 * Created by mallika2493 on 4/11/17.
 */

/**
 * Created by mallika2493 on 4/10/17.
 */
/**
 * Created by mallika2493 on 4/8/17.
 */
(function () {
    angular
        .module("SeriesAppMaker")
        .controller("profileActorController", profileActorController);

    function profileActorController($routeParams, $location, UserService,TvShowService,ActorService,StatusService) {
        var vm = this;
        //vm.updateUser = updateUser;
        //vm.deleteUser = deleteUser;
        vm.getChoiceView = getChoiceView;
        vm.setChoice = setChoice;
        vm.addStatus = addStatus;
        vm.selectStatusBox=selectStatusBox;
        vm.editStatus=editStatus;
        vm.undoStatus=undoStatus;
        vm.deleteStatus=deleteStatus;
        /*vm.getlikeDetails = getLikeDetails;
         vm.searchShow = searchShow;
         vm.getFollowers = getFollowers;
         vm.getFollowing = getFollowing;*/

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
            vm.choice = null;
            var userId = $routeParams['uid'];
            vm.userId=userId;
            vm.actorId=null;
            UserService
                .findUserById(userId)
                .success(function (user) {
                    vm.user = user;
                    if(user.role=="actor"){
                    ActorService.findActorByUserId(userId).success(function (actor) {
                        vm.actor=actor;
                        vm.actorId=actor._id;
                        findAllStatusByActorId(vm.actor._id);
                    })
                    }
                    // getLikeDetails();
                    // getFollowers();
                    // getFollowing();

                });

        }

        init();

        function findAllStatusByActorId(actorId) {
            StatusService
                .findAllStatusByActorId(actorId)
                .then(function (response) {
                    if (response.data) {
                        vm.statusList = response.data;
                        //findUserBySeriesReviewUserId(vm.reviews);
                        //movieAvgRatingByMovieId(vm.reviews);

                    }
                });
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
            var url = "views/user/actor/templates/profile-actor-" + choice + ".view.client.html";
            return url;

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

        function addStatus(status) {

            StatusService
                .addStatus(vm.actor._id,status)
                .then(function (response) {
                    if (response.data) {
                        vm.selectedIndex = -1;

                        //vm.review = {};
                        vm.statusList.push(response.data);
                        return //findUserBySeriesReviewUserId(vm.reviews);

                    }
                })
                .then(function (response) {
                    console.log("Series Inserted !");
                });

        }

        function selectStatusBox(index) {
            vm.selectedIndex = index;
            var editedStatusObject = {
                "_id": vm.statusList[index]._id,
                "description": vm.statusList[index]["description"],
                "actorId": vm.statusList[index].actorId


            }
            vm.editedStatusObject = editedStatusObject;

        }

        function editStatus(editStatusObj) {
            StatusService
                .editStatus(editStatusObj)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        vm.statusList[vm.selectedIndex] = editStatusObj;
                        vm.selectedIndex = -1;
                        //vm.review = {};
                        //findUserBySeriesReviewUserId(vm.reviews);

                    }
                });
        }

        function undoStatus() {
            vm.selectedIndex=-1;
        }

        function deleteStatus(index_status) {
            var statusId = vm.statusList[index_status]._id;
            StatusService
                .deleteStatus(statusId)
                .then(function (response) {
                    var status = response.data;

                    if (status.n == 1 && status.ok == 1) {
                        vm.statusList.splice(index_status, 1);
                        vm.selectedIndex = -1;

                        //findUserBySeriesReviewUserId(vm.reviews);

                    }
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

