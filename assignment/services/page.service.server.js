/**
 * Created by mallika2493 on 2/24/17.
 */
module.exports=function (app,model) {
    var PageModel = model.PageModel;
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.post("/api/website/:websiteId/page",createPage);
    app.put("/api/page/:pageId",updatePage);
    app.get("/api/page/:pageId",findPageById);
    app.delete("/api/page/:pageId",deletePage);

    /*var pages=[
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];*/
    function findAllPagesForWebsite(req,res) {
        var websiteId=req.params['websiteId'];
        /*var pageList = []
        for(var p in pages) {
            if(pages[p].websiteId === websiteId) {
                pageList.push(pages[p]);
            }
        }
        res.send(pageList);*/
        PageModel.findAllPagesForWebsite(websiteId)
            .then(
                function (page) {
                    res.send(page);

                },function (error) {
                    res.sendStatus(404);
                });

    }
    
    function createPage(req,res) {
        var page=req.body;
        var websiteId=req.params['websiteId'];
        /*page.websiteId = websiteId;
        page._id = (new Date()).getTime().toString();
        pages.push(page);
        res.json(page);*/
        PageModel
            .createPage(websiteId, page)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function updatePage(req,res) {

        var pageId = req.params['pageId'];
        var page = req.body;
        /*for(var p in pages){
            var page_var=pages[p];
            if(page_var._id === pageId){
                pages[p].name = page.name;
                pages[p].description = page.description;

                res.send(pages);
                return;
            }
        }*/
        PageModel
            .updatePage(pageId, page)
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
    function findPageById(req,res) {
        var pageId= req.params['pageId'];
        /*for(var p in pages) {
            if(pages[p]._id === pageId) {
                res.json(pages[p]);
                return;
            }
        }*/
        PageModel.findPageById(pageId)
            .then(
                function (page) {
                    res.send(page);

                },function (error) {
                    res.sendStatus(404);
                });

    }

    function deletePage(req, res){
        var pageId = req.params.pageId;
        PageModel
            .deletePage(pageId)
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }
}
