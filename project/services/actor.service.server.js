/**
 * Created by mallika2493 on 4/11/17.
 */
module.exports = function (app, model) {
    var ActorModel = model.ActorModel;
    app.post("/api/actor", createActor);
    app.get("/api/actor/:uid",getActorByUserId);

    function createActor(req, res) {

        var newActor=req.body;

        ActorModel.createActor(newActor)
            .then(
                function (newActor) {
                    console("after susscessfull"+newActor);

                    res.send(newActor);
                },
                function (error) {
                    console.log("something went wrong");
                    res.sendStatus(400).send(error);

                }
            );

    }

    function getActorByUserId(req,res) {
        var userId = req.params.uid;
        ActorModel.getActorByUserId(userId)
            .then(function (actor) {
                res.send(actor);
            },
            function (error){
               res.sendStatus(400).send(error);
            });

    }


}
