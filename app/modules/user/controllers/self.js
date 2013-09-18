/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-13
 * Time: ����11:25
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'user', function($scope, auth, action, User){

        $scope.user = auth.userInfo();
        $scope.pristine = angular.copy($scope.user);

        $scope.reset = function(){
            $scope.user = angular.copy($scope.pristine);
        };

        $scope.isUnchanged = function(){
            return angular.equals($scope.user, $scope.pristine);
        };

        $scope.save = function(){
            //ȥ��˸���
            User.updateSelf({user:encodeURIComponent(JSON.stringify($scope.user))}).$promise.then(function(response){

                if(response['status'] == 1){
                    //�޸ĳɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '������Ϣ���³ɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: true
                    });

                    //���±��ش洢
                    auth.userInfo($scope.user);
                    $scope.pristine = angular.copy($scope.user);

                }else{
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '������Ϣ����ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: true
                        , before_close: function(e, manual_close){
                            $scope.$apply(action.forward('userSelf', 'user'));
                        }
                    });
                }
            });
        };
    }];
});