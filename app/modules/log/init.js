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
    , 'modules/log/controllers/login-user'
    , 'modules/log/controllers/login-all'
    //����
    //ָ��
    //��
    , 'angular/angular-resource'
], function(console, angular, loginUserCtrl, loginAllCtrl){
    'use strict';

    console.group('��־ģ���ʼ��');

    var logModule = angular.module('logModule', ['ngResource']);

    logModule.controller('logLoginUserCtrl', loginUserCtrl);
    logModule.controller('logLoginAllCtrl', loginAllCtrl);

    console.groupEnd();

    return logModule;
});