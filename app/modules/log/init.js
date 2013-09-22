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
    , 'modules/log/services/log'
    //ָ��
    //��
    , 'angular/angular-resource'
    , 'angular/angular-strap'
], function(console, angular, loginUserCtrl, loginAllCtrl, log){
    'use strict';

    console.group('��־ģ���ʼ��');

    var logModule = angular.module('logModule', ['ngResource', '$strap.directives']);

    logModule.factory('log', log);

    logModule.controller('logLoginUserCtrl', loginUserCtrl);
    logModule.controller('logLoginAllCtrl', loginAllCtrl);

    console.groupEnd();

    return logModule;
});