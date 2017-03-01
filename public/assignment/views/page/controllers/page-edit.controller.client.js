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
            var promise1 = PageService.findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                });

            var promise2 = PageService.findAllPagesForWebsite(vm.websiteId)
                .success(function (pages) {
                    vm.pages=pages;
                });
        }

        init();

        function updatePage() {
            PageService.updatePage(vm.pageId, vm.page)
                .success(function (page) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .error(function () {
                    vm.error="Sorry could not create page";
                });
        };

        function deletePage() {
            PageService.deletePage(vm.pageId)
                .success(function (page) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .error(function () {
                    vm.error="Sorry could not delete page";
                });;

        };
    }
})();