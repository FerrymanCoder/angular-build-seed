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

    return ['$scope', 'action', '$routeParams', '$modal', '$q', 'userPrivilege', 'privilege', '$location', function($scope, Action, $routeParams, $modal, $q, UserPrivilege, Privilege, $location){
        var page = 0;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        //��ȡ���������
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Privilege.query({page: ++page, privilege: $location.hash()}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.privName = decodeURI(item.privName);
                    item.app = decodeURI(item.app);
                    item.group = decodeURI(item.group);
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

        $scope.form = {rule: 1, gid: $routeParams.gid};

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
                , otherParam:{'type': 'onlyNode', 'gid': $routeParams.gid}
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

        //�޸Ĺ���
        $scope.changeRule = function(index, status){

            $scope.form.rule = status;

            //���뷵��promise����switchָ��ʹ��
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };


        //���ڴ��� Ȩ����Ϣ ��ģ̬����
        $scope.modalWin = function(pid){

            $scope.form.pid = pid; //����Ҫ���ӵ�Ȩ��pid

            modal.then(function(modalEl){
                modalEl.modal('show');
            });
        };

        //���ڱ�������ӵ�Ȩ����Ϣ
        $scope.addNewPrivilege = function(){

            UserPrivilege.create($scope.form).$promise.then(function(response){
                if(response['status'] == 1){
                    //�ɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ȩ�޹�����ӳɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                }else{
                    //������ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ȩ�޹������ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close:function(gid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('privilegeUserAdd', 'privilege' , {gid: gid}));
                            };
                        }($routeParams.gid)
                    });
                }
            });
        };
    }];
});