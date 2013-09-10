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
        module.controller('menuCtrl', ['$scope', 'action', '$location', function($scope, action, $location){
            $scope.menu = [];
            action.menu().success(function(data){

                angular.forEach(data, function(item, key){
                    data[key].sonUris = [];
                    angular.forEach(item.son, function(route){
                        data[key].sonUris.push(route.uri);
                    });
                });

                $scope.menu = data;
            });

            //�жϵ�ǰ�˵����Ƿ�ѡ�У�������ǰurl��ʾ��ҳ��
            $scope.checkActive = function(uris){
                var currentUri = $location.path()
                    , flag = false;

                angular.forEach(uris, function(item){
                    var reg = new RegExp(item.replace(/:(.*)[\/]?/g, '(.*)'), 'ig');
                    if(reg.test(currentUri)){
                        flag = true;
                        return false;
                    }

                });

                return flag;
            };
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});