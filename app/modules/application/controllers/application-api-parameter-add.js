/**
 * Created with JetBrains WebStorm.
 * User: sww
 * Date: 13-10-26
 * Time: ����8:55
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$location', '$routeParams', '$q','$modal', 'api','apiParameter', 'application'
            , function($scope, Auth, Action, $location, $routeParams, $q,$modal, Api,ApiParameter, Application){

        Auth.isLogined();

        $scope.aid = $routeParams.aid;
        $scope.apiId = $routeParams.apiid;
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
        Api.getApiInfo({aid: $routeParams.aid, apiid: $routeParams.apiid}).$promise.then(function(response){
            response.info = decodeURI(response.info);
            response.requestName = decodeURI(response.requestName);
            $scope.api = response;
        });

        //��ȡѡ��ʽ�б�
        $scope.select = {};
        $scope.parameter = {type: true, apiAddrValidity: false};
        Api.getSelectList({page: 0}).$promise.then(function(response){
            $scope.select = response;
            $scope.parameter.selected =  $scope.select[0];

            $scope.pristine = angular.copy($scope.parameter);
        });

        $scope.reset = function(){
            $scope.parameter = angular.copy($scope.pristine);
        };

        $scope.checkAddr = function(){
            $scope.parameterForm.apiAddr.$dirty = true;

            if($scope.parameter.apiAddrValidity == false){

                if(angular.isUndefined($scope.parameter.apiAddr) || $scope.parameter.apiAddr == ''){
                    $scope.parameterForm.apiAddr.$setValidity('required', false);
                }
            }else{
                $scope.parameterForm.apiAddr.$setValidity('required', true);
            }
        };

        $scope.onChange = function(){

            if($scope.parameter.apiAddrValidity == true){

                if($scope.parameter.apiAddr != ''){
                    $scope.parameterForm.apiAddr.$setValidity('required', true);
                }else{
                    $scope.parameterForm.apiAddr.$setValidity('required', false);
                }
            }
        };

        $scope.form = {isHidden: false};

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
            $scope.parameter.output = $scope.data;

            //ȥ��˸���
            var formData = {
                aid: $scope.aid
                , apiId: $scope.apiId
                , paramType: $scope.parameter.type
                , apiAddr: $scope.parameter.apiAddr
                , apiAddrValidity: $scope.parameter.apiAddrValidity
                , parameterCN: $scope.parameter.parameterCN
                , parameterEN: $scope.parameter.parameterEN
                , output: $scope.parameter.output
                , type: $scope.parameter.selected.id
            };
            ApiParameter.create(formData).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //�޸ĳɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ӧ��ϵͳ���API�����ɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.parameter);

                }else{
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ӧ��ϵͳ���API����ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(aid, apiid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appApiParameterAdd', 'application' , {aid: aid, apiid: apiid}));
                            };
                        }($routeParams.aid ,$routeParams.apiid)
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