/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-9
 * Time: ����10:01
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$scope', 'action', '$routeParams', '$modal', '$q', '$location', 'group', function($scope, Action, $routeParams, $modal, $q, $location, Group){
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
            page = 0;
            $scope.data = [];
            $scope.status = '';
            $scope.predicate = '';
            $scope.reverse = false;
            $scope.hasManyData = true;

            $location.hash($scope.searchText);
        };

        //��ȡ��һ������
        $scope.downloadData();

        $scope.form = {uid: $routeParams.uid};

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
                , url: config.domain + 'userGroup'
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

        //���ڴ��� Ȩ����Ϣ ��ģ̬����
        $scope.modalWin = function(gid){

            $scope.form.gid = gid; //����Ҫ���ӵ�Ȩ��pid

            modal.then(function(modalEl){
                modalEl.modal('show');
            });
        };

        //���ڱ�������ӵ������û���
        $scope.addNewGroup = function(object, index){

            if(!angular.isUndefined(object) && !angular.isUndefined(index)){
                $scope.form.gid = object.groupId;
            }

            Group.create($scope.form).$promise.then(function(response){
                if(response['status'] == 1){
                    //�ɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û������û�����ӳɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                }else{
                    //������ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û������û������ʧ��!'
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