/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: ����3:23
 */
define(function(){
    'use strict';

    return {
        group: 'privilege'
        , title: 'Ȩ�޹���'
        , icon: 'icon-eye-open'
        , son:[{
            uri: '/privilege/list/:page'
            , controller: 'prvListCtrl'
            , templateUrl: 'modules/privilege/templetes/privilege-list.html'
            , ifMenu: true
            , name: 'privilegeList'
            , title: 'Ȩ���б�'
            , icon: 'icon-eye-open'
            , api: 'restV1/privilege/get'
        }]
    };
});