/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-13
 * Time: ����11:25
 */
define([
    'config'
], function(Config){
    'use strict';

    return ['$scope', 'auth', 'action', 'user', '$http', function($scope, Auth, Action, User, $http){
        Auth.isLogined();

        $scope.user = Auth.userInfo();
        $scope.pristine = angular.copy($scope.user);

        $scope.reset = function(){
            $scope.user = angular.copy($scope.pristine);
        };

        $scope.isUnchanged = function(){
            return angular.equals($scope.user, $scope.pristine);
        };

        $scope.save = function(){

            $scope.isLoading = true;

            //ȥ��˸���
            User.updateSelf($scope.user).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //�޸ĳɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '������Ϣ���³ɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
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
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('userSelf', 'user'));
                        }
                    });
                }
            });
        };

        //ͷ���ϴ�
        $scope.upload= function(data){

            data.append('userId', $scope.user.id);

            var request = $http({
                method:'POST'
                , url: Config.domain + 'userFace/'
                , data: data
                , headers: {'Content-Type': undefined}  //��ng1.20�汾�У�һ��Ҫ����Ϊundefined������'multipart/form-data'�����������޷�ʹ��$_FILES����
                ,transformRequest: function(data) { return data;}
            });

            request.then(function(response){
                if(response.data.error == 0){
                    window.localStorage.userPhoto = response.data.file;
                }
            });

            return request;
        }
    }];
});