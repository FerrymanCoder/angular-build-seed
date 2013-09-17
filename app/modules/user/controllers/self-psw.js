/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-16
 * Time: ����8:52
 */
 define(function(){
     'use strict';

     return ['$scope', 'user', function($scope, User){

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

             User.updateSelfPsw({psw: encodeURIComponent(JSON.stringify(psw))}).$promise.then(function(response){
                 if(response['status'] == 1){
                     //TODO �޸ĳɹ���ʾ

                     $scope.originalPsw = null;
                     $scope.newPsw = null;
                     $scope.comparePsw = null;
                     $scope.isAuthed = 0;
                 }
             });
         };
     }];
 });