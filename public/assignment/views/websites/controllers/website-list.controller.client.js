(function(){
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
    }
})();