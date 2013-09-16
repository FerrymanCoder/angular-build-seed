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
    , 'modules/user/controllers/userSelf'
    //����
    , 'modules/user/services/user'
    //��
    , 'angular/angular-resource'
    , 'angular/angular-strap'
], function(console, angular, userSelfCtrl, user){
   'use strict';

    console.group('�û�ģ���ʼ��');

    var userModule = angular.module('userModule', ['ngResource', '$strap.directives']);

    userModule.factory('user', user);

    userModule.controller('userSelfCtrl', userSelfCtrl);

    console.groupEnd();

    return userModule;
});