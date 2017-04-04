(function () {
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider,$httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
        $routeProvider
            .when("/login", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: "profileController",
                controllerAs: "model"
            })

            .when("/", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: "loginController",
                controllerAs: "model"
            })
            .when("default", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/user/:uid/website", {
                templateUrl: 'views/websites/templates/website-list.view.client.html',
                controller: "websiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: 'views/websites/templates/website-new.view.client.html',
                controller: "websiteNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: 'views/websites/templates/website-edit.view.client.html',
                controller: "websiteEditController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page", {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: "pageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: "pageNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: "pageEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: "widgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: 'views/widget/templates/widget-CHOOSER.view.client.html',
                controller: "widgetNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: "widgetEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/flickr", {
                templateUrl: 'views/widget/templates/widget-FLICKR-search-view.client.html',
                controller: "widgetFlickController",
                controllerAs: "model"
            })
            .otherwise({
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: "loginController",
                controllerAs: "model"
            });


        // $locationProvider.html5Mode(true);
    }
})();