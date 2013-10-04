/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-5
 * Time: ����9:43
 */
define([
    //��׼��
    'lib/console-min'
    //����
    , 'common/services/auth'
    , 'common/services/acl'
    , 'common/services/action'
    //ָ��
    , 'common/directives/action'
    , 'common/directives/sidebar-menu'
    , 'common/directives/bread-crumbs'
    , 'common/directives/table-fixed-header'
    , 'common/directives/switch'
    , 'common/directives/ztree'
    //������
    , 'common/controllers/menu'
], function(console, auth, acl, actionS, actionD, siderbarMenu, breadCrumbs, tableFixedHeader, switchD, ztree, menu){
    'use strict';

    var initialize = function(module, routeRules){
        console.group('ͨ��ģ���ʼ��');

        console.info('��ʼ������', ['auth', 'acl', 'action']);
        //��ʼ������
        auth.initialize(module, routeRules);
        acl.initialize(module, routeRules);
        actionS.initialize(module, routeRules);

        console.info('��ʼ��ָ�', ['action', 'siderbar-menu', 'bread-crumbs', 'table-fixed-header']);
        //��ʼ��ָ��
        actionD.initialize(module);
        siderbarMenu.initialize(module);
        breadCrumbs.initialize(module);
        tableFixedHeader.initialize(module);
        switchD.initialize(module);
        ztree.initialize(module);

        console.info('��ʼ����������', ['menu']);
        //��ʼ��������
        menu.initialize(module);

        console.groupEnd();

        return module;
    }

    return {
        initialize: initialize
    };
});