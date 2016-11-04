(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['$stateParams', 'menuData'];
function ItemsController($stateParams, menuData) {
  var me = this;
  me.list = null;
  me.category = null;

  console.log("ItemsController running!");
  console.log($stateParams);
  me.$onInit = function () {
    menuData.getItemsForCategory($stateParams.shortName)
    .then(function (result){
      console.log("ItemsController got data!");
      console.log(result)
      me.list = result.data.menu_items
      me.category = result.data.category
    });
  };

}

})();
