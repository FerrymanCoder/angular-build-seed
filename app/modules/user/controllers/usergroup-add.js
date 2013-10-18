/**
 * Created with JetBrains WebStorm.
 * User: fengtao
 * Date: 13-10-3
 * Time: ����2:08
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$scope', 'action', '$routeParams', '$modal', '$q', 'group', '$location', function($scope, Action, $routeParams, $modal, $q, Group, $location){
        var page = 0;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        //��ȡ���������
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Group.groupList({page: ++page, group: $location.hash()}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.name = decodeURI(item.name);
                    item.parentName = decodeURI(item.parentName);
                    item.bindGroup = decodeURI(item.bindGroup);
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

        $scope.form = {group: 1, gid: $routeParams.gid};

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
                , url: config.domain + 'userPrivilege'
                , autoParam:['id']
                , otherParam:{'type': 'onlyNode', 'uid': $routeParams.uid}
            }
            , view: {
                addDiyDom: function(treeId, treeNode){

                    jQuery('#' + treeNode.tId + '_a').append('<span id="diyBtn_' + treeNode.id+ '"><img src="./img/plus_alt.png" alt=""/></span>');

                    jQuery("#diyBtn_"+treeNode.id).on("click", function(){

                        //�����������Ȩ�޵�ģ̬����
                        $scope.modalWin(treeNode.id);

                        $scope.$root.$$phase || $scope.$apply();
                    });
                }
            }
        };

        //������Ч��
        $scope.changeValidity = function(index, status){

            var promise = Group.changStatus({page: page, group: $location.hash()}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){

                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û�����Ч�Ը���ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('userGroup', 'user', {page:1}));
                        }
                    });
                }else{
                    $scope.data[index].validity = status;
                }
            });

            return promise; //����promse����switch����ж���ʾ״̬
        };


        //���ڴ��� Ȩ����Ϣ ��ģ̬����
        $scope.modalWin = function(item){

            $scope.form.pid = item.pid; //����Ҫ���ӵ�Ȩ��pid
            $scope.form.parentName = item.name;
            $scope.form.validity = item.validity;
            modal.then(function(modalEl){
                modalEl.modal('show');
            });
        };

        //���ڱ�������ӵ�Ȩ����Ϣ
        $scope.addNewUserGroup = function(){

            Group.create({page: ++page,group :$scope.form}).$promise.then(function(response){
                if(response['status'] != 0){
                        var item=[];
                        item.name = $scope.form.name;
                        item.parentName =$scope.form.parentName;
                        item.bindGroup = $scope.form.bindGroup;
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
                                $scope.$apply(Action.forward('userGroupAdd', 'user' , {uid: uid}));
                            };
                        }($routeParams.uid)
                    });
                }
            });
        };
    }];
});