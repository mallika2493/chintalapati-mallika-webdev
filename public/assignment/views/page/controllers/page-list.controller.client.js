/**
 * Created by mallika2493 on 2/15/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            var promise = PageService.findAllPagesForWebsite(vm.websiteId)
                .success(function (pages) {

                    vm.pages=pages;
                });
        }
        init();
    }
})();