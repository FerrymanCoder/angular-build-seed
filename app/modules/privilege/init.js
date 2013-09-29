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
    , 'modules/privilege/controllers/privilege-list'
    //����
    , 'modules/privilege/services/privilege'
    //ָ��
    //��
    , 'angular/angular-resource'
    , 'angular/angular-strap'
], function(console, angular, prvListCtrl, privServ){
    'use strict';

    console.group('Ȩ��ģ���ʼ��');

    var privilegeModule = angular.module('privilegeModule', ['ngResource']);

    privilegeModule.factory('privilege', privServ);

    privilegeModule.controller('prvListCtrl', prvListCtrl);

    console.groupEnd();

    return privilegeModule;
});