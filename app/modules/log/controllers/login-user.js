/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-17
 * Time: ����3:52
 */
define(function(){
    'use strict';

    return ['$scope', '$routeParams', 'auth', 'action', 'log', function($scope, $routeParams, auth, action, Log){
        var page = $routeParams.page;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;

        $scope.data = [];
        Log.loginList({page: page, uid: $routeParams.uid}).$promise.then(function(response){

            angular.forEach(response.items, function(item){
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

        //��ȡ���������
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Log.loginList({page: ++page, uid: $routeParams.uid}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
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