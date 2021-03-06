/**
 * Created by mallika2493 on 3/20/17.
 */
(function(){
    angular
        .module("SeriesAppMaker")
        .factory("TvShowService",TvShowService);

    function TvShowService($http) {
        var api = {
            "searchShow":searchShow,
            "getCastDetails":getCastDetails,
            "searchShowById":searchShowById
        };
        return api;

        function searchShow(searchTerm) {
            var key = "6e4c4b4ec35b896428861536de916f68";

            var urlBase = "https://api.tvmaze.com/search/shows?q=TEXT";
            var url = urlBase.replace("TEXT", searchTerm);
            return $http.get(url);
        }

        function getCastDetails(id) {
            var urlBase = "https://api.tvmaze.com/shows/ID/cast";
            var url = urlBase.replace("ID", id);
            return $http.get(url);
        }
        function searchShowById(id) {
            var urlBase = "https://api.tvmaze.com/shows/ID";
            var url = urlBase.replace("ID", id);
            return $http.get(url);

        }
    }
})();

