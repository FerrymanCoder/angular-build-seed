/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-7
 * Time: ����3:36
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'user', '$routeParams', '$q', function($scope, auth, Action, User, $routeParams, $q){

        //��ȡָ���û�����Ϣ
        $scope.user = {};
        User.get({uid: $routeParams.uid}).$promise.then(function(response){

            $scope.user = response;
            $scope.user.name = decodeURI(response.name);
            $scope.user.info = decodeURI(response.info);

            $scope.pristine = angular.copy($scope.user);
        });

        //�����޸�
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

        //�����޸�
        $scope.save = function(){

            $scope.isLoading = true;

            //ȥ��˸���
            var formData = {
                userId: $scope.user.userId
                , name: encodeURIComponent($scope.user.name)
                , idCard: $scope.user.idCard
                , sex: $scope.user.sex
                , type: $scope.user.type
                , email: $scope.user.email
                , qq: $scope.user.qq
                , phone: $scope.user.phone
                , mobile: $scope.user.mobile
                , validity: $scope.user.validity
                , info: encodeURIComponent($scope.user.info)
            };

            User.updateUser(formData).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //�޸ĳɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û���Ϣ���³ɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.user);

                }else{
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û���Ϣ����ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close:function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('userEdit', 'user' , {uid: uid}));
                            };
                        }($routeParams.uid)
                    });
                }
            });
        };
    }];
});