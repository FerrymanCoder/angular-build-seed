/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: ����4:21
 */
define([
    //��׼��
    'lib/console-min'
    , 'angular/angular'
    //������
    //����
    , 'modules/application/services/application'
    //ָ��
    //��
    , 'angular/angular-resource'
    , 'angular/angular-strap'

], function(console, angular, application){
    'use strict';

    console.group('Ӧ��ϵͳģ���ʼ��');

    var appModule = angular.module('appModule', ['ngResource', '$strap.directives']);

    appModule.factory('application', application);

    console.groupEnd();

    return appModule;
});