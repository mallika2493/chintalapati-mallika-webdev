(function () {
        angular
            .module("WebAppMaker")
            .factory('UserService', userService);

        function userService() {
            var users = [
                {
                    _id: "123",
                    username: "alice",
                    password: "alice",
                    firstName: "Alice",
                    lastName: "Wonder",
                    email: "alice@husky.neu.edu"
                },
                {
                    _id: "234",
                    username: "bob",
                    password: "bob",
                    firstName: "Bob",
                    lastName: "Marley",
                    email: "bob@husky.neu.edu"
                },
                {
                    _id: "345",
                    username: "charly",
                    password: "charly",
                    firstName: "Charly",
                    lastName: "Garcia",
                    email: "charly@husky.neu.edu"
                },
                {
                    _id: "456",
                    username: "jannunzi",
                    password: "jannunzi",
                    firstName: "Jose",
                    lastName: "Annunzi",
                    email: "jannunzi@husky.neu.edu"
                }
            ];

            var api = {
                "users": users,
                "updateUser": updateUser,
                "findUserByCredentials": findUserByCredentials,
                "createUser": createUser,
                "findUserById": findUserById,
                "deleteUser":deleteUser
            };
            return api;

            function updateUser(userId, newUser) {
                for (var u in users) {
                    var user = users[u];
                    if (user._id === userId) {
                        users[u].firstName = newUser.firstName;
                        users[u].lastName = newUser.lastName;
                        return user;
                    }
                }
                return null;
            }

            function findUserById(uid) {
                for (var u in users) {
                    var user = users[u];
                    if (user._id === uid) {
                        return angular.copy(user);
                    }
                }
                return null;
            }

            function findUserByCredentials(username, password) {
                for (var u in users) {
                    var user = users[u];
                    if (user.username === username &&
                        user.password === password) {
                        return angular.copy(user);
                    }
                }
                return null;
            }

            function createUser(user) {
                var newuser =
                    {
                        username: user.username,
                        password: user.password,
                        _id: (new Date()).getTime().toString()
                    }

                users.push(newuser);

                return newuser;

            }
            function deleteUser(uid) {
                for(var u in users) {
                    if(users[u]._id === uid) {
                        users.splice(u, 1);
                    }
                }
            }

        }
    }
    // create user,delete user,findUserByUsername
)();