/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-10
 * Time: ����10:28
 */
define(function(){
    'use strict';

    var initialize = function(module){

        //���˵�
        module.controller('menuCtrl', ['$scope', 'action', '$timeout', function($scope, action, $timeout){
            $scope.menu = '';
            action.menu().success(function(data){
                $scope.menu = data;
            });

            $scope.menu2 = '';
            $timeout(function(){
                action.menu().success(function(data){
                    $scope.menu2 = data;
                });
            }, 3000);
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});