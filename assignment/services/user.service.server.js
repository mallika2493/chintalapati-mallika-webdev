/**
 * Created by mallika2493 on 2/24/17.
 */
/**
 * Created by mallika2493 on 2/24/17.
 *
 */


module.exports=function (app) {

    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/user", findUser);
    app.post("/api/user",createUser);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);

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

    function findUserByCredentials(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        var user = users.find(function (user) {
            return user.password == password && user.username == username;

        });
        if(user) {
            res.send(user);
        } else {
            res.sendStatus(404).send('User not found for username: ' + username + ' and password: ' + password);
        }

    }

    function findUserById(req, res) {

        var userId = req.params['userId'];
        for(var u in users) {
            var user = users[u];
            if( user._id === userId ) {
                res.send(user);
                return;
            }
        }
        res.sendStatus(404).send({});
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        var user = users.find(function(u){
            return u.username == username;
        });
        if(user) {
            res.send(user);
        } else {
            res.sendStatus(404).send('User not found for username: ' + username);
        }
    }

    function createUser(req,res) {

        var newuser=req.body;
        newuser._id=(new Date()).getTime().toString();
        users.push(newuser);
        res.json(newuser);

    }

    function updateUser(req,res) {
        var userId = req.params['userId'];
        for (var u in users) {
            var user = users[u];
            if (user._id === userId) {
                var newUser=req.body;
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                users[u].email=newUser.email;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);

    }

    function deleteUser(req,res){
        var uid = req.params['userId'];
        for(var u in users) {
            if(users[u]._id === uid) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};

