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
        vm.websiteId = $routeParams.wid
        vm.widgetId = $routeParams.wgid;
        vm.createWidget = createWidget;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }

        init();


        function createWidget(widgetType) {
            newWidget = {};
            newWidget._id = (new Date()).getTime().toString();
            newWidget.widgetType = widgetType;
            newWidget.pageId = vm.pageId;
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
            WidgetService.createWidget(vm.pageId, newWidget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
        }
    }


})();