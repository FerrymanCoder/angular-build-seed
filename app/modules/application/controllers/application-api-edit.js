/**
 * Created with JetBrains WebStorm.
 * User: sww
 * Date: 13-10-26
 * Time: ����8:55
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'application', '$q', '$routeParams', 'api', function($scope, Auth, Action, Application, $q, $routeParams, Api){
        Auth.isLogined();

        //��ȡӦ��ϵͳ��Ϣ
        $scope.app = {};
        Application.get({aid: $routeParams.aid}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);
            $scope.app = response;
        });

        //��ȡָ���Ŀɷ���IP��Ϣ
        $scope.api = {};

        //��ȡѡ��ʽ�б�
        $scope.select = [];
        Api.get({apiid: $routeParams.apiid}).$promise.then(function(response){
            $scope.api = response;
            $scope.api.info = decodeURI(response.info);

            Api.getSelectList({page:0}).$promise.then(function(response){
                $scope.select = response;
                for(var i=0;i<$scope.select.length;i++){
                    if($scope.select[i].id==$scope.api.requestType){
                        $scope.api.selected=  $scope.select[i];
                    }
                }
            });

            $scope.pristine = angular.copy($scope.api);
        });

        $scope.isUnchanged = function(){
            return angular.equals($scope.api, $scope.pristine);
        };

        $scope.save = function(){

            $scope.isLoading = true;
            $scope.requestType= $scope.api.selected.id;

            //ȥ��˸���
            var formData = {
                apiId: $routeParams.apiid
                , aid:$routeParams.aid
                , apiAddr: $scope.api.apiAddr
                , type: $scope.api.requestType
                , info: $scope.api.info
            };

            //ȥ��˸���
            Api.update(formData).$promise.then(function(response){
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
                        , before_close: function(aid, apiid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appApiEdit', 'application' , {aid: aid, apiid: apiid}));
                            };
                        }($routeParams.aid, $routeParams.apiid)
                    });
                }
            });
        };
    }];
});