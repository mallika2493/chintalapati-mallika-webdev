/**
 * Created by mallika2493 on 4/5/17.
 */
(function(){
    angular
        .module("SeriesAppMaker")
        .factory("SeriesService",SeriesService);

    function SeriesService($http) {
        var api = {
            "addSeries":addSeries


        };
        return api;

        function addSeries(shows) {

            return $http.post("/api/user/series/", shows);
        }


    }
})();
