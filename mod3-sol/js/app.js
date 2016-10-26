(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItems)
.constant('menuUrl', 'https://davids-restaurant.herokuapp.com/menu_items.json')
.run(loadMenu);

loadMenu.$inject = ['menuUrl', '$http', 'MenuSearchService']
function loadMenu(menuUrl, $http, menuSearchService){
  console.log("loading " + menuUrl);
  $http({url: menuUrl})
  .then (function (resp){
    menuSearchService.AddMenu(resp.data)
  }, function(error){
    console.log("Oh no -- "+error);
  });
}

NarrowItDownController.$inject = ['MenuSearchService']
function NarrowItDownController(menuSearchService){
  var me = this;

  me.searchBox = "";
  me.emptySearch = false;
  me.inSearch= false;

  me.Found = function() {
    return menuSearchService.found;
  }
  me.keySearch= function(){
    if (me.inSearch || me.searchBox.length > 2)
      me.search();
  }
  me.search = function(){
    if (me.searchBox == ""){
      me.emptySearch = true;
      menuSearchService.found = []
      me.inSearch = false;
    }else{
      me.inSearch = true;
      console.log("searching for " + me.searchBox + "...");
      me.emptySearch = menuSearchService.Search(me.searchBox).length == 0;
    }
  }
  me.onRemove = function(index){
    menuSearchService.remove(index);
    me.emptySearch = menuSearchService.found.length == 0;
  }
}

function foundItems(){
  return {
    templateUrl : 'templates/foundItems.html',
    restrict: 'E',

    scope: {
        foundItems: '<',
        onRemove: '&'
    },
/*
    controller: nullController,
    controllerAs: 'menu',
    bindToController: true
*/
  };
}
function nullController(){
  var me = this;

  me.OnRemove = function(indeX){
    console.log("nullController on remove")
    console.log(index)
  }
}

function MenuSearchService(){
  var service = this;
  service.found = [];
  service.menu = null;
  service.searchStr = "";
  service.AddMenu = function(menu){
    console.log("adding menu data: ");
    console.log(menu);
    service.menu = menu;
    /* there was a search before the menu was loaded... */
    if (service.searchStr != "")
      service.Search(service.searchStr);

  }
  service.remove = function(index){
    console.log("service onremove:")
    console.log(service.found[index])
    service.found.splice(index,1);
  }
  service.Search = function(searchStr){

    service.searchStr = searchStr.toLowerCase();

    if (service.menu != null){
      service.found = service.menu.menu_items.filter(function (item){
        return item.description.toLowerCase().includes(service.searchStr);
      });
      console.log(service.found);
    }
    return service.found;
  }
}

})();
