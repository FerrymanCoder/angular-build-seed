/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-17
 * Time: ����3:52
 */
define(function(){
    'use strict';  

    return ['$scope', '$routeParams', 'auth', 'action','group', 'usergroupuser', function($scope, $routeParams, Auth, Action,Group, usergroupuser){
		Auth.isLogined();
		
        var page = 0;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        //��ȡ���������
        $scope.downloadData = function(){
            $scope.isLoading = true;

            usergroupuser.groupUserList({page: ++page}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.userName = decodeURI(item.userName);
                    $scope.data.push(item);
                });

                if(!response.hasMore){
                    $scope.hasManyData = false;
                }

                $scope.isLoading = false;
            });
        };

        //��ȡ�û���Ϣ
        $scope.group={};
        Group.get({gid: $routeParams.gid,uid:0}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);
            response.parentName = decodeURI(response.parentName);
            response.bindGroup = decodeURI(response.bindGroup);
            $scope.group= response;
        });

        //ɾ��һ����¼
        //id: Ҫɾ�����ļ�id
        //index ��ǰ�е���������λ��
        $scope.userDelete = function(id,userName, index){
            usergroupuser.delete({uid: id, page: page}).$promise.then(function(response){
                if(response['status'] == 0){
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'ɾ��ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('userGroupUserList', 'user'));
                        }
                    });
                }
                else{
                    $("tr#"+id).addClass("delete-line").fadeOut(1000,function(){$scope.data.splice(index, 1)}) ;
                }
            });
        };

        //���ý�������������ɸѡ��������������
        $scope.resetFilter = function(){
            $scope.status = '';
            $scope.searchText = '';
            $scope.predicate = '';
            $scope.reverse = false;
            $scope.resetFlag = 0;
        };

        //��ȡ��һ������
        $scope.downloadData();
    }];
});