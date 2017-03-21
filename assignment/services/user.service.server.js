/**
 * Created by mallika2493 on 2/24/17.
 */
/**
 * Created by mallika2493 on 2/24/17.
 *
 */


module.exports = function (app, model) {
    var UserModel = model.UserModel;
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/user", findUser);
    app.post("/api/user", createUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    // var users = [
    //     {
    //         _id: "123",
    //         username: "alice",
    //         password: "alice",
    //         firstName: "Alice",
    //         lastName: "Wonder",
    //         email: "alice@husky.neu.edu"
    //     },
    //     {
    //         _id: "234",
    //         username: "bob",
    //         password: "bob",
    //         firstName: "Bob",
    //         lastName: "Marley",
    //         email: "bob@husky.neu.edu"
    //     },
    //     {
    //         _id: "345",
    //         username: "charly",
    //         password: "charly",
    //         firstName: "Charly",
    //         lastName: "Garcia",
    //         email: "charly@husky.neu.edu"
    //     },
    //     {
    //         _id: "456",
    //         username: "jannunzi",
    //         password: "jannunzi",
    //         firstName: "Jose",
    //         lastName: "Annunzi",
    //         email: "jannunzi@husky.neu.edu"
    //     }
    // ];

    function findUserByCredentials(req, res) {

        /*var username = req.query.username;
         var password = req.query.password;

         var user = users.find(function (user) {
         return user.password == password && user.username == username;

         });
         if(user) {
         res.send(user);
         } else {
         res.sendStatus(404).send('User not found for username: ' + username + ' and password: ' + password);
         }*/
        var username = req.query.username;
        var password = req.query.password;
        UserModel
            .findUserByCredentials(username, password)
            .then(
                function (users) {

                    if (users.length > 0) {
                        res.json(users[0]);
                    } else {
                        res.sendStatus(400).send(error);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function findUserById(req, res) {

        /*var userId = req.params['userId'];
         for(var u in users) {
         var user = users[u];
         if( user._id === userId ) {
         res.send(user);
         return;
         }
         }
         res.sendStatus(404).send({});*/
        var userId = req.params['userId'];
        UserModel.findUserById(userId)
            .then(
                function (user) {
                        res.send(user);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        /*var username = req.query['username'];
         var user = users.find(function(u){
         return u.username == username;
         });
         if(user) {
         res.send(user);
         } else {
         res.sendStatus(404).send('User not found for username: ' + username);
         }*/
        var username = req.query['username'];
        UserModel
            .findUserByUsername(username)
            .then(
                function (users) {

                    if (users.length > 0) {
                        res.json(users[0]);
                    } else {
                        res.sendStatus(400).send(error);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function createUser(req, res) {

        /*var newuser=req.body;
         newuser._id=(new Date()).getTime().toString();
         users.push(newuser);
         res.json(newuser);*/
        var newuser=req.body;
        UserModel.createUser(newuser)
            .then(
                function (newuser) {

                    res.send(newuser);
                },
                function (error) {
                    res.sendStatus(400).send(error);

                }
            );

    }


    /*function updateUser(req, res) {
        var userId = req.params['userId'];
        for (var u in users) {
            var user = users[u];
            if (user._id === userId) {
                var newUser = req.body;
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                users[u].email = newUser.email;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);

    }*/

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser = req.body;
        /*for(var u in users) {
         var user = users[u];
         if( user._id === userId ) {
         var newUser = req.body;
         users[u].firstName = newUser.firstName;
         users[u].lastName = newUser.lastName;
         users[u].email = newUser.email;
         res.sendStatus(200);
         return;
         }
         }*/
        UserModel
            .updateUser(userId, newUser)
            .then(function (response) {
                if (response.nModified === 1) {
                    UserModel
                        .findUserById(userId)
                        .then(function (response) {
                            res.json(response);
                        }, function () {
                            res.sendStatus(404);
                        })
                }
                else {
                    res.sendStatus(404);
                }
            }, function () {
                res.sendStatus(404);
            });
    }

    function deleteUser(req, res) {
        var uid = req.params['userId'];
        for (var u in users) {
            if (users[u]._id === uid) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};

