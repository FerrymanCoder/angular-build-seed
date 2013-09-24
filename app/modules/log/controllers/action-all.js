/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-23
 * Time: ����10:00
 */
define(function(){
    'use strict';

    return ['$scope', '$routeParams','auth', 'action', 'log', function($scope, $routeParams, auth, action, Log){
        var page = $routeParams.page;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;

        $scope.data = [];
        Log.actionList({page: page, uid:0}).$promise.then(function(response){
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
           page=$routeParams.page-1;
            $scope.data=[];
            $scope.status = '';
            $scope.predicate = '';
            $scope.reverse = false;
            $scope.hasManyData=true;
            $scope.downloadData();
        };

        //��ȡ���������
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Log.actionList({page: ++page, uid: 0,action :$scope.searchText}).$promise.then(function(response){

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
    }];
});