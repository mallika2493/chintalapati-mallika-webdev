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
                "isShowLiked":isShowLiked,
                "follow":follow,
                "unfollow":unfollow,
                "deleteFromAllFollowersAndFollowing":deleteFromAllFollowersAndFollowing,
                "login":login,
                "logout":logout,
                "register":register,
                "getAllRegUsers":getAllRegUsers


            };
            return api;

            function register(user) {
                console.log("user called client");
                var url = '/api/register/';
                return $http.post(url,user);
            }

            function logout() {
                return $http.post("/api/logout");
            }

            function login(username,password) {
                var user ={
                    username:username,
                    password:password
                }

                return $http.post('/api/login', user);
            }



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
                console.log(typeof username);
                return $http.get("/api/user?username="+username);
            }

            function createUser(user) {
                console.log(user);
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

            function follow(loggedInUserId,secondUserId){
                return $http.put("/api/user/"+loggedInUserId+"/user2/"+secondUserId);
            }

            function unfollow(loggedInUserId,secondUserId){
                return $http.put("/api/user/"+loggedInUserId+"/user2/"+secondUserId+"/unfollow");
            }

            function deleteFromAllFollowersAndFollowing(deletedUserId) {
                return $http.put("/api/delete/user/"+deletedUserId);

            }

            function getAllRegUsers() {
                return $http.get('/api/getAllUsers/');
            }

        }
    }

)();