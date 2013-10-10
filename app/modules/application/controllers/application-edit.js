/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-10
 * Time: ����8:23
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'application', '$q', '$routeParams', function($scope, auth, Action, Application, $q, $routeParams){

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
        $scope.changeValidity = function(index, status){

            $scope.app.validity = status;

            //���뷵��promise����switchָ��ʹ��
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        //�޸�IP����
        $scope.changeIpLimit = function(index, status){

            $scope.app.ipLimit = status;

            //���뷵��promise����switchָ��ʹ��
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        $scope.save = function(){

            $scope.isLoading = true;

            //ȥ��˸���
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
                        , text: 'Ӧ��ϵͳ����ʧ��!'
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
    }];
});