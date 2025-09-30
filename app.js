(function(){
    'use strict'
    //x="samo";
    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .directive('foundItems',FoundItems);
    //.config(config);
;
    NarrowItDownController.$inject=['MenuSearchService'];   
    function NarrowItDownController(MenuSearchService){
        var ctl=this;
        ctl.searchTerm="";
        ctl.found =[];
        ctl.getMatchedMenuItems=function(){
           ctl.found =[];
           var response=MenuSearchService.getMatchedMenuItems(ctl.searchTerm);
           response.then(function(d){
               ctl.found=[];
               var array=Object.entries(d.data)
                  array.forEach(element => {
                    element[1].menu_items.forEach(item=>{
                        //check if search term in description
                        if(item.description.includes(ctl.searchTerm)){
                           ctl.found.push(item);
                        }
                    });
                    });
                 if(array.length==0 || ctl.searchTerm.trim().length ==0 ){
                    ctl.notfound=true;
                    return
                    }else
                         ctl.notfound=false;
                }); 
          
        }
      
       ctl.remove=function(index){
        ctl.found.splice(index,1);
       } 
        
    }
    MenuSearchService.$inject=['$http'];
    function MenuSearchService($http){
        var service=this;
        var found=[];
        service.getMatchedMenuItems=function(searchTerm){
            console.log(searchTerm);
          var response=  $http({
                url:'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json',

            })

            return response;
        }
        //
    }

function FoundItems(){
    var ddo={

    templateUrl:'list.html',
     scope: {
      list: '=myList',
      removeItem:'=onRemove'
      
    }
    };
    return ddo
} 


})();