/**
 * Created by mallika2493 on 2/24/17.
 */

module.exports=function (app) {
    app.get("/api/website/:websiteId",findWebsiteById);
    app.get("/api/user/:userId/website",findAllWebsitesForUser);
    app.post("/api/user/:userId/website",createWebsite);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);
    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date()},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem", created: new Date()},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem", created: new Date()}
    ];

    function findWebsiteById(req,res) {
        var wid = req.params['websiteId'];
        for (var w in websites) {
            if (websites[w]._id === wid) {
                res.send(websites[w]);
                return;
            }
        }
        res.sendStatus(404).send("website not found");
    }

    function findAllWebsitesForUser(req,res) {
        var userId = req.params['userId'];
        var sites = [];
        for (var w in websites) {
            if (websites[w].developerId === userId) {
                sites.push(websites[w]);
            }
        }

        res.json(sites);
        return;
    }

    function createWebsite(req,res) {
        var newWebsite=req.body;
        newWebsite.developerId = req.params['userId'];
        newWebsite._id=(new Date()).getTime().toString();
        websites.push(newWebsite);
        res.json(newWebsite);
    }

    function updateWebsite(req,res) {
        var websiteId = req.params['websiteId'];
        var website = req.body;
        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                websites[w].name = website.name;
                websites[w].description = website.description;
                res.json(websites);
                return;
            }
        }
    }

    function deleteWebsite(req,res){
        var websiteId = req.params['websiteId'];
        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                websites.splice(w, 1);
                res.send(200);
                return;
            }
        }
        res.sendStatus(404).send("website not found to delete");
    }

}
