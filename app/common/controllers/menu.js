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
        module.controller('menuCtrl', ['$scope', 'action', function($scope, Action){
            $scope.menu = [];
            Action.menu().success(function(data){

                //�����°�����uri����������ڷ���sidebar-menuָ����֤��ǰ��
                angular.forEach(data, function(item, key){
                    data[key].sonUris = [];
                    angular.forEach(item.son, function(route){
                            data[key].sonUris.push(route.uri);
                    });
                });

                $scope.menu = data;
                console.log(data);
            });
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});