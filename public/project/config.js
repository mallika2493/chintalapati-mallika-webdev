(function () {
    angular
        .module("SeriesAppMaker")
        .config(configuration);

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        return $http.get('/api/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
            } else {
                $location.url('/login');
            }
        });
    };

    function configuration($routeProvider,$httpProvider, $locationProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
        $routeProvider
            .when("/home", {
                templateUrl: 'views/user/templates/home.view.client.html',
                controller: "homeGuestController",
                controllerAs: "model"

            })
            /*.when("/", {
                templateUrl: 'views/user/templates/home.view.client.html',
                controller: "homeController",
                controllerAs: "model"
            })*/
            .when("/home/login", {
                templateUrl: 'views/user/templates/login.home.view.client.html',
                controller: "homeController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/login", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: "loginController",
                controllerAs: "model"
                /*resolve: {
                    loggedin: checkLoggedin
                }*/
            })
            .when("/search/:searchTerm", {
                templateUrl: 'views/user/templates/search.view.client.html',
                controller: "searchGuestController",
                controllerAs: "model"
            })
            .when("/user/search/:searchTerm", {
                templateUrl: 'views/user/templates/search.view.client.html',
                controller: "searchController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin,
                    resolve: {
                        loggedin: checkLoggedin
                    }
                }
            })
            .when("/register", {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/EDIT", {
                templateUrl: 'views/user/templates/profile-EDIT.view.client.html',
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
        /*.when("/user/:uid", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: "profileController",
                controllerAs: "model"
            })*/
            .when("/user/actor/", {
                templateUrl: 'views/user/actor/templates/profile.actor.view.client.html',
                controller: "profileActorController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/actor/series/", {
                templateUrl: 'views/user/actor/templates/profile.actor.register.view.client.html',
                controller: "registerActorController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
        ///
            .when("/user1/secondUser/:uid2", {
                templateUrl: 'views/user/templates/profile-other-user-view.client.html',
                controller: "profileOtherController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }

            })
            .when("/user/search/:searchTerm", {
                templateUrl: 'views/user/templates/login.search.view.client.html',
                controller: "searchController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/user/LIKE", {
                templateUrl: 'views/user/templates/profile-LIKE.view.client.html',
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/user/actor/STATUS", {
                templateUrl: 'views/user/actor/templates/profile-actor-STATUS.view.client.html',
                controller: "profileActorController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/actor/EDIT", {
                templateUrl: 'views/user/actor/templates/profile-actor-EDIT.view.client.html',
                controller: "profileActorController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/actor/SERIES", {
                templateUrl: 'views/user/actor/templates/profile-actor-SERIES.view.client.html',
                controller: "profileActorController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/actor/LIKE", {
                templateUrl: 'views/user/actor/templates/profile-actor-LIKE.view.client.html',
                controller: "profileActorController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/actor/FOLLOWER", {
                templateUrl: 'views/user/actor/templates/profile-actor-FOLLOWER.view.client.html',
                controller: "profileActorController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/actor/FOLLOWING", {
                templateUrl: 'views/user/actor/templates/profile-actor-FOLLOWING.view.client.html',
                controller: "profileActorController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/FOLLOWER", {
                templateUrl: 'views/user/templates/profile-FOLLOWER.view.client.html',
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            }).when("/user/FOLLOWING", {
            templateUrl: 'views/user/templates/profile-FOLLOWING.view.client.html',
            controller: "profileController",
            controllerAs: "model",
            resolve: {
                loggedin: checkLoggedin
            }
        })
            .when("/user/actor/list/view/:seriesId/name/:searchTerm", {
                templateUrl: 'views/user/actor/templates/actor.list.view.client.html',
                controller: "actorListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/actor/:actorId/loggedInUserId/series/:seriesId" +
                "/serialName/:seriesName", {
                templateUrl: 'views/user/actor/templates/actor-STATUS.view.client.html',
                controller: "actorStatusController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/actor/:actorId/loggedInUserId/series", {
                templateUrl: 'views/user/actor/templates/actor-STATUS.view.client.html',
                controller: "actorStatusController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin", {
                templateUrl: 'views/user/admin/templates/admin.view.client.html',
                controller: "adminController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/user/other/LIKE", {
                templateUrl: 'views/user/templates/profile-other-LIKE.view.client.html',
                controller: "profileOtherController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/other/FOLLOWER", {
                templateUrl: 'views/user/templates/profile-other-FOLLOWER.view.client.html',
                controller: "profileOtherController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/other/FOLLOWING", {
                templateUrl: 'views/user/templates/profile-other-FOLLOWING.view.client.html',
                controller: "profileOtherController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            });


        // $locationProvider.html5Mode(true);
    }
})();