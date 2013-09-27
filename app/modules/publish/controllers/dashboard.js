/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-5
 * Time: ����2:45
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$scope', 'auth', 'action', '$http', function($scope, auth, action, $http){
        //auth();


        $scope.test = function(element){

           $http({method:'GET', url: config.domain + 'database/', params: {'download': 1}, responseType: 'arraybuffer', transformResponse: function(data, headersGetter){
               // if(headersGetter('Content-Disposition')){

                    var blob = new Blob([data], {type: "application/octet-stream"});
                    saveAs(blob, 'hello.png');
               //}
           }});
        };
    }];
});