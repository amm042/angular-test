(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['list'];
function CategoriesController(list) {
  var me = this;
  me.list = list.data;

  console.log("CategoriesController running!");
  console.log(me)
}

})();
