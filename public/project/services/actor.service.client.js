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
                "addToSeriesForActor":addToSeriesForActor,
                "deleteActor":deleteActor,
                "getAllActorsForSeriesId":getAllActorsForSeriesId,
                "findActorByActorId":findActorByActorId,
                "deleteShow":deleteShow

            };

            function createActor(actor) {

                return $http.post("/api/actor",actor);

            }

            function findActorByUserId(userId) {

                return $http.get("/api/actor/"+userId);

            }

            function findActorByActorId(actorId) {

                return $http.get("/api/user/actor/"+actorId);

            }

            function addToSeriesForActor(actorId,seriesId) {

                return $http.put("/api/actor/"+actorId+"/series/"+seriesId);

            }

            function deleteActor(actorId) {
                return $http.delete("/api/actor/delete/"+actorId);

            }

            function getAllActorsForSeriesId(seriesId) {

                return $http.get("/api/actors/serial/"+seriesId);

            }
            function deleteShow(actor_id,show_id){
                return $http.delete("/api/actor/"+actor_id+"/status/show/" + show_id);
            }




            return api;


        }
    }

)();
