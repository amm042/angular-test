(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyCtrl', ToBuyCtrl)
.controller('BoughtCtrl', BoughtCtrl)
.service('ShopList', ShopListSvc)
.run(LoadList);

LoadList.$inject = ['ShopList']
function LoadList(svc){
  // random initalization
  var items = [
    'eggs', 'snacks', 'coffee', 'chips', 'bacon', 'meat',
    'butter', 'milk', 'shampoo', 'party hats', 'wine', 'beer'
  ]
  var numItems = 5+Math.floor(Math.random()*5);
  console.log("loading "+numItems+" items to buy")
  for (var i=0; i<numItems; i++){
    svc.needToBuy(
      items[Math.floor(Math.random()*items.length)],
      1+Math.floor(Math.random()*12)
    );
  }
}

ToBuyCtrl.$inject = ['ShopList']
function ToBuyCtrl(svc){
  var me = this
  me.tobuy = svc.getToBuy();
  me.buy = function(idx){
    svc.bought(idx);
  };
}

BoughtCtrl.$inject = ['ShopList']
function BoughtCtrl(svc){
  var me = this
  me.bought = svc.getBought();
  me.return = function(idx){
    svc.return(idx);
  }
}

function ShopListSvc(){
  var svc = this;
  var tobuy = [];
  var bought = [];
  svc.getToBuy = function(){return tobuy;}
  svc.getBought = function(){return bought;}
  svc.needToBuy = function(item, qty){
    // add qty of item to tobuy list
    var itm = {name: item, qty: qty};
    tobuy.push(itm)
  }
  svc.return = function(i){
    // move from bought to tobuy
    tobuy.push(bought[i]);
    bought.splice(i, 1)
  }
  svc.bought = function(i){
    // move item from tobuy to bought list.
    bought.push(tobuy[i]);
    tobuy.splice(i, 1);
  }
}

})();
