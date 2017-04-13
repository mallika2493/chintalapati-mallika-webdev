/**
 * Created by mallika2493 on 4/11/17.
 */

(function () {
        angular
            .module("SeriesAppMaker")
            .factory('ActorService', actorService);

        function actorService($http) {


            var api = {

                /*"updateUser": updateUser,
                "findUserByCredentials": findUserByCredentials,
                "createUser": createUser,
                "findUserById": findUserById,
                "deleteUser":deleteUser,
                "findUserByUsername":findUserByUsername,
                "setLikeStatus":setLikeStatus,
                "isShowLiked":isShowLiked,
                "follow":follow,
                "unfollow":unfollow*/
                "createActor":createActor,
                "findActorByUserId":findActorByUserId,
                "addtoSeriesForActor":addtoSeriesForActor,
                "deleteActor":deleteActor,
                "getAllActorsForSeriesId":getAllActorsForSeriesId,
                "findActorByActorId":findActorByActorId
            };

            function createActor(actor) {
                console.log("in actor"+ actor);
                return $http.post("/api/actor",actor);

            }

            function findActorByUserId(userId) {
                console.log(userId);
                return $http.get("/api/actor/"+userId);

            }

            function findActorByActorId(actorId) {

                return $http.get("/api/user/actor/"+actorId);

            }

            function addtoSeriesForActor(seriesId,actorId) {
                return $http.put("/api/actor/series/"+seriesId,actorId);

            }

            function deleteActor(actorId) {
                return $http.delete("/api/actor/delete/"+actorId);

            }

            function getAllActorsForSeriesId(seriesId) {
                console.log(seriesId);
                return $http.get("/api/actors/serial/"+seriesId);

            }



            return api;


        }
    }

)();
