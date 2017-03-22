/**
 * Created by mallika2493 on 2/15/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.pageId = $routeParams.pid;
        vm.websiteId = $routeParams.wid;
        vm.widgetId = $routeParams.wgid;
        vm.createWidget = createWidget;

        function init() {

           var promise= WidgetService.findAllWidgetsForPage(vm.pageId)
                .success(function (widget) {
                    vm.widgets=widget;
                });
        }

        init();


        function createWidget(widgetType) {
            newWidget = {};
           // newWidget._id = (new Date()).getTime().toString();
            newWidget.type = widgetType;
            //newWidget.pageId = vm.pageId;
            switch (widgetType) {
                case "HEADER":
                    newWidget.text = "Default Text";
                    newWidget.size = 3;

                    break;
                case "IMAGE":
                    newWidget.url = "https://i.ytimg.com/vi/fFi4BhD_DUw/maxresdefault.jpg";
                    newWidget.width = "100%";
                    break;
                case "YOUTUBE":
                    newWidget.url = "https://i.ytimg.com/vi/fFi4BhD_DUw/maxresdefault.jpg";
                    newWidget.width = "100%";
                    break;
                case "HTML":
                    newWidget.text = "Default Text";
                    break;
            }

            WidgetService.createWidget(vm.pageId, newWidget)

                .success(function (widget) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
                });

        }
    }


})();