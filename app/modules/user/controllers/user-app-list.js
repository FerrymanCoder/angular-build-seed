/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-8
 * Time: ����10:14
 */
define([], function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$location', '$routeParams', 'userApp', function($scope, Auth, Action, $location, $routeParams, UserApp){
        var page = $routeParams.page - 1;
        $scope.uid = $routeParams.uid;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        Action.link('userAppDelete', 'user').success(function(response){
            $scope.switchFlag = response.status;
        });

        //��ȡ���������
        $scope.downloadData = function(){
            $scope.isLoading = true;

            UserApp.query({page: ++page, uid: $routeParams.uid}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.app = decodeURI(item.app);
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

        //���Ŀ���״̬
        $scope.changeStatus = function(index, status){

            var promise = UserApp.changStatus({uid: $routeParams.uid, aid: $scope.data[index].appId, status: status, type: 'status'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){

                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û��ɷ���ϵͳ�Ŀ���״̬����ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('userAppList', 'user' , {uid: uid, page:1, aid:0}));
                            };
                        }($routeParams.uid)
                    });
                }else{
                    $scope.data[index].status = status;
                }
            });

            return promise; //����promse����switch����ж���ʾ״̬
        };

        //����IP����״̬
        $scope.changeIpLimit = function(index, status){

            var promise = UserApp.changStatus({uid: $routeParams.uid, aid: $scope.data[index].appId, status: status, type: 'ipLimit'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û��ɷ���ϵͳ��IP����״̬����ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('userAppList', 'user' , {uid: uid, page:1, aid:0}));
                            };
                        }($routeParams.uid)
                    });
                }else{
                    $scope.data[index].ipLimit = status;
                }
            });

            return promise; //����promse����switch����ж���ʾ״̬
        };

        //ɾ��ָ��ϵͳ
        $scope.delete = function(object, index){
            object.isDelete = 1; //��ʶ�����ݱ�ɾ��

            UserApp.remove({uid: $routeParams.uid, aid: object.appId}).$promise.then(function(reponse){
                if(reponse['status'] == 0){

                    object.isDelete = 0;    //ȡ�������ݵ�ɾ��״̬

                    //ɾ��������ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û��ɷ���ϵͳɾ��ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('userAppList', 'user' , {uid: uid, page:1, aid:0}));
                            };
                        }($routeParams.uid)
                    });

                }else{
                    //���б���ɾ����������
                    $scope.data.splice(index, 1);

                    //ɾ���¹���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û��ɷ���ϵͳɾ���ɹ�!'
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