(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO","index":1},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum","index":3},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg","index":4},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are ' +
            '<a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.' +
            '<br></p>',"index":5},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum","index":0},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E","index":6},
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>","index":2}
        ];

        var api = {
            "createWidget":createWidget,
            "findAllWidgetsForPage": findAllWidgetsForPage,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget":deleteWidget,
            "sortWidgets":sortWidgets
        };
        return api;

        function createWidget(pageId,widget) {
            return $http.post("/api/page/"+pageId+"/widget",widget);

        }

        function deleteWidget(widgetId) {
            return $http.delete('/api/widget/'+widgetId);

        }

        function updateWidget(widgetId,widget) {
            return $http.put("/api/widget/"+widgetId,widget);

        }

        function findAllWidgetsForPage(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");

        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);

        }

        function sortWidgets(pageId, index1, index2) {
            return $http.put("/page/" + pageId + "/widget?initial=" + index1 + "&final=" + index2);
        }

    }
})();