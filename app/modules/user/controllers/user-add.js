/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-8
 * Time: ����3:45
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'user', '$q', function($scope, Auth, Action, User, $q){
        Auth.isLogined();

        $scope.user = {sex:'-1', type:1, validity: true};
        $scope.pristine = angular.copy($scope.user);

        //��֤�ʺ��Ƿ��Ѿ�����
        $scope.accountCheckStatus = 0;
        $scope.accountCheck = function(){
            $scope.accountCheckStatus = 1;
            User.checkAccount({account: $scope.user.account}).$promise.then(function(response){

                if(response['status'] == 0){
                    $scope.accountCheckStatus = 0;
                    $scope.userForm.account.$setValidity('exists', false);
                }else{
                    $scope.accountCheckStatus = 2;
                    $scope.userForm.account.$setValidity('exists', true);
                }
            });
        };

        $scope.reset = function(){
            $scope.user = angular.copy($scope.pristine);
        };

        $scope.isUnchanged = function(){
            return angular.equals($scope.user, $scope.pristine);
        };

        //�޸���Ч��
        $scope.changeValidity = function(index, status){

            $scope.user.validity = status;

            //���뷵��promise����switchָ��ʹ��
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        $scope.save = function(){

            $scope.isLoading = true;

            //ȥ��˸���
            User.create($scope.user).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //�޸ĳɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û���ӳɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.user);

                }else{
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: !angular.isUndefined(response.msg) ? decodeURI(response.msg) : '�û����ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('userAdd', 'user'));
                        }
                    });
                }
            });
        };
    }];
});