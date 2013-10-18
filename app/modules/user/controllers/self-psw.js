/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-16
 * Time: ����8:52
 */
 define(function(){
     'use strict';

     return ['$scope', 'user', 'action', 'auth', function($scope, User, Action, Auth){
         Auth.isLogined();

         //����Ƿ�ͨ��ԭʼ�������֤
         $scope.auth = function(){

             //TODO ��ֹ������ε��

             User.authSelf({psw: encodeURIComponent($scope.originalPsw)}).$promise.then(function(response){

                 if(response['status'] == 1){
                     $scope.isAuthed = 1;
                 }
             });
         };

         //������������������Ƿ�һ��
         $scope.isUnsame = function(){
             return $scope.newPsw != $scope.comparePsw;
         };

         //����������
         $scope.save = function(){

             var psw = {
                 original: $scope.originalPsw
                 , fresh: $scope.newPsw
             };

             User.updateSelfPsw(psw).$promise.then(function(response){
                 if(response['status'] == 1){

                     //�޸ĳɹ���ʾ
                     angular.element.gritter.add({
                         title: '��ʾ'
                         , text: '������ĳɹ�!'
                         , class_name: 'winner'
                         , image: 'img/card.png'
                         , sticky: false
                     });

                     $scope.originalPsw = null;
                     $scope.newPsw = '';
                     $scope.comparePsw = null;
                     $scope.isAuthed = 0;

                 }else{
                     //�޸Ĵ�����ʾ
                     angular.element.gritter.add({
                         title: '��ʾ'
                         , text: '�������ʧ��!'
                         , class_name: 'loser'
                         , image: 'img/card.png'
                         , sticky: false
                         , before_close: function(e, manual_close){
                             $scope.$apply(Action.forward('userSelfPsw', 'user'));
                         }
                     });
                 }
             });
         };
     }];
 });