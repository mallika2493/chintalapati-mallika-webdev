(function(){
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {

            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();

        function createWebsite(website) {
            if (website != null) {

                WebsiteService.createWebsite(vm.userId, website);
                console.log(website._id);
                //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
                $location.url("/user/" + vm.userId + "/website");
            }
        }
    ;
    }
})();