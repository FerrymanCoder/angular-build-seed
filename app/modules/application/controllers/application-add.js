/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-9
 * Time: ����4:11
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'application', '$q', function($scope, auth, Action, Application, $q){

        $scope.app = {ipLimit: 1, validity: 1};
        $scope.pristine = angular.copy($scope.app);

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
            Application.create($scope.app).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //�޸ĳɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ӧ��ϵͳ��ӳɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.app);

                }else{
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ӧ��ϵͳ���ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('appAdd', 'application'));
                        }
                    });
                }
            });
        };
    }];
});