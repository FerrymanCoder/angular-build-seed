/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: ����3:42
 */
define(function(){
    'use strict';

    return {
        group: 'log'
        , title: '��־����'
        , icon: 'icon-inbox'
        , son:[{
            uri: '/login-log/list/:page'
            , controller: 'logLoginAllCtrl'
            , templateUrl: 'modules/log/templetes/all-login-list.html'
            , ifMenu: true
            , name: 'loginAllList'
            , title: '��¼��־'
            , icon: 'icon-inbox'
            , api: 'restV1/logLogin/get'
        }
        , {
            uri: '/login-log/uid/:uid/list/:page'
            , controller: 'logLoginUserCtrl'
            , templateUrl: 'modules/log/templetes/login-list.html'
            , ifMenu: false
            , name: 'loginList'
            , title: '��¼��־'
            , icon: 'icon-signin'
            , api: 'restV1/logLogin/get'
        }
        , {
            uri: '/action-log/list/:page'
            , controller: 'logActionAllCtrl'
            , templateUrl: 'modules/log/templetes/all-action-list.html'
            , ifMenu: true
            , name: 'actionAllList'
            , title: '��Ϊ��־'
            , icon: 'icon-inbox'
            , api: 'restV1/logAction/get'
        }
        , {
            uri: '/action-log/uid/:uid/list/:page'
            , controller: 'logActionUserCtrl'
            , templateUrl: 'modules/log/templetes/action-list.html'
            , ifMenu: false
            , name: 'actionList'
            , title: '��Ϊ��־'
            , icon: 'icon-eye-open'
            , api: 'restV1/logAction/get'
        }]
    };
});