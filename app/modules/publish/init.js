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
    , 'modules/publish/controllers/dashboard'
    //����
    , 'angular/angular-resource'
], function(console, angular, dashboardCtrl){
    'use strict';

    console.group('����ģ���ʼ��');

    var publishModule = angular.module('publishModule', ['ngResource']);
    publishModule.controller('dashboardCtrl', dashboardCtrl);
    console.groupEnd();

    return publishModule;
});