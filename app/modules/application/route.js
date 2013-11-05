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
        , {
            uri: '/app/:aid/info'
            , controller: 'appEditCtrl'
            , templateUrl: 'modules/application/templetes/application-edit.html'
            , ifMenu: false
            , name: 'appEdit'
            , title: '�༭'
            , icon: 'icon-edit'
            , api: 'restV1/application/put'
        }
        , {
            uri: '/app/add'
            , controller: 'appAddCtrl'
            , templateUrl: 'modules/application/templetes/application-add.html'
            , ifMenu: false
            , name: 'appAdd'
            , title: '����'
            , icon: 'icon-plus'
            , api: 'restV1/application/post'
        }
        , {
            ifMenu: false
            , name: 'appDelete'
            , title: 'ɾ��'
            , icon: 'icon-trash'
            , api: 'restV1/application/delete'
        }
        , {
            uri: '/app/:aid/ip/list'
            , controller: 'appIpListCtrl'
            , templateUrl: 'modules/application/templetes/application-ip-list.html'
            , ifMenu: false
            , name: 'appIpList'
            , title: '�ɷ���IP'
            , icon: 'icon-map-marker'
            , api: 'restV1/appIp/get'
        }
        , {
            uri: '/app/:aid/api/list'
            , controller: 'appApiListCtrl'
            , templateUrl: 'modules/application/templetes/application-api-list.html'
            , ifMenu: false
            , name: 'appApiList'
            , title: 'api����'
            , icon: 'icon-map-marker'
            , api: 'restV1/appApi/get'
        }
        , {
            uri: '/app/:aid/:pid/info'
            , controller: 'appIpEditCtrl'
            , templateUrl: 'modules/application/templetes/application-ip-edit.html'
            , ifMenu: false
            , name: 'appIpEdit'
            , title: '�༭'
            , icon: 'icon-edit'
            , api: 'restV1/appIp/post'
        }
        , {
            ifMenu: false
            , name: 'appIpDelete'
            , title: 'ɾ��'
            , icon: 'icon-trash'
            , api: 'restV1/appIp/delete'
        }
        , {
            uri: '/app/:aid/ip/add'
            , controller: 'appIpAddCtrl'
            , templateUrl: 'modules/application/templetes/application-ip-add.html'
            , ifMenu: false
            , name: 'appIpAdd'
            , title: '����'
            , icon: 'icon-plus'
            , api: 'restV1/appIp/post'
        }
        , {
            uri: '/app/:aid/:apiid/apiedit'
            , controller: 'appApiEditCtrl'
            , templateUrl: 'modules/application/templetes/application-api-edit.html'
            , ifMenu: false
            , name: 'appApiEdit'
            , title: '�༭'
            , icon: 'icon-edit'
            , api: 'restV1/appApi/post'
        }
        , {
            uri: '/app/:aid/:apiid/parameter'
            , controller: 'appApiParameterCtrl'
            , templateUrl: 'modules/application/templetes/application-api-parameter.html'
            , ifMenu: false
            , name: 'appApiParameter'
            , title: '�����б�'
            , icon: 'icon-edit'
            , api: 'restV1/appApi/get'
        }
        , {
            uri: '/app/:aid/:apiid/parameter/add'
            , controller: 'appApiParameterAddCtrl'
            , templateUrl: 'modules/application/templetes/application-api-parameter-add.html'
            , ifMenu: false
            , name: 'appApiParameterAdd'
            , title: '����'
            , icon: 'icon-plus'
            , api: 'restV1/appIp/post'
        }
        , {
            uri: '/app/:aid/:apiid/parameter/:pid/edit'
            , controller: 'appApiParameterEditCtrl'
            , templateUrl: 'modules/application/templetes/application-api-parameter-edit.html'
            , ifMenu: false
            , name: 'appApiParameterEdit'
            , title: '�༭'
            , icon: 'icon-edit'
            , api: 'restV1/appIp/post'
        }
        , {
            ifMenu: false
            , name: 'appApiDelete'
            , title: 'ɾ��'
            , icon: 'icon-trash'
            , api: 'restV1/appApi/delete'
        }
        , {
            uri: '/app/:aid/api/add'
            , controller: 'appApiAddCtrl'
            , templateUrl: 'modules/application/templetes/application-api-add.html'
            , ifMenu: false
            , name: 'appApiAdd'
            , title: '����'
            , icon: 'icon-plus'
            , api: 'restV1/appApi/post'
        }
        , {
            uri: '/app/show'
            , controller: 'appShowCtrl'
            , templateUrl: 'modules/application/templetes/application-show.html'
            , ifMenu: true
            , name: 'appShow'
            , title: '���ٷ���'
            , icon: 'icon-plus'
            , api: 'restV1/appShow/get'
        }]
    };
});