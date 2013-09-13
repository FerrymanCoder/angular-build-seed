/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: ����3:43
 */
define(function(){
    'use strict';

    return  {
        group: 'publish'
        , title: '����̨'
        , icon: 'icon-home'
        , son:[{
            uri: '/dashboard'
            , controller: 'dashboardCtrl'
            , templateUrl: 'modules/publish/templetes/dashboard.html'
            , ifMenu: true
            , name: 'dashboard'
            , title: '�Ǳ���'
            , icon: 'icon-th'
            , api: 'restV1/dashboard/get'
        }
        ,{
            uri: '/logout'
            , controller: 'logoutCtrl'
            , templateUrl: 'modules/publish/templetes/logout.html'
            , ifMenu: false
            , name: 'logout'
            , title: '�˳�'
            , icon: 'icon-off'
            , api: ''
            , status: 1
        }]
    };
});