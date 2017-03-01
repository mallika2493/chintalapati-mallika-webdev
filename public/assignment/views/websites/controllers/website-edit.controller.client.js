(function(){
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            var promise1 = WebsiteService.findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                });

            var promise2 = WebsiteService.findAllWebsitesForUser(vm.userId)
                .success(function (websites) {

                    vm.websites=websites;
                });
        }
        init();

        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId)
                .success(function (website) {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function () {
                    vm.error="Sorry could not delete website";
                });
        }

        function updateWebsite() {
            WebsiteService.updateWebsite(vm.websiteId, vm.website)
                .success(function (website)
                {
                    $location.url("/user/"+vm.userId+"/website");

                })
                .error(function () {
                    vm.error="Sorry could not create website";
                });

        }
    }
})();