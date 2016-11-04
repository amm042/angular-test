(function () {
'use strict';
angular.module('MenuApp',['ui.router', 'Data']);

angular.module('MenuApp')
.component('logEvents', {controller: LogEventsController});

LogEventsController.$inject = ['$rootScope'];
function LogEventsController($rootScope){
  var me = this;
  var w = [];

  me.$onInit = function () {
    var cancel = $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams, options){
      console.log("stateChangeStart: " + fromState.name + " --> " + toState.name);

    });
    w.push(cancel);

    cancel = $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams){
      console.log("stateChangeSuccess: " + fromState.name + " --> " + toState.name);
    });
    w.push(cancel);

    cancel = $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error){
      console.log("stateChangeError: " + fromState.name + " --> " + toState.name + ": ");
      console.log(error)
    });
    w.push(cancel);
  };

  me.$onDestroy = function () {
    w.forEach(function (x) {
      x();
    });
  };
}
})();
