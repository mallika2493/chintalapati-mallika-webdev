/**
 * Created by mallika2493 on 2/15/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        vm.websiteId = $routeParams.wid;
        //vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        vm.createPage=createpage;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }

        init();

        function createpage(page) {
            if (page != null) {

                PageService.createPage(vm.websiteId, page);

                //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
                $location.url("/user/" + vm.userId + "/website/"+vm.websiteId+"/page");
                ///user/:uid/website/:wid/page
            }
        }
        ;
    }
})();