/**
 * Created by mallika2493 on 2/15/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, $location,WidgetService) {
        var vm = this;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget=updateWidget;
        vm.deleteWidget=deleteWidget;
        vm.searchImage=searchImage;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;
            WidgetService.findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget=widget;
                });
            WidgetService.findAllWidgetsForPage(vm.pageId)
                .success(function (widget) {
                    vm.widgets=widget;
                });
        }
        init();

        function getEditorTemplateUrl(type) {
            var url="views/widget/templates/editors/widget-"+type+"-editor.view.client.html";
            return url;
        }

        function deleteWidget(){
            WidgetService.deleteWidget(vm.widgetId)
                .success(function (widget) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }

        function updateWidget(){
            WidgetService.updateWidget(vm.widgetId,vm.widget)
                .success(function (widget) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }

        function searchImage() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId+"/flickr");
        }
    }
})();