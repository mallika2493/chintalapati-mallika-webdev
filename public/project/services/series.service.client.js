/**
 * Created by mallika2493 on 4/5/17.
 */
(function(){
    angular
        .module("SeriesAppMaker")
        .factory("SeriesService",SeriesService);

    function SeriesService($http) {
        var api = {
            "addSeries":addSeries,
            "findSeriesById":findSeriesById


        };
        return api;

        function addSeries(shows) {

            return $http.post("/api/user/series/", shows);
        }

        function findSeriesById(seriesId) {
            return $http.get("/api/user/likes/series/"+seriesId);

        }


    }
})();
