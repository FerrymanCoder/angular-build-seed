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
    //������
    , 'common/controllers/menu'
], function(console, auth, acl, actionS, actionD, siderbarMenu, menu){
    'use strict';

    var initialize = function(module, routeRules){
        console.group('ͨ��ģ���ʼ��');

        console.info('��ʼ������', ['auth', 'acl', 'action']);
        //��ʼ������
        auth.initialize(module, routeRules);
        acl.initialize(module, routeRules);
        actionS.initialize(module, routeRules);

        console.info('��ʼ��ָ�', ['action', 'siderbar-menu']);
        //��ʼ��ָ��
        actionD.initialize(module);
        siderbarMenu.initialize(module);

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