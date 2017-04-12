/**
 * Created by mallika2493 on 4/11/17.
 */

module.exports = function (app, model) {
    var StatusModel = model.StatusModel;
    app.post("/api/actor/:aid", createStatus);
    app.get("/api/actor/status/:aid",getAllStatusByActorId);
    app.put("/api/actor/status/:status_id",editStatus);
    app.delete("/api/actor/status/:status_id",deleteStatus);

    function createStatus(req, res) {

        var actorId=req.params['aid'];
        var status = req.body;

        StatusModel.createStatus(actorId,status)
            .then(
                function (status) {


                    res.send(status);
                },
                function (error) {

                    res.sendStatus(400).send(error);

                }
            );

    }
    
    function getAllStatusByActorId(req,res) {

        var actorId = req.params.aid;

        StatusModel.getAllStatusByActorId(actorId)
            .then(function (allstatus) {
                res.json(allstatus);
            },function (err) {
                res.status(400).send(err);

            });
        
    }

    function editStatus(req,res) {

        var statusId=req.params.status_id;
        var status=req.body;
        StatusModel.editStatus(statusId,status)
            .then(function (status) {
                res.json(status);
            },function (err) {
                res.status(400).send(err);

            });


    }

    function deleteStatus(req,res) {
        var statusId = req.params.status_id;
        StatusModel.deleteStatus(statusId)
            .then(function (response) {
                res.json(response);

            },function (err) {
                res.status(400).send(err);

            })

    }



}

