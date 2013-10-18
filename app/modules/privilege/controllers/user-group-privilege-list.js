/**
 * Created with JetBrains WebStorm.
 * User: fengtao
 * Date: 13-10-2
 * Time: ����11:40
 */
define([], function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'privilege', '$location', '$routeParams', 'group', 'userGroupPrivilege', '$modal', '$q', '$filter', function($scope, Auth, Action, Privilege, $location, $routeParams, Group, UserGroupPrivilege, $modal, $q, $filter){
        var page = $routeParams.page - 1;
        $scope.gid = $routeParams.gid;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        Action.link('privilegeUserGroupEdit', 'privilege').success(function(response){
            $scope.switchFlag = response.status;
        });

        //��ȡ�û���Ϣ
        $scope.group = Group.get({gid: $routeParams.gid,uid:0}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);
            response.parentName = decodeURI(response.parentName);
            response.bindGroup = decodeURI(response.bindGroup);
            return response;
        });

        //��ȡָ��Ȩ����Ϣ
        $scope.prvData = {isLoading:false, data:{}};
        $scope.fetchInfo = function(id){

            if(angular.isUndefined($scope.prvData.data[id])){
                $scope.prvData.isLoading = true;

                $scope.prvData.data[id] = Privilege.get({pid: id}).$promise.then(function(response){
                    response.privName = decodeURI(response.privName);
                    response.info = decodeURI(response.info);
                    response.app = decodeURI(response.app);
                    response.group = decodeURI(response.group);

                    $scope.prvData.isLoading = false;

                    return response;
                });
            }

            $scope.prvInfo = $scope.prvData.data[id];
        };

        //��ȡ���������
        $scope.downloadData = function(){
            $scope.isLoading = true;

            UserGroupPrivilege.query({page: ++page, gid: $routeParams.gid}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.privName = decodeURI(item.privName);
                    item.app = decodeURI(item.app);
                    item.group = decodeURI(item.group);
                    item.info = decodeURI(item.info);
                    if(item.begin == -1){
                        item.begin = '������';
                    }else{
                        item.begin = Date.parse(item.begin);
                    }
                    if(item.end == -1){
                        item.end = '������';
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

        //���ý�������������ɸѡ��������������
        $scope.resetFilter = function(){
            $scope.status = '';
            $scope.searchText = '';
            $scope.predicate = '';
            $scope.reverse = false;

            $scope.resetFlag = 0;
        };

        //������Ч��
        $scope.changeValidity = function(index, status){

            var promise = UserGroupPrivilege.changStatus({id: $scope.data[index].privId, status: status, gid: $routeParams.gid, type: 'validity'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){

                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ȩ�޵���Ч�Ը���ʧ��!'
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

            return promise; //����promse����switch����ж���ʾ״̬
        };

        //���Ĺ���Ϊ
        $scope.changeRule = function(index, status){

            var promise = UserGroupPrivilege.changStatus({id: $scope.data[index].privId, status: status, gid: $routeParams.gid, type: 'rule'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ȩ�޵Ĺ������ʧ��!'
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
                    $scope.data[index].rule = status;
                }
            });

            return promise; //����promse����switch����ж���ʾ״̬
        };

        //ɾ��ָ���û���
        $scope.delete = function(object, index){
            object.isDelete = 1; //��ʶ�����ݱ�ɾ��

            UserGroupPrivilege.remove({pid: object.privId, gid: $routeParams.gid}).$promise.then(function(reponse){
                if(reponse['status'] == 0){

                    object.isDelete = 0;    //ȡ�������ݵ�ɾ��״̬

                    //ɾ��������ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û����ָ��Ȩ��ɾ��ʧ��!'
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
                    //���б���ɾ����������
                    $scope.data.splice(index, 1);

                    //ɾ���¹���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û����ָ��Ȩ��ɾ���ɹ�!'
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

        //�����༭��ģ̬����
        $scope.modalWin = function(rule){
            console.log(rule);
            $scope.updateRule = rule;   //����ָ��ǰ�༭�Ĺ������ݶ������ڸ�����ʾ�б�

            if(rule.begin == '������'){
                $scope.form.begin = null;
            }else{
                $scope.form.begin = $filter('date')(rule.begin, 'yyyy-MM-dd');
            }

            if(rule.end == '������'){
                $scope.form.end = null;
            }else{
                $scope.form.end = $filter('date')(rule.end, 'yyyy-MM-dd');
            }

            $scope.form.pid = rule.privId;

            modal.then(function(modalEl){
                modalEl.modal('show');
            });
        };

        //����ָ���������Чʱ��
        $scope.updateDate = function(){
            UserGroupPrivilege.updateDate($scope.form).$promise.then(function(response){
                if(response['status'] == 1){

                    $scope.updateRule.begin = $filter('date')($scope.form.begin, 'yyyy-MM-dd');
                    $scope.updateRule.end = $filter('date')($scope.form.end, 'yyyy-MM-dd');

                    //�ɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ȩ�޹�����ĳɹ�!'
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
                                $scope.$apply(Action.forward('privilegeUserGroupList', 'privilege' , {gid: gid, page: 1}));
                            };
                        }($routeParams.gid)
                    });
                }
            });
        };

        //��ȡ��һ������
        $scope.downloadData();
    }];
});