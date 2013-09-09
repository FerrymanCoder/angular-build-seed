/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-5
 * Time: ����9:43
 */
define([
    //��׼��
    'lib/console-min'
    , 'angular/angular'
    //����
    , 'common/services/auth'
    , 'common/services/acl'
    //ָ��
], function(console, angular, auth, acl){
    'use strict';

    console.group('ͨ��ģ���ʼ��');

    var commonModule = angular.module('commonModule', ['ngResource']);
    commonModule
        .factory('auth', auth)
        .factory('acl', acl);

    console.groupEnd();

    return commonModule;
});