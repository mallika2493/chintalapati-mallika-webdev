/**
 * Created by mallika2493 on 2/15/17.
 */
/**
 * Created by mallika2493 on 2/15/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.updatePage=updatePage;
        vm.deletePage=deletePage;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }

        init();

        function updatePage() {


                PageService.updatePage(vm.pageId, vm.page);

                //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                ///user/:uid/website/:wid/page

        };
        function deletePage() {
            PageService.deletePage(vm.pageId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        };
    }
})();