/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-23
 * Time: ����11:30
 */
define([
    //��׼��
    'lib/console-min'
    , 'angular/angular'
    //������
    , 'modules/database/controllers/db-list'
    //����
    //ָ��
    //��
    , 'angular/angular-resource'
    , 'angular/angular-strap'
], function(console, angular, dbBackupListCtrl){
    'use strict';

    console.group('���ݿ�ģ���ʼ��');

    var dbModule = angular.module('dbModule', ['ngResource', '$strap.directives']);

    dbModule.controller('dbBackupListCtrl', dbBackupListCtrl);


    console.groupEnd();

    return dbModule;
});