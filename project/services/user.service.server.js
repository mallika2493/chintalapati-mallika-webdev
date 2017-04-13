/**
 * Created by mallika2493 on 2/24/17.
 */



module.exports = function (app, model) {
    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    var auth = authorized;


    var UserModel = model.UserModel;

    app.post('/api/login', passport.authenticate('wam'),login);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/checkAdmin', checkAdmin);
    app.post('/api/logout', logout);
    app.get ('/api/loggedin', loggedin);

    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/user ", findUser);
    app.post("/api/user", createUser);
    app.put("/api/user/:userId", updateUser);
    app.put("/api/user/:userId/series/:showId/likeStatus/:status", updateLikeStatus);
    app.delete("/api/user/:userId", deleteUser);
    app.get("/api/user/:userId/series/:showId/isShowliked",isShowLiked);
    app.put("/api/user/:loggedInUserId/user2/:secondUserId",follow);
    app.put("/api/user/:loggedInUserId/user2/:secondUserId/unfollow",unfollow);
    app.put("/api/delete/user/:uid",deleteFromAllFollowersAndFollowing);
    app.get("/api/user",findUserByUsername);
    app.get('/api/getAllUsers/',getAllUsers);


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    app.get ('/api/loggedin', loggedin);

    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/index.html#/user/',
            failureRedirect: '/project/index.html#/login'
        }));


    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/google/oauth/callback',
        passport.authenticate('google', {
            successRedirect: '/project/index.html#/user/',
            failureRedirect: '/project/index.html#/login'
        }));

    var googleConfig = {
        clientID     : "962785213951-fhlq3ac2pkqbr2vneoa5sb5rvae0lacg.apps.googleusercontent.com",
        clientSecret : "kXNdFOqa9UnfMz7iu4tr9j6a",
        callbackURL  : "http://localhost:3000/google/oauth/callback"
    };

    var facebookConfig = {
        clientID     : "757475197750913",
        clientSecret : "0f9a7a17b4055f6b5928904caf769821",
        callbackURL  : "http://localhost:3000/auth/facebook/callback"
    };
    //console.log("Inside user service server js");

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        console.log(profile.id);
        UserModel
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                console.log(user);
                if(user) {
                    console.log(111);
                    done(null, user);
                } else {
                    console.log(profile);
                    var displayname = profile.displayName;
                    var user = {

                        //username: profile.emails[0].value,
                        //photo: profile.photos[0].value,
                        firstName: displayname.split()[0],
                        lastName:  displayname.split()[0],
                        facebook: {
                            id:    profile.id
                        }
                    };
                    return UserModel.createUser(user);
                }
            }, function (err) {
                console.log(err);
                done(err, null);
            })
            .then(function (user) {
                done(null, user);
            }, function (err) {
                console.log(err);
                done(err, null);
            });
    }


    function googleStrategy(token, refreshToken, profile, done) {
        console.log(profile.id);
        UserModel
            .findUserByGoogleId(profile.id)
            .then(function (user) {
                console.log(user);
                if(user) {
                    console.log(111);
                    done(null, user);
                } else {
                    console.log(222);
                    var user = {
                        username: profile.emails[0].value,
                        //photo: profile.photos[0].value,
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     profile.emails[0].value,
                        google: {
                            id:    profile.id
                        }
                    };
                    console.log("google authentication" + user.username);
                    return UserModel.createUser(user);
                }
            }, function (err) {
                console.log(err);
                done(err, null);
            })
            .then(function (user) {
                console.log("##########"+user);
                done(null, user);
            }, function (err) {
                console.log(err);
                done(err, null);
            });
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user :  '0');
    }

    function checkAdmin(req, res) {
        console.log(req.user.role);
        var loggedIn = req.isAuthenticated();
        var isAdmin = req.user.role == 'ADMIN';

        if(loggedIn&& isAdmin)
            res.json(req.user);
        else
            res.send('0');
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        UserModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var newFacebookUser = {
                            username:  profile.displayName.replace(/\s+/g, ''),
                            firstName: profile.displayName.split(" ")[0],
                            lastName:  profile.displayName.split(" ")[1],
                            email:     "",
                            facebook: {
                                id:    profile.id,
                                email:     "",
                                token: token
                            }
                        };
                        return UserModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function localStrategy(username, password, done) {
        // console.log(username);
        UserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    //console.log(user);
                    if(user && bcrypt.compareSync(password, user.password)) {
                        //console.log("In if ")
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        //res.send('0');
    }

    function login(req, res) {
        console.log("Login");
        var user  = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }



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

        UserModel
            .removeFromFollowing(loggedInUserId, secondUserId)
            .then(
                function (response) {

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

    function getAllUsers(req,res) {
        UserModel.getAllUsers()
            .then(function (users) {
                res.send(users);
            })

    }




};

