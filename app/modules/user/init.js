/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: ����4:22
 */
define([
    //��׼��
    'lib/console-min'
    , 'angular/angular'
    //������
    , 'modules/user/controllers/self'
    , 'modules/user/controllers/self-psw'
    //����
    , 'modules/user/services/user'
    //ָ��
    , 'modules/user/directives/password-strength'
    //��
    , 'angular/angular-resource'
    , 'angular/angular-strap'
], function(console, angular, userSelfCtrl, userSelfPswCtrl, user, pswStrength){
   'use strict';

    console.group('�û�ģ���ʼ��');

    var userModule = angular.module('userModule', ['ngResource', '$strap.directives']);

    userModule.factory('user', user);

    userModule.controller('userSelfCtrl', userSelfCtrl);
    userModule.controller('userSelfPswCtrl', userSelfPswCtrl);

    userModule.directive('kzPasswordStrength', pswStrength);

    console.groupEnd();

    return userModule;
});