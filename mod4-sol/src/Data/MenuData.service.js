(function () {
'use strict';

angular.module('Data')
.service('menuData', MenuDataService);

MenuDataService.$inject = ['$q', '$http', 'catUrl', 'itemUrl']
function MenuDataService($q, $http, catUrl, itemUrl){
  var svc = this;

  svc.getAllCategories = function (){
    console.log("getAllCategories "+catUrl);
    return $http({url: catUrl});
  };

  svc.getItemsForCategory = function(shortName){
    console.log("getItemsForCategory "+itemUrl);
    return $http({
      url: itemUrl,
      params: {category: shortName}
    });
  };

};

})();
