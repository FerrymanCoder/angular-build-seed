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
    , 'modules/database/services/database'
    //ָ��
    //��
    , 'angular/angular-resource'
    , 'angular/angular-strap'
], function(console, angular, dbBackupListCtrl, db){
    'use strict';

    console.group('���ݿ�ģ���ʼ��');

    var dbModule = angular.module('dbModule', ['ngResource', '$strap.directives']);

    dbModule.factory('db', db);

    dbModule.controller('dbBackupListCtrl', dbBackupListCtrl);


    console.groupEnd();

    return dbModule;
});