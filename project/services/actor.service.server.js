/**
 * Created by mallika2493 on 4/11/17.
 */
module.exports = function (app, model) {
    app.post("/api/actor", createActor);
    app.get("/api/actor/:uid", getActorByUserId);
    app.put("/api/actor/series/:seriesId", addtoSeriesForActor);
    app.delete("/api/actor/delete/:aid", deleteActor);
    app.get("/api/actors/serial/:seriesId", getAllActorsForSeriesId);
    app.get("/api/user/actor/:aid",getActorByActorId);
    var ActorModel = model.ActorModel;

    function createActor(req, res) {
        var newActor = req.body;
        console.log("after " + newActor);
        ActorModel
            .createActor(newActor)
            .then(
                function (actor) {
                    console("after susscessfull" + actor);
                    res.send(actor);
                },
                function (err) {
                    console.log("something went wrong");
                    res.sendStatus(400).send(err);

                }
            );

    }

    function getActorByUserId(req, res) {
        var userId = req.params.uid;
        console.log(userId);
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
        console.log(actorId);

        ActorModel.getActorByActorId(actorId)
            .then(function (actor) {
                    res.send(actor);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });

    }

    function addtoSeriesForActor(req, res) {
        var seriesId = req.params['seriesId'];
        var actorId = req.body;
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
        ActorModel.getAllActorsForSeriesId(sid)
            .then(function (actors) {
                    res.send(actors);
                },
                function (error) {
                    res.sendStatus(400).send(error);

                });

    }


}
