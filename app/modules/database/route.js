/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-23
 * Time: ����11:31
 */
define(function(){
    'use strict';

    return {
        group: 'database'
        , title: '���ݿ�ά��'
        , icon: 'icon-hdd'
        , son:[{
            uri: '/database/backup/list'
            , controller: 'dbBackupListCtrl'
            , templateUrl: 'modules/database/templetes/backup-list.html'
            , ifMenu: true
            , name: 'dbBackupList'
            , title: '���ݿⱸ��'
            , icon: 'icon-hdd'
            , api: 'restV1/database/get'
        }
        , {
            ifMenu: false
            , name: 'dbBackup'
            , title: '����'
            , icon: 'icon-save'
            , api: 'restV1/database/put'
        }]
    };
});