/**
 * Created by mallika2493 on 2/24/17.
 */

module.exports = function (app, model) {
    var WebsiteModel = model.WebsiteModel;
    app.get("/api/website/:websiteId", findWebsiteById);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.post("/api/user/:userId/website", createWebsite);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function findWebsiteById(req, res) {
        var wid = req.params['websiteId'];

        WebsiteModel.findWebsiteById(wid)
            .then(
                function (website) {
                    res.send(website);

                },
                function (error) {
                    res.sendStatus(400).send("website not found");
                }
            );

    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params['userId'];

        /*for (var w in websites) {
         if (websites[w].developerId === userId) {
         sites.push(websites[w]);
         }
         }

         res.json(sites);
         return;*/
        WebsiteModel.findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.send(websites);

                }, function (error) {
                    res.sendStatus(404);
                });
    }

    function createWebsite(req, res) {

        var userId = req.params.userId;
        var newwebsite = req.body
        //websites.push(newWebsite);
        //res.json(newWebsite);

        WebsiteModel
            .createWebsite(userId, newwebsite)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var updatedWebsite = req.body;
        WebsiteModel
            .updateWebsite(websiteId, updatedWebsite)
            .then(function (response) {
                if (response.ok === 1 && response.n === 1) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function deleteWebsite(req, res) {
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
