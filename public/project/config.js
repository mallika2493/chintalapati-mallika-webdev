(function () {
    angular
        .module("SeriesAppMaker")
        .config(configuration);

    function configuration($routeProvider, $locationProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: 'views/user/templates/home.view.client.html',
                controller: "homeController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: 'views/user/templates/home.view.client.html',
                controller: "homeController",
                controllerAs: "model"
            })
            .when("/home/:uid", {
                templateUrl: 'views/user/templates/login.home.view.client.html',
                controller: "homeController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/search/:searchTerm", {
                templateUrl: 'views/user/templates/search.view.client.html',
                controller: "searchController",
                controllerAs: "model"
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
        .when("/user/:uid", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/user/actor/:uid", {
                templateUrl: 'views/user/actor/templates/profile.actor.view.client.html',
                controller: "profileActorController",
                controllerAs: "model"
            })
            .when("/user/actor/series/:uid", {
                templateUrl: 'views/user/actor/templates/profile.actor.register.view.client.html',
                controller: "registerActorController",
                controllerAs: "model"
            })
        ///
            .when("/user1/:uid1/secondUser/:uid2", {
                templateUrl: 'views/user/templates/profile-other-user-view.client.html',
                controller: "profileOtherController",
                controllerAs: "model"
            })
            .when("/user/:uid/search/:searchTerm", {
                templateUrl: 'views/user/templates/login.search.view.client.html',
                controller: "searchController",
                controllerAs: "model"
            })

            .when("/user/:uid/LIKE", {
                templateUrl: 'views/user/templates/profile-LIKE.view.client.html',
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/user/:uid/actor/list/view/:seriesId/name/:searchTerm", {
                templateUrl: 'views/user/actor/templates/actor.list.view.client.html',
                controller: "actorListController",
                controllerAs: "model"
            })
            .when("/user/actor/:actorId/loggedInUserId/:loggedInUserId/series/:seriesId" +
                "/serialName/:seriesName", {
                templateUrl: 'views/user/actor/templates/actor-STATUS.view.client.html',
                controller: "actorStatusController",
                controllerAs: "model"
            })
            .when("/admin/:uid", {
                templateUrl: 'views/user/admin/templates/admin.view.client.html',
                controller: "adminController",
                controllerAs: "model"
            });

        function checkLoggedin($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get('/api/loggedin').success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                    $location.url('/user/'+$rootScope.currentUser._id);
                } else {
                    deferred.reject();
                    $location.url('/');
                }
            });
            return deferred.promise;
        };


        // $locationProvider.html5Mode(true);
    }
})();