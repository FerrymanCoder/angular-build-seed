/**
 * Created with JetBrains WebStorm.
 * User: sww
 * Date: 13-10-25
 * Time: ����5:03
 * To change this template use File | Settings | File Templates.
 */
define([], function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$location', '$routeParams', '$q', '$filter', 'api', 'application', function($scope, Auth, Action, $location, $routeParams, $q, $filter, Api, Application){
        Auth.isLogined();

        var page = 0;
        $scope.aid = $routeParams.aid;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        Action.link('appApiEdit', 'application').success(function(response){
            $scope.switchFlag = response.status;
        });

        //��ȡӦ��ϵͳ��Ϣ
        $scope.app = {};
        Application.get({aid: $routeParams.aid}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);
            $scope.app = response;
        });

        //��ȡ���������
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Api.query({page: ++page, aid: $routeParams.aid}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.info = decodeURI(item.info);
                    item.requestName = decodeURI(item.requestName);
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

        //ɾ��ָ���û�
        $scope.delete = function(object, index){
            object.isDelete = 1; //��ʶ�����ݱ�ɾ��

            Api.remove({pid: object.apiId, aid: $routeParams.aid}).$promise.then(function(reponse){
                if(reponse['status'] == 0){

                    object.isDelete = 0;    //ȡ�������ݵ�ɾ��״̬

                    //ɾ��������ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'APIɾ��ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(aid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appIpList', 'application' , {aid: aid}));
                            };
                        }($routeParams.aid)
                    });

                }else{
                    //���б���ɾ����������
                    $scope.data.splice(index, 1);

                    //ɾ���¹���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'APIɾ���ɹ�!'
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