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
        module.controller('menuCtrl', ['$scope', 'action', 'auth', '$window', '$modal', '$q', function($scope, Action, Auth, $window, $modal, $q){
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
            });

            var modalPromise = $modal({
                template: 'logout.html'
                , persist: true
                , show: false
                , backdrop: 'static'
                , scope: $scope
            });
            var modal = $q.when(modalPromise);

            //���ڴ��� �˳�ϵͳ��ģ̬����
            $scope.modalWin = function(){
                modal.then(function(modalEl){
                    modalEl.modal('show');
                });
            };

            $scope.logout = function(){
                //����û���Ϣ
                window.localStorage.token = '';

                //��ת����¼ҳ
                $window.location.href = config.host + 'login.html';
            };

            $scope.openStatus = 1;
            $scope.expansion = function(){
                $scope.openStatus = - $scope.openStatus;
            };
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});