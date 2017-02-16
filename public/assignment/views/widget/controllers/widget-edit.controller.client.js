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

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;
            vm.widget=WidgetService.findWidgetById(vm.widgetId);
            vm.widgets=WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function getEditorTemplateUrl(type) {
            console.log(type);
            var url="views/widget/templates/editors/widget-"+type+"-editor.view.client.html";
            return url;
        }

        function deleteWidget(){
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        function updateWidget(){
            WidgetService.updateWidget(vm.widgetId,vm.widget);
            console.log(vm.widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }
    }
})();
