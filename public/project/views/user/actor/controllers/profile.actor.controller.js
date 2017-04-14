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

    function profileActorController($routeParams, $location, UserService,TvShowService,ActorService,StatusService,loggedin) {
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
        vm.searchShow = searchShow;
        vm.deleteShow=deleteShow;
        vm.addShow=addShow;
        /*vm.getlikeDetails = getLikeDetails;

         vm.getFollowers = getFollowers;
         vm.getFollowing = getFollowing;*/

        //var userId = $routeParams['uid'];

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

            vm.actorId=null;
            vm.shows=[];
            UserService
                .findUserById(userId)
                .success(function (user) {
                    vm.user = user;
                    if(user.role=="actor"){
                    ActorService.findActorByUserId(userId).success(function (actor) {
                        vm.actor=actor;
                        vm.actorId=actor._id;
                        findAllStatusByActorId(vm.actor._id);
                        getSeries();
                    })
                    }



                });

        }

        init();
        
        function getSeries() {
            var show={};
            for(var i in vm.actor.series){
            TvShowService.searchShowById(vm.actor.series[i])
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
                $location.url("/user/" + vm.userId + "/search/" + searchTerm);
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
            if(choice!='STATUS' && choice!='SERIES')
                return "views/user/templates/profile-" + choice + ".view.client.html";
                //$location.url("/user/"+vm.userId+"/"+choice);
            else {
            var url = "views/user/actor/templates/profile-actor-" + choice + ".view.client.html";
            return url;
            }

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

                        vm.status = {};
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
                            console.log("Series Inserted !");
                        });

                });


        }
        function getSeriesIdBySeriesName(searchTerm) {

            var id;


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

