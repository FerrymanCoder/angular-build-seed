/**
 * Created with JetBrains WebStorm.
 * User: fengtao
 * Date: 13-10-3
 * Time: 下午2:08
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$scope', 'action', '$routeParams', '$modal', '$q', 'userGroupPrivilege', 'privilege', '$location', 'auth', function($scope, Action, $routeParams, $modal, $q, UserGroupPrivilege, Privilege, $location, Auth){
        Auth.isLogined();

        var page = 0;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        //获取更多的数据
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Privilege.query({page: ++page}).$promise.then(function(response){

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

        //重置结果集，清空所有筛选条件，包括排序
        $scope.resetFilter = function(){
            $scope.status = '';
            $scope.searchText = '';
            $scope.predicate = '';
            $scope.reverse = false;

            $scope.resetFlag = 0;
        };

        //搜索相关的数据
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

        //获取第一屏数据
        $scope.downloadData();

        $scope.form = {validity: true, gid: $routeParams.gid};

        var modalPromise = $modal({
            template: 'form.html'
            , persist: true
            , show: false
            , backdrop: 'static'
            , scope: $scope
        });
        var modal = $q.when(modalPromise);

        //树的配置参数
        $scope.setting = {
            data: {
                simpleData: {
                    enable: true
                }
            }
            , async: {
                enable: true
                , type: 'get'
                , url: config.domain + 'userGroupPrivilege'
                , autoParam:['id', 'dataType']
                , otherParam:{'type': 'onlyNode', gid: $routeParams.gid, 'auth': window.localStorage.token}
            }
            , view: {
                addDiyDom: function(treeId, treeNode){

                    if(!treeNode.nocheck){
                        jQuery('#' + treeNode.tId + '_a').append('<span id="diyBtn_' + treeNode.id+ '"><img src="./img/plus_alt.png" alt=""/></span>');

                        jQuery("#diyBtn_"+treeNode.id).on("click", function(){

                            //用于启动添加权限的模态窗口
                            $scope.modalWin(treeNode.id);

                            $scope.$root.$$phase || $scope.$apply();
                        });
                    }
                }
            }
        };

        //修改规则
        $scope.changeRule = function(index, status){

            $scope.form.validity = status;

            //必须返回promise，供switch指令使用
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };


        //用于触发 权限信息 的模态窗口
        $scope.modalWin = function(pid){

            $scope.form.pid = pid; //保存要增加的权限pid

            modal.then(function(modalEl){
                modalEl.modal('show');
            });
        };

        //用于保存新添加的权限信息
        $scope.addNewPrivilege = function(){

            UserGroupPrivilege.create($scope.form).$promise.then(function(response){
                if(response['status'] == 1){
                    //成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '权限规则添加成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                }else{
                    //错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '权限规则添加失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close:function(gid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('privilegeUserGroupAdd', 'privilege' , {gid: gid}));
                            };
                        }($routeParams.gid)
                    });
                }
            });
        };
    }];
});