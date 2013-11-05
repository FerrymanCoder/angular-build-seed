/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: ����4:21
 */
define([
    //��׼��
    'lib/console-min'
    , 'angular/angular'
    //������
    , 'modules/application/controllers/application-list'
    , 'modules/application/controllers/application-add'
    , 'modules/application/controllers/application-edit'
    , 'modules/application/controllers/application-ip-list'
    , 'modules/application/controllers/application-ip-add'
    , 'modules/application/controllers/application-ip-edit'
    , 'modules/application/controllers/application-api-list'
    , 'modules/application/controllers/application-api-add'
    , 'modules/application/controllers/application-api-edit'
    , 'modules/application/controllers/application-api-parameter'
    , 'modules/application/controllers/application-api-parameter-add'
    , 'modules/application/controllers/application-api-parameter-edit'
    , 'modules/application/controllers/application-show'
    //����
    , 'modules/application/services/application'
    , 'modules/application/services/ip'
    , 'modules/application/services/api'
    , 'modules/application/services/apiparameter'
    , 'modules/application/services/appShow'
    //ָ��
    //��
    , 'angular/angular-resource'
    , 'angular/angular-strap'

], function(
        console
        , angular
        , appListCtrl
        , appAddCtrl
        , appEditCtrl
        , appIpListCtrl
        , appIpAddCtrl
        , appIpEditCtrl
        , appApiListCtrl
        , appApiAddCtrl
        , appApiEditCtrl
        , appApiParameterCtrl
        , appApiParameterAddCtrl
        , appApiParameterEditCtrl
        , appShowCtrl
        , application
        , ipServ
        , apiServ
        , apiParameterServ
        , appShowServ){

    'use strict';

    console.group('Ӧ��ϵͳģ���ʼ��');

    var appModule = angular.module('appModule', ['ngResource', '$strap.directives']);

    appModule.factory('application', application);
    appModule.factory('ip', ipServ);
    appModule.factory('api', apiServ);
    appModule.factory('apiParameter', apiParameterServ);
    appModule.factory('appShow', appShowServ);

    appModule.controller('appListCtrl', appListCtrl);
    appModule.controller('appAddCtrl', appAddCtrl);
    appModule.controller('appEditCtrl', appEditCtrl);
    appModule.controller('appIpListCtrl', appIpListCtrl);
    appModule.controller('appIpAddCtrl', appIpAddCtrl);
    appModule.controller('appIpEditCtrl', appIpEditCtrl);
    appModule.controller('appApiListCtrl', appApiListCtrl);
    appModule.controller('appApiAddCtrl', appApiAddCtrl);
    appModule.controller('appApiEditCtrl', appApiEditCtrl);
    appModule.controller('appApiParameterCtrl', appApiParameterCtrl);
    appModule.controller('appApiParameterAddCtrl', appApiParameterAddCtrl);
    appModule.controller('appApiParameterEditCtrl', appApiParameterEditCtrl);
    appModule.controller('appShowCtrl', appShowCtrl);

    console.groupEnd();

    return appModule;
});