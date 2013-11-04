/**
 * Created with JetBrains WebStorm.
 * User: @siwenwen
 * Date: 13-10-2
 * Time: 上午11:40
 */
define([], function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'privilege', '$location', '$routeParams', 'userGroup', 'userGroupPrivilege', '$modal', '$q', '$filter', function($scope, Auth, Action, Privilege, $location, $routeParams, UserGroup, UserGroupPrivilege, $modal, $q, $filter){
        Auth.isLogined();

        var page = $routeParams.page - 1;
        $scope.gid = $routeParams.gid;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        Action.link('privilegeUserGroupEdit', 'privilege').success(function(response){
            $scope.switchFlag = response.status;
        });

        //获取用户组信息
        $scope.group={};
        UserGroup.get({gid: $routeParams.gid, uid: 0}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);
            response.parentName = decodeURI(response.parentName);
            $scope.group= response;
        });

        //获取更多的数据
        $scope.downloadData = function(){
            $scope.isLoading = true;

            UserGroupPrivilege.query({page: ++page, gid: $routeParams.gid}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.privName = decodeURI(item.privName);
                    item.app = decodeURI(item.app);
                    item.info = decodeURI(item.info);
                    if(item.begin == -1){
                        item.begin = '不限制';
                    }else{
                        item.begin = Date.parse(item.begin);
                    }
                    if(item.end == -1){
                        item.end = '不限制';
                    }else{
                        item.end = Date.parse(item.end);
                    }

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

        //更改有效性
        $scope.changeValidity = function(index, status){

            var promise = UserGroupPrivilege.changStatus({pid: $scope.data[index].privId, status: status, gid: $routeParams.gid}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){

                    //修改错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '权限的有效性更改失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(gid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('privilegeUserGroupList', 'privilege' , {page: 1, gid: gid}));
                            };
                        }($routeParams.gid)
                    });
                }else{
                    $scope.data[index].validity = status;
                }
            });

            return promise; //返回promse，供switch插件判断显示状态
        };

        //删除指定用户组
        $scope.delete = function(object, index){
            object.isDelete = 1; //标识该数据被删除

            UserGroupPrivilege.remove({pid: object.privId, gid: $routeParams.gid}).$promise.then(function(reponse){
                if(reponse['status'] == 0){

                    object.isDelete = 0;    //取消该数据的删除状态

                    //删除错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户组的指定权限删除失败!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(gid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('privilegeUserGroupList', 'privilege' , {page: 1, gid: gid}));
                            };
                        }($routeParams.gid)
                    });

                }else{
                    //从列表中删除该条数据
                    $scope.data.splice(index, 1);

                    //删除陈功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '用户组的指定权限删除成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });
                }
            });
        };


        var modalPromise = $modal({
            template: 'form.html'
            , persist: true
            , show: false
            , backdrop: 'static'
            , scope: $scope
        });

        var modal = $q.when(modalPromise);

        $scope.form = {gid: $scope.gid};

        //触发编辑的模态窗口
        $scope.modalWin = function(rule){
            console.log(rule);
            $scope.updateRule = rule;   //用于指向当前编辑的规则数据对象，用于更新显示列表

            if(rule.begin == '不限制'){
                $scope.form.begin = null;
            }else{
                $scope.form.begin = $filter('date')(rule.begin, 'yyyy-MM-dd');
            }

            if(rule.end == '不限制'){
                $scope.form.end = null;
            }else{
                $scope.form.end = $filter('date')(rule.end, 'yyyy-MM-dd');
            }

            $scope.form.pid = rule.privId;

            modal.then(function(modalEl){
                modalEl.modal('show');
            });
        };

        //更新指定规则的有效时间
        $scope.updateDate = function(){
            UserGroupPrivilege.updateDate($scope.form).$promise.then(function(response){
                if(response['status'] == 1){

                    $scope.updateRule.begin = $filter('date')($scope.form.begin, 'yyyy-MM-dd');
                    $scope.updateRule.end = $filter('date')($scope.form.end, 'yyyy-MM-dd');

                    //成功提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '权限规则更改成功!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                }else{
                    //错误提示
                    angular.element.gritter.add({
                        title: '提示'
                        , text: '权限规则更改失败!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close:function(gid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('privilegeUserGroupList', 'privilege' , {gid: gid, page: 1}));
                            };
                        }($routeParams.gid)
                    });
                }
            });
        };

        //获取第一屏数据
        $scope.downloadData();
    }];
});