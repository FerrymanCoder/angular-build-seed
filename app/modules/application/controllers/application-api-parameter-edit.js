/**
 * Created with JetBrains WebStorm.
 * User: sww
 * Date: 13-10-26
 * Time: ����8:55
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$location', '$routeParams', '$q','$modal', '$filter', 'api','apiParameter', 'application', function($scope, Auth, Action, $location, $routeParams, $q,$modal, $filter, Api,ApiParameter, Application){
        Auth.isLogined();

        $scope.aid = $routeParams.aid;
        $scope.apiId = $routeParams.apiid;
        $scope.pid = $routeParams.pid;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = false;
        $scope.data = [];

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

        //��ȡѡ��ʽ�б�
        $scope.select = {};
        $scope.parameter = {type:true,apiAddrValidity:false };
        Api.getSelectList({page:0}).$promise.then(function(response){
            $scope.parameter.selected= response[1];
            $scope.select = response;
            ApiParameter.query({aid: $routeParams.aid, apiid: $routeParams.apiid,pid: $routeParams.pid}).$promise.then(function(response){
                $scope.parameter = response;
                $scope.parameter.parameterCN = decodeURI(response.parameterCN);
                $scope.data=$scope.parameter.output;
                for(var i=0;i<$scope.select.length;i++){
                    if($scope.select[i].id==$scope.parameter.selected.id){
                        $scope.parameter.selected=  $scope.select[i];
                    }
                }
                $scope.pristine = angular.copy($scope.parameter);
            });
        });


        $scope.pristine = angular.copy($scope.parameter);

        $scope.reset = function(){
            $scope.parameter = angular.copy($scope.pristine);
        };

        $scope.form = {isHidden:false};

        var modalPromise = $modal({
            template: 'form.html'
            , persist: true
            , show: false
            , backdrop: 'static'
            , scope: $scope
        });
        var modal = $q.when(modalPromise);

        //���ڴ��� Ȩ����Ϣ ��ģ̬����
        $scope.modalWin = function(){

            modal.then(function(modalEl){
                modalEl.modal('show');
            });
        };

        $scope.isUnchanged = function(){
            return angular.equals($scope.parameter, $scope.pristine);
        };

        $scope.add = function(){
            var formObj = angular.copy($scope.form);
            $scope.data.push(formObj);
        };

        //�޸Ĳ�������
        $scope.changeValidity = function(index, status){

            $scope.parameter.type = status;

            //���뷵��promise����switchָ��ʹ��
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        //�޸��Ƿ������ֶ�
        $scope.changeHidden = function(index, status){

            $scope.form.isHidden = status;

            //���뷵��promise����switchָ��ʹ��
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        $scope.save = function(){

            $scope.isLoading = true;
            $scope.parameter.output=$scope.data;
            //ȥ��˸���
            var formData = {
                apiid:$routeParams.apiid
                , aid:$routeParams.aid
                ,pid:$routeParams.pid
                , type: $scope.parameter.type
                , apiAddrValidity: $scope.api.requestType
                , selected: $scope.parameter.selected
                , parameterEN: $scope.parameter.parameterEN
                , parameterCN: $scope.parameter.parameterCN
                , apiAddr: $scope.parameter.apiAddr
                , output: $scope.parameter.output
            };
            //ȥ��˸���
            ApiParameter.update(formData).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //�޸ĳɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ӧ��ϵͳ�޸�API�����ɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.parameter);

                }else{
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ӧ��ϵͳ�޸�API����ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(aid,apiid,pid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appApiParameterEdit', 'application' , {aid: aid}, {apiid: apiid} ,{pid: pid}));
                            };
                        }($routeParams.aid,$routeParams.apiid,$routeParams.pid)
                    });
                }
            });
        };

        //ɾ��ָ������
        $scope.delete = function(index){
            //���б���ɾ����������
            $scope.data.splice(index, 1);
        };
    }];
});