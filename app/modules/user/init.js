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
    , 'angular/angular-resource'
    //������
    //����
], function(console, angular){
   'use strict';

    console.group('�û�ģ���ʼ��');

    var userModule = angular.module('userModule', ['ngResource']);

    console.groupEnd();

    return userModule;
});