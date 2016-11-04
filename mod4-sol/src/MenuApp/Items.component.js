(function () {
'use strict';

angular.module('MenuApp')
.component('itemsList', {
      templateUrl: 'src/MenuApp/templates/items.html',
      bindings: {
        list: '<',
        category: '<'
      }
    }
);
})();
