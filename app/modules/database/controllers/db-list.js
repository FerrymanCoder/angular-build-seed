/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-17
 * Time: ����3:52
 */
define(function(){
    'use strict';

    return ['$scope', '$routeParams', 'auth', 'action', 'db', function($scope, $routeParams, auth, action, db){
        var page = 0;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.isSuccess =true;

        $scope.data = [];
        db.query({file: 0,page: page}).$promise.then(function(response){

            angular.forEach(response.items, function(item){
                item.fileName = decodeURI(item.fileName);
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

        $scope.dbRecover = function(fileName){
            $scope.isSuccess=true;
            $().popover(options).popover('hide');
        };

        $scope.dbDownload = function(id){
            db.query({file: 0,page: page,Download:1}).$promise.then(function(data){
                var blob = new Blob([data], {type: "application/octet-stream"});
                saveAs(blob, 'hello.png');
            });
        };

        $scope.dbDelete = function(id,index){
            $scope.isSuccess=true;
            $("tr#"+id).addClass("delete-line").fadeOut(1000,function(){$scope.data.splice(index, 1)}) ;
            $scope.isSuccess=false;
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

            db.query({file:0,page: ++page}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.fileName = decodeURI(item.fileName);
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