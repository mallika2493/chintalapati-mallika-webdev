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

    function profileActorController($routeParams, $location, UserService,TvShowService,ActorService,StatusService,SeriesService,loggedin,$rootScope) {
        var vm = this;
        //vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.getChoiceView = getChoiceView;
        vm.setChoice = setChoice;
        vm.addStatus = addStatus;
        vm.selectStatusBox=selectStatusBox;
        vm.editStatus=editStatus;
        vm.undoStatus=undoStatus;
        vm.deleteStatus=deleteStatus;
        vm.searchShow = searchShow;
        vm.deleteShow=deleteShow;
        vm.addShow=addShow;
        vm.getlikeDetails = getLikeDetails;
        vm.logout=logout;
        vm.deleteUser=deleteUser;
        vm.shows=[];


        vm.update = function (newUser) {
            var user = UserService.updateUser(loggedin.data._id, newUser)
                .success(function (response) {
                    vm.message = "user successfully updated"
                })
                .error(function () {
                    vm.error = "unable to update user";

                });

        };


        function init() {
            vm.choice = null;
            vm.userId=loggedin.data._id;


            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                    if(user.role=="actor"){
                    ActorService.findActorByUserId(vm.userId).success(function (actor) {
                        vm.actor=actor;
                        vm.actorId=actor._id;
                        findAllStatusByActorId(vm.actor._id);
                        getLikeDetails();
                        getSeries();
                        getFollowers();
                        getFollowing();
                    })
                    }



                });

        }

        init();
        
        function getSeries() {
            var show={};
            var series=[];
            vm.shows=[];

            //for(var i in vm.actor.series){
            for(var index in vm.actor.series){
            TvShowService.searchShowById(vm.actor.series[index])
                .then(function (response) {

                    show={
                        "name":response.data.name,
                        "image":response.data.image.original,
                        "id":response.data.id
                    }
                    vm.shows.push(show);


                });

            }


            
        }

        function searchShow(searchTerm) {
            if (vm.userId == null)
                $location.url("/search/" + searchTerm);
            else {
                $location.url("/user/search/" + searchTerm);
            }

        }

        function findAllStatusByActorId(actorId) {
            StatusService
                .findAllStatusByActorId(actorId)
                .then(function (response) {
                    if (response.data) {
                        vm.statusList = response.data;

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
            if(choice=='EDIT'){
                return "views/user/templates/profile-" + choice + ".view.client.html";
            }
            else{
            return "views/user/actor/templates/profile-actor-" + choice + ".view.client.html";
            }

        }

        function addStatus(status) {

            StatusService
                .addStatus(vm.actor._id,status)
                .then(function (response) {
                    if (response.data) {
                        vm.selectedIndex = -1;

                        vm.status = {};
                        vm.statusList.push(response.data);
                        return //findUserBySeriesReviewUserId(vm.reviews);

                    }
                })
                .then(function (response) {

                });

        }

        function selectStatusBox(index) {
            vm.selectedIndex = index;
            var editedStatusObject = {
                "_id": vm.statusList[index]._id,
                "description": vm.statusList[index]["description"],
                "url":vm.statusList[index].url,
                "actorId": vm.statusList[index].actorId


            }
            vm.editedStatusObject = editedStatusObject;

        }

        function editStatus(editStatusObj) {
            StatusService
                .editStatus(editStatusObj)
                .then(function (response) {
                    var status = response.data;

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



                    }
                });
        }

        function deleteShow(index_status) {
            var showId = vm.shows[index_status].id;
            ActorService
                .deleteShow(vm.actorId,showId)
                .then(function (response) {
                    var status = response.data;

                    if (status.n == 1 && status.ok == 1) {
                        vm.shows.splice(index_status, 1);




                    }
                });
        }

        function addShow(newShow) {
            var show = {};
            TvShowService
                .searchShow(newShow)
                .then(function (response) {

                    var show={
                        "name":response.data[0].show.name,
                        "image":response.data[0].show.image.original,
                        "id":response.data[0].show.id.toString()
                    }
                    ActorService.addToSeriesForActor(vm.actor._id,response.data[0].show.id.toString())
                        .then(function (response1) {
                            if (response1.data) {
                                vm.selectedIndex = -1;


                                vm.shows.push(show);
                                return //findUserBySeriesReviewUserId(vm.reviews);

                            }
                        })
                        .then(function (response) {

                        });

                });


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

        function getLikeDetails() {
            vm.ser=[];
            for (var like in vm.user.likes) {
                var series_id = vm.user.likes[like];
                SeriesService.findSeriesById(series_id)
                    .then(function (series) {
                        vm.ser.push(series);


                    });


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



    }
})();

