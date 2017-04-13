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
    app.put("/api/user/:userId/series/:showId/likeStatus/:status", updateLikeStatus);
    app.delete("/api/user/:userId", deleteUser);
    app.get("/api/user/:userId/series/:showId/isShowliked",isShowLiked);
    app.put("/api/user/:loggedInUserId/user2/:secondUserId",follow);
    app.put("/api/user/:loggedInUserId/user2/:secondUserId/unfollow",unfollow);
    app.put("/api/delete/user/:uid",deleteFromAllFollowersAndFollowing);


    function findUserByCredentials(req, res) {

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


    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser = req.body;

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
        var userId = req.params.userId;
        UserModel
            .deleteUser(userId)
            .then(function (response) {
                res.sendStatus(200);
            },function (err) {
                res.sendStatus(404);
            });
    }

    function updateLikeStatus(req,res) {
        var showId = req.params.showId;

        var userId = req.params.userId;
        var status = req.params.status;
        UserModel.updatelikeStatus(userId, showId,status)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }

            );

    }

    function isShowLiked(req,res) {
        var seriesId = req.params.showId;
        var userId = req.params.userId;

        UserModel
            .isShowLiked(userId, seriesId)
            .then(
                function (user) {

                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function follow(req, res){
        var loggedInUserId = req.params.loggedInUserId;
        var secondUserId = req.params.secondUserId;

        UserModel
            .addToFollowing(loggedInUserId, secondUserId)
            .then(
                function (response) {

                    return UserModel.addToFollowers(secondUserId, loggedInUserId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function unfollow(req,res) {
        var loggedInUserId = req.params.loggedInUserId;
        var secondUserId = req.params.secondUserId;
        console.log("im unfollowing");
        UserModel
            .removeFromFollowing(loggedInUserId, secondUserId)
            .then(
                function (response) {
                    console.log("removed from following..");
                    return UserModel.removeFromFollowers(secondUserId, loggedInUserId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (response) {
                    res.json(response);

                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function deleteFromAllFollowersAndFollowing(req,res) {
        var deletedUserId = req.params.uid;

        UserModel.deleteFromAllFollowersAndFollowing(deletedUserId)
            .then(function (response) {
                res.json(response);

            },function (err) {
                res.status(400).send(err);

            })

    }
};

