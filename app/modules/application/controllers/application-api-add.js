/**
 * Created with JetBrains WebStorm.
 * User: sww
 * Date: 13-10-26
 * Time: ����8:55
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'application', '$q', '$routeParams', 'api', '$filter', function($scope, Auth, Action, Application, $q, $routeParams, Api, $filter){
        Auth.isLogined();

        //��ȡӦ��ϵͳ��Ϣ
        $scope.app = {};
        Application.get({aid: $routeParams.aid}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);
            $scope.app = response;
        });

        //��ȡѡ��ʽ�б�
        $scope.select = {};
        $scope.api = {aid: $routeParams.aid};
        Api.getSelectList({page:0}).$promise.then(function(response){

            response.name = decodeURI(response.name);
            $scope.select = response;

            $scope.api.selected =  $scope.select[0];
            $scope.pristine = angular.copy($scope.api);
        });

        $scope.isUnchanged = function(){
            return angular.equals($scope.api, $scope.pristine);
        };

        $scope.save = function(){

            $scope.isLoading = true;

            var formData = {
                aid: $scope.api.aid
                , apiAddr: $scope.api.apiAddr
                , info: $scope.api.info
                , type: $scope.api.selected.id
            };

            //ȥ��˸���
            Api.create(formData).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //�޸ĳɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ӧ��ϵͳ���API�ɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.api);

                }else{
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ӧ��ϵͳ���APIʧ��!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(aid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appApiAdd', 'application' , {aid: aid}));
                            };
                        }($routeParams.aid)
                    });
                }
            });
        };
    }];
});