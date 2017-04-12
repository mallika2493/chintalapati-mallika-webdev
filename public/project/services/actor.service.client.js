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
                "findActorByUserId":findActorByUserId
            };

            function createActor(actor) {
                console.log("in actor"+ actor);
                return $http.post("/api/actor",actor);

            }

            function findActorByUserId(userId) {
                return $http.get("/api/actor/"+userId);

            }

            return api;


        }
    }

)();
