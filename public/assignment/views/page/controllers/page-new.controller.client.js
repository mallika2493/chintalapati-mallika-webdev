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
             PageService.findAllPagesForWebsite(vm.websiteId)
                 .success(function (page) {
                     vm.pages=page;
                 });
        }

        init();

        function createpage(page) {
            PageService.createPage(vm.websiteId, page)
                .success(function (website) {
                    $location.url("/user/" + vm.userId + "/website/"+vm.websiteId+"/page");

                })
                .error(function () {
                    vm.error="Sorry could not create page";
                })
        };
    }
})();