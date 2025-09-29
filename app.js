(function(){
    'use strict'
    //x="samo";
    angular.module('soln2',[])
    .controller('ToBuyCtrl', ToBuyCtrl)
    .service('shopinglistservice',shopinglistservice);
    //.config(config);
    ToBuyCtrl.$inject=['shopinglistservice'];
    boughtCtrl.$inject=['shopinglistservice'];
       
    function boughtCtrl(shopinglistservice){

    }
    function ToBuyCtrl(shopinglistservice){
        var tobuyctrl=this;
          tobuyctrl.getProductsToBuy=function (){
          return shopinglistservice.getProductsToBuy();
        }
        tobuyctrl.getboughtlist=function(){
            return shopinglistservice.getboughtlist();
        }

       tobuyctrl.buy=function(index){
        console.log(index);
        shopinglistservice.buy(index);
       }
        tobuyctrl.return=function(index){
        console.log(index);
        shopinglistservice.return(index);
       }

        }
        function shopinglistservice(){
            var service=this;
                var products=[{ name: "red cookies", quantity: 10 },{ name: "diet soda", quantity: 4 },{ name: "white milk", quantity: 20 },{ name: "chees", quantity: 5 },{ name: "beans", quantity: 15 },{ name: "coke", quantity: 10 }]
                var bought=[]
            service.getProductsToBuy=function(){
                return products;
            }
            service.getboughtlist=function(){
                return bought;
            }
            service.buy=function(index){
                console.log(products[index]);
                bought.push(products[index]);
                console.log(bought);
                products.splice(index,1);
            }

            service.return=function(index){
                products.push(bought[index]);
                bought.splice(index,1);
            }

        }
        function ServiceProvider(){
            var provider=this;
            provider.config={'prop':1};
            provider.$get=function(){
                var service = new Service(provider.config.prop);
                return service;
            }
        }
})();