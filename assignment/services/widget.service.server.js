/**
 * Created by mallika2493 on 2/24/17.
 */
module.exports=function (app,model) {
    var WidgetModel = model.WidgetModel;
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.put("/page/:pageId/widget", updateWidgetOrder);


    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});
    app.post("/api/upload", upload.single('myFile'), uploadImage);





    function createWidget(req,res) {
        var newWidget = req.body;
        var pageId = req.params['pageId'];
        console.log(newWidget);
        //newWidget.pageId=pageId;
        // widgets.push(newWidget);
        // res.sendStatus(200);
        WidgetModel
            .createWidget(pageId, newWidget)
            .then(function (widget) {
                console.log("in service server:"+pageId);
                res.json(widget);
            }, function (err) {
                console.log("in service server error:"+pageId);

                res.sendStatus(err);
            });

    }


    function updateWidget(req,res) {

        var widgetId=req.params['widgetId'];
        var widget=req.body;

        /*for(var w in widgets){
            var widget_var=widgets[w];
            if(widget_var._id === widgetId){
                widgets[w].widgetType = widget.widgetType;
                widgets[w].size = widget.size;
                widgets[w].text = widget.text;
                //return widgets[w];
                res.send(widgets[w]);
                return;
            }
        }*/
        WidgetModel.updateWidget(widgetId,widget)
            .then(
                function (response) {

                    if (response.ok === 1 && response.n === 1) {

                        res.sendStatus(200);
                    }
                    else {
                        res.sendStatus(404);
                    }
                }, function (err) {
                    console.log("hjdhsjkhfjk");
                    res.sendStatus(err);
                }
            );

    }

    function findAllWidgetsForPage(req,res) {
        var pageId = req.params.pageId;
        WidgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findWidgetById(req,res) {
        var widgetId = req.params.widgetId;
        WidgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(404);
            });

    }

    /*function sortWidget(req, res) {
        var pid = req.params['pageId'];
        var i1 = parseInt(req.query.initial);
        var i2 = parseInt(req.query.final);

        var widgetsForGivenPage = [];
        for (var index in widgets) {
            if (widgets[index].pageId === pid) {
                widgetsForGivenPage.push(index);
            }
        }

        for (var i = i1; i < i2; i++) {
            var temp = widgets[widgetsForGivenPage[i]];
            widgets[widgetsForGivenPage[i]] = widgets[widgetsForGivenPage[i+1]];
            widgets[widgetsForGivenPage[i+1]] = temp;
        }

        for (var i = i1; i > i2; i--) {
            var temp = widgets[widgetsForGivenPage[i]];
            widgets[widgetsForGivenPage[i]] = widgets[widgetsForGivenPage[i-1]];
            widgets[widgetsForGivenPage[i-1]] = temp;
        }

        res.sendStatus(200);
    }*/

    function uploadImage(req, res) {
        var pageId = null;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var imgWidget ={
            width:width,
            _id:widgetId
        }
        if(req.file!=null) {
            var myFile = req.file;
            var destination = myFile.destination;

            imgWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

            WidgetModel
                .updateWidget(widgetId, imgWidget)
                .then(function (response) {
                    if(response.ok===1&&response.n===1){


                        WidgetModel
                            .findWidgetById(widgetId)
                            .then(function (newResponse) {

                                pageId = newResponse._page;
                                res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");

                            });
                    }
                    else{
                        res.sendStatus(404);
                    }
                },function(err){
                    res.sendStatus(404);
                });

        }
        else{
            pageId = req.body.pageId;
            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/"+widgetId);
        }
    }

    function deleteWidget(req, res) {

        var widgetId = req.params.widgetId;

        WidgetModel
            .deleteWidget(widgetId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateWidgetOrder(req, res) {
        var pageId = req.params.pageId;
        var startIndex = parseInt(req.query.initial);
        var endIndex = parseInt(req.query.final);

        WidgetModel
            .reorderWidget(pageId, startIndex, endIndex)
            .then(function (response) {

                res.sendStatus(response);
            }, function (err) {
                res.sendStatus(404);
            });
    }

}