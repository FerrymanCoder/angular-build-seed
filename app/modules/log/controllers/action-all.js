/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-23
 * Time: ����10:00
 */
define(function(){
    'use strict';

    return ['$scope', '$routeParams','auth', 'action', 'log', '$location', function($scope, $routeParams, auth, action, Log, $location){
        var page = $routeParams.page - 1;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;

        $scope.data = [];

        //��ȡ���������
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Log.actionList({page: ++page, uid: 0, action: $location.hash()}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.userName = decodeURI(item.userName);
                    item.action = decodeURI(item.action);
                    item.info = decodeURI(item.info);
                    $scope.data.push(item);
                });

                if(!response.hasMore){
                    $scope.hasManyData = false;
                }

                $scope.isLoading = false;
            });
        };

        $scope.downloadData();

        //����statusɸѡ�����
        $scope.statusFilter = function(value){
            $scope.status = {status: value};

            $scope.resetFlag = 1;
        };

        //���ý�������������ɸѡ��������������
        $scope.resetFilter = function(){
            $scope.status = '';
            $scope.searchText = '';
            $scope.predicate = '';
            $scope.reverse = false;

            $scope.resetFlag = 0;
        };

        //������ص�����
        $scope.searchData = function(){
            page = $routeParams.page - 1;
            $scope.data = [];
            $scope.status = '';
            $scope.predicate = '';
            $scope.reverse = false;
            $scope.hasManyData = true;

            $location.hash($scope.searchText);

            $scope.downloadData();
        };
    }];
});