/**
 * Created by mallika2493 on 4/14/17.
 */

(function(){
    angular
        .module("SeriesAppMaker")
        .factory("RouteService",RouteService);

    function RouteService($http) {
        var api = {
            "getParam":getParam,
            "setParam":setParam

        };
        return api;
        var param;

       function getParam() {
           return this.param;

       }

       function setParam(param) {
           this.param = param;

       }

    }
})();
