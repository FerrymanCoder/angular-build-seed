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
        , title: '�Ǳ���'
        , icon: 'icon-home'
        , son:[{
            uri: '/dashboard'
            , controller: 'dashboardCtrl'
            , templateUrl: 'modules/publish/templetes/dashboard.html'
            , ifMenu: true
            , name: 'dashboard'
            , title: '����̨'
            , icon: 'icon-th'
            , api: 'restV1/dashboard/get'
        }]
    };
});