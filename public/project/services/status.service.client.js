/**
 * Created by mallika2493 on 4/11/17.
 */

(function(){
    angular
        .module("SeriesAppMaker")
        .factory("StatusService",StatusService);

    function StatusService($http) {
        var api = {
            "addStatus":addStatus,
            "findAllStatusByActorId":findAllStatusByActorId,
            "editStatus":editStatus,
            "deleteStatus":deleteStatus

        };
        return api;

        function addStatus(actorId,status) {

            return $http.post("/api/actor/" + actorId, status);
        }

        function findAllStatusByActorId(actorId) {
            return $http.get("/api/actor/status/"+actorId);

        }

        function editStatus(statusObj) {
            return $http.put("/api/actor/status/" + statusObj._id, statusObj);

        }

        function deleteStatus(status_id) {
            return $http.delete("/api/actor/status/" + status_id);
        }

    }
})();
