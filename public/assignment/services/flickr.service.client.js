/**
 * Created by mallika2493 on 3/20/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("FlickrService",FlickrService);

    function FlickrService($http) {
        var api = {
            "searchPhotos":searchPhoto
        };
        return api;

        function searchPhoto(searchTerm) {
            var key = "ad760fd442dcba59b40b6a287d9018d7";
            var secret = "50ed1200d797e928";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();

