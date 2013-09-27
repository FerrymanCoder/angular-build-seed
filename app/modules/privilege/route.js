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
            , controller: 'prvlistCtrl'
            , templateUrl: 'modules/privilege/templetes/privilege-list.html'
            , ifMenu: true
            , name: 'privilegeList'
            , title: 'Ȩ���б�'
            , icon: 'icon-eye-open'
            , api: 'restV1/privilege/get'
        }
        , {
            uri: '/privilege/create'
            , controller: 'prvAddCtrl'
            , templateUrl: 'modules/privilege/templetes/privilege-add.html'
            , ifMenu: false
            , name: 'privilegeAdd'
            , title: '����Ȩ��'
            , icon: 'icon-plus'
            , api: 'restV1/privilege/put'
        }
        , {
            ifMenu: false
            , name: 'privilegeDelete'
            , title: 'ɾ��'
            , icon: 'icon-trash'
            , api: 'restV1/privilege/delete'
        }
        , {
            uri: '/privilege/:pid'
            , controller: 'prvEditCtrl'
            , templateUrl: 'modules/privilege/templetes/privilege-edit.html'
            , ifMenu: false
            , name: 'privilegeEdit'
            , title: '�༭'
            , icon: 'icon-edit'
            , api: 'restV1/privilege/post'
        }]
    };
});