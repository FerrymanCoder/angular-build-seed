/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-30
 * Time: ����9:14
 */
define(function(){
    'use strict';

    return ['$scope', '$routeParams', '$location', 'auth', 'action', 'user', function($scope, $routeParams, $location, Auth, Action, User){
        Auth.isLogined();

        var page = $routeParams.page - 1;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        Action.link('userEdit', 'user').success(function(response){
            $scope.switchFlag = response.status;
        });

        //��ȡ���������
        $scope.downloadData = function(){
            $scope.isLoading = true;

            User.userList({page: ++page, user: $location.hash()}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.name = decodeURI(item.name);
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
        $scope.changeValidity = function(item, status){

            var promise = User.changStatus({id: item.userId, status: status}).$promise;
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
                            $scope.$apply(Action.forward('userList', 'user', {page:1}));
                        }
                    });
                }else{
                    item.validity = status;
                }
            });

            return promise; //����promse����switch����ж���ʾ״̬
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
        };

        //ɾ��ָ���û�
        $scope.delete = function(object, index){
            object.isDelete = 1; //��ʶ�����ݱ�ɾ��

            User.remove({uid: object.userId}).$promise.then(function(reponse){
                if(reponse['status'] == 0){

                    object.isDelete = 0;    //ȡ�������ݵ�ɾ��״̬

                    //ɾ��������ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û�ɾ��ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('userList', 'user' , {page:1}));
                        }
                    });

                }else{
                    //���б���ɾ����������
                    $scope.data.splice(index, 1);

                    //ɾ���¹���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û�ɾ���ɹ�!'
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