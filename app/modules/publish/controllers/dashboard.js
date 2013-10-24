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

    return ['$scope', 'auth', '$http', function($scope, Auth, $http){
        Auth.isLogined();

        $scope.upload= function(data){

            $http({
                method:'POST'
                , url: config.domain + 'userFace/'
                , data: data
                , headers: {'Content-Type': undefined}  //��ng1.20�汾�У�һ��Ҫ����Ϊundefined������'multipart/form-data'�����������޷�ʹ��$_FILES����
                ,transformRequest: function(data) { return data;}
            })
                .success(function(data, status, headers, config){
                    console.log(data);
                })
                .error(function(data, status, headers, config){
                    console.log(data);
                });
        }
    }];
});