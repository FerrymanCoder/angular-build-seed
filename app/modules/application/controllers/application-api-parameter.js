/**
 * Created with JetBrains WebStorm.
 * User: sww
 * Date: 13-10-25
 * Time: ����5:03
 * To change this template use File | Settings | File Templates.
 */
define([], function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$location', '$routeParams', '$q', '$filter', 'api','apiParameter', 'application', function($scope, Auth, Action, $location, $routeParams, $q, $filter, Api,ApiParameter, Application){
        Auth.isLogined();

        var page = 0;
        $scope.aid = $routeParams.aid;
        $scope.apiId = $routeParams.apiid;
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
            $scope.app = response;
        });

        //��ȡӦ��ϵͳAPI��Ϣ
        $scope.api = {};
        Api.getApiInfo({aid: $routeParams.aid,apiid: $routeParams.apiid}).$promise.then(function(response){
            response.info = decodeURI(response.info);
            response.requestName = decodeURI(response.requestName);
            $scope.api = response;
        });

        //��ȡ���������
        $scope.downloadData = function(){
            $scope.isLoading = true;

            ApiParameter.query({page:++page,aid: $routeParams.aid,apiid: $routeParams.apiid}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.parameterCN = decodeURI(item.parameterCN);
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

        //ɾ��ָ������
        $scope.delete = function(object, index){
            object.isDelete = 1; //��ʶ�����ݱ�ɾ��

            ApiParameter.remove({pid: object.parameterId}).$promise.then(function(reponse){
                if(reponse['status'] == 0){

                    object.isDelete = 0;    //ȡ�������ݵ�ɾ��״̬

                    //ɾ��������ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'API����ɾ��ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(aid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appApiParameter', 'application' , {aid: aid}));
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