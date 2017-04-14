/**
 * Created by mallika2493 on 4/14/17.
 */
(function(){
    angular
        .module("SeriesAppMaker")
        .controller("homeGuestController",homeGuestController);
    function homeGuestController($routeParams,$location) {
        var vm = this;

        vm.searchShow = searchShow;


        function init() {

        }

        init();
        function searchShow(searchTerm) {

            $location.url("/search/" + searchTerm);


        }
    }




})();

