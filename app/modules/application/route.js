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
        }
        ,{
            uri: '/app/:aid/info'
            , controller: 'appEditCtrl'
            , templateUrl: 'modules/application/templetes/application-edit.html'
            , ifMenu: false
            , name: 'appEdit'
            , title: '�༭'
            , icon: 'icon-edit'
            , api: 'restV1/application/put'
        }
        ,{
            uri: '/app/add'
            , controller: 'appAddCtrl'
            , templateUrl: 'modules/application/templetes/application-add.html'
            , ifMenu: false
            , name: 'appAdd'
            , title: '����'
            , icon: 'icon-plus'
            , api: 'restV1/application/post'
        }
        ,{
            ifMenu: false
            , name: 'appDelete'
            , title: 'ɾ��'
            , icon: 'icon-trash'
            , api: 'restV1/application/delete'
        }
        ,{
            uri: '/app/:aid/ip/list'
            , controller: 'appIpListCtrl'
            , templateUrl: 'modules/application/templetes/application-ip-list.html'
            , ifMenu: false
            , name: 'appIpList'
            , title: '�ɷ���IP'
            , icon: 'icon-map-marker'
            , api: 'restV1/appIp/get'
        }
        ,{
            uri: '/app/:aid/:pid/info'
            , controller: 'appIpEditCtrl'
            , templateUrl: 'modules/application/templetes/application-ip-edit.html'
            , ifMenu: false
            , name: 'appIpEdit'
            , title: '�༭'
            , icon: 'icon-edit'
            , api: 'restV1/appIp/post'
        }
        ,{
            ifMenu: false
            , name: 'appIpDelete'
            , title: 'ɾ��'
            , icon: 'icon-trash'
            , api: 'restV1/appIp/delete'
        }
        ,{
            uri: '/app/:aid/:pid/info'
            , controller: 'appIpAddCtrl'
            , templateUrl: 'modules/application/templetes/application-ip-add.html'
            , ifMenu: false
            , name: 'appIpAdd'
            , title: '����'
            , icon: 'icon-plus'
            , api: 'restV1/appIp/post'
        }]
    };
});