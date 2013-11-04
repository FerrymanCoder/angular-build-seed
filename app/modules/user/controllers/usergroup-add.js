/**
 * Created with JetBrains WebStorm.
 * User: siwenwen
 * Date: 13-10-3
 * Time: ����2:08
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$scope', 'action', '$routeParams', '$modal', '$q', 'userGroup', '$location', 'auth', function($scope, Action, $routeParams, $modal, $q, UserGroup, $location, Auth){
        Auth.isLogined();

        var page = 0;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        //��ȡ���������
        $scope.downloadData = function(){
            $scope.isLoading = true;

            UserGroup.groupList({page: ++page}).$promise.then(function(response){
                angular.forEach(response.items, function(item){
                    item.name = decodeURI(item.name);
                    item.parentName = decodeURI(item.parentName);
                    item.info = decodeURI(item.info);
                    $scope.data.push(item);
                });

                if(!response.hasMore){
                    $scope.hasManyData = false;
                }

                $scope.isLoading = false;
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

        //������ص�����
        $scope.searchData = function(){
            page=$routeParams.page-1;
            $scope.data=[];
            $scope.status = '';
            $scope.predicate = '';
            $scope.reverse = false;
            $scope.hasManyData=true;

            $location.hash($scope.searchText);

            $scope.downloadData();
        };

        //��ȡ��һ������
        $scope.downloadData();

        $scope.form = {};

        var modalPromise = $modal({
            template: 'form.html'
            , persist: true
            , show: false
            , backdrop: 'static'
            , scope: $scope
        });
        var modal = $q.when(modalPromise);

        //�������ò���
        $scope.setting = {
            data: {
                simpleData: {
                    enable: true
                }
            }
            , async: {
                enable: true
                , type: 'get'
                , url: config.domain + 'group'
                , autoParam:['id', 'dataType']
                , otherParam:{'type': 'onlyNode', 'auth': window.localStorage.token}
            }
            , view: {
                addDiyDom: function(treeId, treeNode){

                    if(!treeNode.nocheck){
                        jQuery('#' + treeNode.tId + '_a').append('<span id="diyBtn_' + treeNode.id+ '"><img src="./img/plus_alt.png" alt=""/></span>');

                        jQuery("#diyBtn_"+treeNode.id).on("click", function(){


                            //�����������Ȩ�޵�ģ̬����
                            $scope.modalWin({groupId: treeNode.id, name: treeNode.name, dataType: treeNode.dataType});

                            $scope.$root.$$phase || $scope.$apply();
                        });
                    }
                }
            }
        };

        //���ڴ��� Ȩ����Ϣ ��ģ̬����
        $scope.modalWin = function(item){

            $scope.form.parentId = item.groupId; //����Ҫ���ӵ�Ȩ��pid
            $scope.form.parentName = item.name;
            $scope.form.parentType = item.dataType;

            modal.then(function(modalEl){
                modalEl.modal('show');
            });
        };

        //���ڱ�������ӵ��û�����Ϣ
        $scope.addNewUserGroup = function(){

            UserGroup.create({parentId: $scope.form.parentId, name : $scope.form.name, dataType: $scope.form.parentType}).$promise.then(function(response){
                if(response['status'] != 0){
                        var item=[];
                        item.name = $scope.form.name;
                        item.parentName =$scope.form.parentName;
                        item.info = $scope.form.info;
                        $scope.data.push(item);
                    //�ɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û�����ӳɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });
                }else{
                    //������ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û������ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close:function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('userGroupAdd', 'user'));
                            };
                        }($routeParams.uid)
                    });
                }
            });
        };
    }];
});