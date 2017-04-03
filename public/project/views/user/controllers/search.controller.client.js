/**
 * Created by mallika2493 on 3/30/17.
 */
/**
 * Created by mallika2493 on 3/20/17.
 */
(function(){
    angular
        .module("SeriesAppMaker")
        .controller("searchController", searchController);

    function searchController($routeParams,$location, TvShowService,UserService) {
        var vm=this;
        vm.searchShow = searchShow;
        vm.findUserByUserId=findUserByUserId;
        vm.setLikeStatus=setLikeStatus;


        function init() {
            vm.userId = $routeParams.uid;

            if(vm.userId!=null){

                findUserByUserId(vm.userId)
            }
            //vm.user=findUserByUserId($routeParams.uid);
            /*vm.websiteId = $routeParams.wid;
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

        function findUserByUserId(userId) {
            var promise = UserService
                .findUserById(userId)
                .success(function (user) {
                    vm.user=user;
                    vm.user.status="like";
                });

        }

        function setLikeStatus(status) {
            console.log(typeof status);
            vm.user.status=status;
        }


    }
})();

