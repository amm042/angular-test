(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/templates/home.html'
    })

    .state('categories', {
      url: '/categories',
      templateUrl: 'src/templates/categories.html',
      controller: 'CategoriesController as catCtrl',
      resolve: {
        list: ['menuData', function(menuData){
          return menuData.getAllCategories();
        }]
      }
    })

    .state('category', {
      url: '/category/{shortName}',
      templateUrl: 'src/templates/items.html',
      controller: 'ItemsController as itemCtrl',
      // resolve: {
      //   items: ['menuData', function(menuData){
      //     return menuData.getItemsForCategory($stateParams.short_name);
      //   }]
    });
}


})();
