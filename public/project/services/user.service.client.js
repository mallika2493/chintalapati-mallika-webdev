(function () {
        angular
            .module("SeriesAppMaker")
            .factory('UserService', userService);

        function userService($http) {


            var api = {

                "updateUser": updateUser,
                "findUserByCredentials": findUserByCredentials,
                "createUser": createUser,
                "findUserById": findUserById,
                "deleteUser":deleteUser,
                "findUserByUsername":findUserByUsername,
                "setLikeStatus":setLikeStatus,
                "isShowLiked":isShowLiked
            };
            return api;

            function updateUser(userId, newUser) {
                return $http.put("/api/user/"+userId,newUser);

            }

            function findUserById(uid) {
                return $http.get("/api/user/"+uid);

            }

            function findUserByCredentials(username, password) {
                return $http.get("/api/user?username="+username+"&password="+password);

            }
            function findUserByUsername(username) {
                return $http.get("/api/user?username="+username);
            }

            function createUser(user) {
                return $http.post("/api/user",user);

            }
            function deleteUser(uid) {
                return $http.delete("/api/user/"+uid);

            }

            function setLikeStatus(status,userId, showId) {

                return $http.put("/api/user/" + userId + "/series/" + showId + "/likeStatus/"+status);

            }

            function isShowLiked(userId, showId) {
                return $http.get("/api/user/" + userId + "/series/" + showId + "/isShowliked");
            }

        }
    }

)();