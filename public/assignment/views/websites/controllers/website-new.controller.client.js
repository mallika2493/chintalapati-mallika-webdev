(function(){
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            var promise = WebsiteService.findAllWebsitesForUser(vm.userId)
                .success(function (websites) {

                    vm.websites=websites;
                });
        }

        init();

        function createWebsite(website) {
                   WebsiteService
                            .createWebsite(vm.userId,website)
                            .success(function (website) {
                                $location.url("/user/" + vm.userId + "/website");

                            })
                            .error(function () {
                                vm.error="Sorry could not create website";
                            })




        };
    }
})();