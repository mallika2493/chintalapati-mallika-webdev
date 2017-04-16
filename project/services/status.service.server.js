/**
 * Created by mallika2493 on 4/11/17.
 */

module.exports = function (app, model) {
    var StatusModel = model.StatusModel;
    app.post("/api/actor/:aid", createStatus);
    app.get("/api/actor/status/:aid",getAllStatusByActorId);
    app.put("/api/actor/status/:status_id",editStatus);
    app.delete("/api/actor/status/:status_id",deleteStatus);
    app.get("/api/getAllActorStatus/",getAllActorStatus);

    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/project/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'status_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});
    app.post("/api/upload/", upload.single('myFile'), uploadImage);



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

    function getAllActorStatus(req,res) {
        StatusModel.getAllActorStatus()
            .then(function (statusList) {
                res.send(statusList);
            })

    }



    function uploadImage(req, res) {
        var actorId = req.body.actorId;
        var description = req.body.description;
        console.log(description);
        var status = {
            description:description,
            actorId:actorId
        }


        var myFile = req.file;
        if(myFile!=null) {
            var destination = myFile.destination;

            status.url = req.protocol + '://' + req.get('host') + "/project/uploads/" + myFile.filename;
        }
        else{

        }
        console.log(status);
        StatusModel.createStatus(actorId, status)
            .then(function (status) {


                    //res.send(status);
                    res.redirect("/project/index.html#/user/actor/");
                },
                function (error) {

                    res.sendStatus(400).send(error);

                });


        /*.then(function (response) {
         if (response.ok === 1 && response.n === 1) {


         WidgetModel
         .findWidgetById(widgetId)
         .then(function (newResponse) {

         pageId = newResponse._page;
         res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");

         });
         }
         else {
         res.sendStatus(404);
         }
         }, function (err) {
         res.sendStatus(404);
         });*/


    }
}

