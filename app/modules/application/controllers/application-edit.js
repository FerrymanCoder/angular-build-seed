/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-10
 * Time: ����8:23
 */
define([
    'config'
], function(Config){
    'use strict';

    return ['$scope', 'auth', 'action', 'application', '$q', '$routeParams', '$http', function($scope, Auth, Action, Application, $q, $routeParams, $http){
        Auth.isLogined();

        //��ȡָ���û�����Ϣ
        $scope.app = {};
        Application.get({aid: $routeParams.aid}).$promise.then(function(response){

            $scope.app = response;
            $scope.app.name = decodeURI(response.name);
            $scope.app.info = decodeURI(response.info);

            $scope.pristine = angular.copy($scope.app);
        });

        $scope.reset = function(){
            $scope.app = angular.copy($scope.pristine);
        };

        $scope.isUnchanged = function(){
            return angular.equals($scope.app, $scope.pristine);
        };

        //�޸���Ч��
        $scope.changeValidity = function(item, status){

            $scope.app.validity = status;

            //���뷵��promise����switchָ��ʹ��
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        //�޸�IP����
        $scope.changeIpLimit = function(item, status){

            $scope.app.ipLimit = status;

            //���뷵��promise����switchָ��ʹ��
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        $scope.save = function(){

            $scope.isLoading = true;

            //ȥ��˸���
            var formData = {
                appId: $scope.app.appId
                , tag: $scope.app.tag
                , name: encodeURIComponent($scope.app.name)
                , domain: $scope.app.domain
                , validity: $scope.app.validity
                , ipLimit: $scope.app.ipLimit
                , info: encodeURIComponent($scope.app.info)
            };

            Application.update(formData).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //�޸ĳɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ӧ��ϵͳ����ɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.app);

                }else{
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: !angular.isUndefined(response.msg) ? decodeURI(response.msg) : 'Ӧ��ϵͳ����ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(aid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appEdit', 'application' , {aid: aid}));
                            };
                        }($routeParams.aid)
                    });
                }
            });
        };

        //ͼ���ϴ�
        $scope.upload= function(data){

            data.append('appId', $scope.app.appId);

            return $http({
                method:'POST'
                , url: Config.domain + 'appLogo/'
                , data: data
                , headers: {'Content-Type': undefined}  //��ng1.20�汾�У�һ��Ҫ����Ϊundefined������'multipart/form-data'�����������޷�ʹ��$_FILES����
                ,transformRequest: function(data) { return data;}
            });
        }
    }];
});