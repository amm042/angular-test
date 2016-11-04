(function () {
'use strict';

angular.module('MenuApp')
.component('catList', {
      templateUrl: 'src/MenuApp/templates/categories.html',
      bindings: {
        list: '<'
      }
    });
})();
