/**
 * Created by mallika2493 on 4/11/17.
 */
module.exports = function (app, model) {
    app.post("/api/actor", createActor);
    app.get("/api/actor/:uid", getActorByUserId);
    app.put("/api/actor/:aid/series/:seriesId", addToSeriesForActor);
    app.delete("/api/actor/delete/:aid", deleteActor);
    app.get("/api/actors/serial/:seriesId", getAllActorsForSeriesId);
    app.get("/api/user/actor/:aid",getActorByActorId);
    app.delete("/api/actor/:aid/status/show/:show_id",deleteShow);
    var ActorModel = model.ActorModel;

    function createActor(req, res) {
        var newActor = req.body;
        ActorModel
            .addActor(newActor)
            .then(
                function (actor) {
                    res.send(actor);
                },
                function (err) {
                    res.sendStatus(400).send(err);

                }
            );

    }

    function getActorByUserId(req, res) {
        var userId = req.params.uid;

        ActorModel.getActorByUserId(userId)
            .then(function (actor) {
                    res.send(actor);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });

    }

    function getActorByActorId(req, res) {

        var actorId = req.params.aid;


        ActorModel.getActorByActorId(actorId)
            .then(function (actor) {
                    res.send(actor);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });

    }

    function addToSeriesForActor(req, res) {
        var seriesId = req.params['seriesId'];
        var actorId = req.params['aid'];

        ActorModel.addtoSeriesForActor(seriesId, actorId)
            .then(function (actor) {
                    res.send(actor);

                },
                function (error) {
                    res.sendStatus(400).send(error);

                });

    }

    function deleteActor(req, res) {
        var actorId = req.params.aid;
        ActorModel.deleteActor(actorId)
            .then(function (response) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404);
            });

    }

    function getAllActorsForSeriesId(req, res) {
        var sid = req.params['seriesId'];
        ActorModel.findAllActorsForSeriesId(sid)
            .then(function (actors) {
                    res.send(actors);
                },
                function (error) {
                    res.sendStatus(400).send(error);

                });

    }

    function deleteShow(req,res) {
        var showId = req.params.show_id;
        var actorId = req.params.aid;
        ActorModel.deleteShow(actorId,showId)
            .then(function (response) {
                res.json(response);

            },function (err) {
                res.status(400).send(err);

            })

    }


}
