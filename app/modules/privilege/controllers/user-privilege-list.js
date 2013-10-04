/**
 * Created with JetBrains WebStorm.
 * User: fengtao
 * Date: 13-10-2
 * Time: ����11:40
 */
define([], function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'privilege', '$location', '$routeParams', 'user', 'userPrivilege', function($scope, Auth, Action, Privilege, $location, $routeParams, User, UserPrivilege){
        var page = $routeParams.page - 1;
        $scope.uid = $routeParams.uid;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        Action.link('privilegeUserEdit', 'privilege').success(function(response){
            $scope.switchFlag = response.status;
        });

        //��ȡ�û���Ϣ
        $scope.user = User.get({uid: $routeParams.uid}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);
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

            UserPrivilege.query({page: ++page, uid: $routeParams.uid}).$promise.then(function(response){

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

        //������Ч��
        $scope.changeValidity = function(index, status){

            var promise = UserPrivilege.changStatus({id: $scope.data[index].privId, status: status, uid: $routeParams.uid, type: 'validity'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){

                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ȩ�޵���Ч�Ը���ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('privilegeUserList', 'privilege' , {page: 1, uid: uid}));
                            };
                        }($routeParams.uid)
                    });
                }else{
                    $scope.data[index].validity = status;
                }
            });

            return promise; //����promse����switch����ж���ʾ״̬
        };

        //���Ĺ���Ϊ
        $scope.changeRule = function(index, status){

            var promise = UserPrivilege.changStatus({id: $scope.data[index].privId, status: status, uid: $routeParams.uid, type: 'rule'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ȩ�޵Ĺ������ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('privilegeUserList', 'privilege' , {page: 1, uid: uid}));
                            };
                        }($routeParams.uid)
                    });
                }else{
                    $scope.data[index].default = status;
                }
            });

            return promise; //����promse����switch����ж���ʾ״̬
        };

        //ɾ��ָ���û�
        $scope.delete = function(object, index){
            object.isDelete = 1; //��ʶ�����ݱ�ɾ��

            UserPrivilege.remove({pid: object.privId, uid: $routeParams.uid}).$promise.then(function(reponse){
                if(reponse['status'] == 0){

                    object.isDelete = 0;    //ȡ�������ݵ�ɾ��״̬

                    //ɾ��������ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û���ָ��Ȩ��ɾ��ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('privilegeUserList', 'privilege' , {page: 1, uid: uid}));
                            };
                        }($routeParams.uid)
                    });

                }else{
                    //���б���ɾ����������
                    $scope.data.splice(index, 1);

                    //ɾ���¹���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û���ָ��Ȩ��ɾ���ɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });
                }
            });
        };

        //��ȡ��һ������
        $scope.downloadData();
    }];
});