/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: ����3:42
 */
define(function(){
    'use strict';

    return {
        group: 'application'
        , title: 'Ӧ��ϵͳ����'
        , icon: 'icon-github'
        , son:[{
            uri: '/app/list/:page'
            , controller: 'appListCtrl'
            , templateUrl: 'modules/application/templetes/application-list.html'
            , ifMenu: true
            , name: 'appList'
            , title: 'Ӧ��ϵͳ�б�'
            , icon: 'icon-github'
            , api: 'restV1/application/get'
        }]
    };
});