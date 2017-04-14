/**
 * Created by mallika2493 on 4/13/17.
 */

(function(){
    angular
        .module("SeriesAppMaker")
        .controller("adminController", adminController);

    function adminController($routeParams,UserService,SeriesService,ReviewService,TvShowService,StatusService,ActorService, $location,$rootScope) {
        var vm = this;
        vm.getAllRegUsers = getAllRegUsers;
        vm.deleteUserAdmin=deleteUserAdmin;
        vm.select=select;
        vm.update=update;
        vm.AddNewUser=AddNewUser;

        vm.getAllSeries=getAllSeries;
        vm.deleteSeries=deleteSeries;
        vm.getAllReviews=getAllReviews;
        vm.deleteReview=deleteReview;
        vm.getAllActorStatus=getAllActorStatus;
        vm.deleteStatus=deleteStatus;

        function init() {
            vm.userId=$routeParams['uid'];
            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    if (user != null) {
                        vm.user = user;
                    }
                })
                .error(function () {
                });

            getAllRegUsers();
            getAllSeries();
            getAllReviews();
            getAllActorStatus();
            
        }
        
        init();
        
        function getAllRegUsers() {
            UserService.getAllRegUsers()
                .success(function (users) {
                    vm.users = users;
                })
            
        }

        function deleteUserAdmin(user,index) {
            var userId = vm.users[index]._id;
            UserService
                .deleteUser(userId)
                .then(function (response) {
                    UserService
                        .getAllRegUsers()
                        .then(function (users) {
                            console.log("set user");
                            vm.users = users;
                            getAllRegUsers();
                        },function (err) {
                            res.sendStatus(404).send(err);
                        })
                },function (err) {
                    res.sendStatus(err);
                });

        }

        function select(user) {
            vm.inputUser = angular.copy(user);
            vm.selected = 0;
        }

        function update(user) {
            console.log(user._id);
            UserService.updateUser(user._id,user)
                .success(function (user) {
                    vm.user = user;
                    getAllRegUsers();
                    vm.inputUser=null;
                })
        }

        function AddNewUser(user) {
            UserService.createUser(user)
                .success(function (user) {
                    vm.user = user;
                    getAllRegUsers();
                    vm.inputUser=null;
                })
        }
        

        function getAllSeries() {
            SeriesService.getAllSeries()
                .success(function (s) {
                    vm.series = s;
                })

        }

        function deleteSeries(show) {
            SeriesService.deleteSeries(show)
                .then(function (response1) {
                    UserService.findUsersWhoLikedSeries(show._id)
                        .then(function (response2) {
                            var usersWhoLiked=response2.data;
                            for(var i in usersWhoLiked){
                                UserService.setLikeStatus('unlike',usersWhoLiked[i]._id,show._id);
                            }
                            
                        });

                })
                .then(function (response) {
                    SeriesService
                        .getAllSeries()
                        .then(function (series) {

                            vm.series = series.data;

                        },function (err) {
                            res.sendStatus(404).send(err);
                        })
                },function (err) {
                    res.sendStatus(err);
                });;

        }

        function getAllReviews() {

                ReviewService
                    .getAllReviews()
                    .success(function (reviews) {
                        reviews.forEach(function (element, index, array) {
                            TvShowService
                                .searchShowById(reviews[index].seriesId)
                                .then(function (response) {
                                    reviews[index].name=response.data.name;
                                    UserService.findUserById(reviews[index].userId)
                                        .then(function (response2) {
                                            reviews[index].username=response2.data.username;



                                        })


                                });


                    })
                        vm.reviews = reviews;

        })
        }

        function deleteReview(review) {
            var reviewId = review._id;
            ReviewService
                .deleteReview(reviewId)
                .then(function (response) {
                    getAllReviews();

                });
        }
        
        function getAllActorStatus() {
            StatusService.getAllActorStatus()
                .success(function (statusList) {
                    statusList.forEach(function (element, index, array) {
                        ActorService.findActorByActorId(statusList[index].actorId)
                            .then(function (response) {
                                UserService.findUserById(response.data.userId)
                                    .then(function (response1) {
                                        statusList[index].username=response1.data.username;

                                    })
                            });
                    });
                vm.statusList = statusList;
            })
        }

        function deleteStatus(status) {
            var statusId = status._id;
            StatusService
                .deleteStatus(statusId)
                .then(function (response) {
                    getAllActorStatus();
                });

        }
    }
})();
