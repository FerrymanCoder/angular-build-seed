/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-10
 * Time: ����4:14
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$q', '$routeParams', 'ip', '$filter', function($scope, auth, Action, $q, $routeParams, Ip, $filter){

        //��ȡָ���Ŀɷ���IP��Ϣ
        $scope.ip = {};
        Ip.get({aid: $routeParams.aid, pid: $routeParams.pid}).$promise.then(function(response){
            $scope.ip = response;
            $scope.ip.info = decodeURI(response.info);

            $scope.pristine = angular.copy($scope.ip);
        });

        $scope.reset = function(){
            $scope.ip = angular.copy($scope.pristine);
        };

        $scope.isUnchanged = function(){
            return angular.equals($scope.ip, $scope.pristine);
        };

        //�޸���Ч��
        $scope.changeValidity = function(index, status){

            $scope.ip.validity = status;

            //���뷵��promise����switchָ��ʹ��
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        $scope.save = function(){

            $scope.isLoading = true;

            //ȥ��˸���
            var formData = {
                ipId: $scope.ip.ipId
                , appId: $scope.ip.appId
                , ip: $scope.ip.ip
                , validity: $scope.ip.validity
                , info: $scope.ip.info
                , begin: ($scope.ip.begin && $scope.ip.begin != -1) ? $filter('date')($scope.ip.begin, 'yyyy-MM-dd') : -1
                , end:  ($scope.ip.end && $scope.ip.end != -1) ? $filter('date')($scope.ip.end, 'yyyy-MM-dd') : -1
            };

            Ip.update(formData).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //�޸ĳɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ӧ��ϵͳ�ɷ���IP�༭�ɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.ip);

                }else{
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ӧ��ϵͳ�ɷ���IP�༭ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(aid, pid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appIpEdit', 'application' , {aid: aid, pid: pid}));
                            };
                        }($routeParams.aid, $routeParams.pid)
                    });
                }
            });
        };
    }];
});