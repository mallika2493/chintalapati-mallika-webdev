/**
 * Created by mallika2493 on 2/24/17.
 */
module.exports=function (app) {
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.put("/page/:pageId/widget", sortWidget);
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are ' +
        '<a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.' +
        '<br></p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"},
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];


    function createWidget(req,res) {

        console.log("in widget server");
        var newWidget = req.body;
        newWidget.pageId = req.params['pageId'];
        widgets.push(newWidget);
        res.sendStatus(200);
    }

    function deleteWidget(req,res) {
        var widgetId=req.params['widgetId'];
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);

            }
        }
    }

    function updateWidget(req,res) {

        var widgetId=req.params['widgetId'];
        var widget=req.body;
        for(var w in widgets){
            var widget_var=widgets[w];
            if(widget_var._id === widgetId){
                widgets[w].widgetType = widget.widgetType;
                widgets[w].size = widget.size;
                widgets[w].text = widget.text;
                //return widgets[w];
                res.send(widgets[w]);
                return;
            }
        }

    }

    function findAllWidgetsForPage(req,res) {
        var pageId=req.params['pageId'];
        var widgets_list=[];
        for(var w in widgets) {
            if(widgets[w].pageId === pageId) {
                widgets_list.push(widgets[w]);
            }
        }

        res.send(widgets_list);
    }

    function findWidgetById(req,res) {
        var widgetId = req.params['widgetId'];
        var widget_list=[];
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                res.send(widgets[w]);
                return;
            }
        }

    }

    function sortWidget(req, res) {
        var pid = req.params['pageId'];
        console.log(pid);
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
    }


}