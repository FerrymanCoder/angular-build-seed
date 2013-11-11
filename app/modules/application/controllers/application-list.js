/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-9
 * Time: ����2:46
 */
define([], function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$location', '$routeParams', 'application', function($scope, Auth, Action, $location, $routeParams, Application){
        Auth.isLogined();

        var page = $routeParams.page - 1;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        Action.link('appEdit', 'application').success(function(response){
            $scope.switchFlag = response.status;
        });

        //��ȡ���������
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Application.query({page: ++page}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.app = decodeURI(item.app);
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

        //����IP����״̬
        $scope.changeIpLimit = function(item, status){

            var promise = Application.changStatus({aid: item.appId, status: status, type: 'ipLimit'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ӧ��ϵͳ��IP����״̬����ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('appList', 'application' , {page:1}));
                        }
                    });
                }else{
                    item.ipLimit = status;
                }
            });

            return promise; //����promse����switch����ж���ʾ״̬
        };

        //������Ч��
        $scope.changeValidity = function(item, status){

            var promise = Application.changStatus({aid: item.appId, status: status, type: 'validity'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ӧ��ϵͳ����Ч�Ը���ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('appList', 'application' , {page:1}));
                        }
                    });
                }else{
                    item.validity = status;
                }
            });

            return promise; //����promse����switch����ж���ʾ״̬
        };

        //������Ч��
        $scope.changeAuth = function(item, status){

            var promise = Application.changStatus({aid: item.appId, status: status, type: 'auth'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ӧ��ϵͳ����Ȩ״̬����ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('appList', 'application' , {page:1}));
                        }
                    });
                }else{
                    item.authorization = status;
                }
            });

            return promise; //����promse����switch����ж���ʾ״̬
        };

        //ɾ��ָ��ϵͳ
        $scope.delete = function(object, index){
            object.isDelete = 1; //��ʶ�����ݱ�ɾ��

            Application.remove({aid: object.appId}).$promise.then(function(reponse){
                if(reponse['status'] == 0){

                    object.isDelete = 0;    //ȡ�������ݵ�ɾ��״̬

                    //ɾ��������ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: !angular.isUndefined(response.msg) ? decodeURI(response.msg) : 'Ӧ��ϵͳɾ��ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('appList', 'application' , {page:1}));
                        }
                    });

                }else{
                    //���б���ɾ����������
                    $scope.data.splice(index, 1);

                    //ɾ���¹���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ӧ��ϵͳɾ���ɹ�!'
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