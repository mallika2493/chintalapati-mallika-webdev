/**
 * Created by mallika2493 on 3/30/17.
 */
/**
 * Created by mallika2493 on 3/20/17.
 */
(function(){
    angular
        .module("RecipeAppMaker")
        .controller("searchController", searchController);

    function searchController($routeParams,$location, TvShowService) {
        var vm=this;
        vm.searchShow = searchShow;



        function init() {
            /*vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;*/
        }
        init();
        function searchShow(searchTerm) {

            TvShowService
                .searchShow(searchTerm)
                .then(function (response) {
                    var data = response.data;
                    var sh = [data[0]];
                    var summary = sh[0].show.summary;
                    cleanText = summary.replace(/<\/?[^>]+(>|$)/g, "");
                    sh[0].show.summary=cleanText;
                    var id = sh[0].show.id;
                    vm.shows = sh;
                    console.log(vm.shows)
                    vm.id=id;
                    TvShowService.getCastDetails(id)
                        .then(function (response) {
                            var cast=response.data;
                            vm.cast=cast;

                        });
               });
        }


    }
})();

