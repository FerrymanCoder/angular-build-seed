/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: ����4:22
 */
define([
    //��׼��
    'lib/console-min'
    , 'angular/angular'
    //������
    , 'modules/privilege/controllers/privilege-list'
    , 'modules/privilege/controllers/user-privilege-list'
    , 'modules/privilege/controllers/user-privilege-add'
    , 'modules/privilege/controllers/user-group-privilege-list'
    , 'modules/privilege/controllers/user-group-privilege-add'
    //����
    , 'modules/privilege/services/privilege'
    , 'modules/privilege/services/userPrivilege'
    , 'modules/privilege/services/userGroupPrivilege'
    //ָ��
    //��
    , 'angular/angular-resource'
    , 'angular/angular-strap'
], function(console, angular, prvListCtrl, userPrvListCtrl, userPrvAddCtrl, userGroupPrvListCtrl, userGroupPrvAddCtrl,privServ, userPrvServ, userGroupPrvServ){
    'use strict';

    console.group('Ȩ��ģ���ʼ��');

    var privilegeModule = angular.module('privilegeModule', ['ngResource']);

    privilegeModule.factory('privilege', privServ);
    privilegeModule.factory('userPrivilege', userPrvServ);
    privilegeModule.factory('userGroupPrivilege', userGroupPrvServ);

    privilegeModule.controller('prvListCtrl', prvListCtrl);
    privilegeModule.controller('prvUserListCtrl', userPrvListCtrl);
    privilegeModule.controller('userPrvAddCtrl', userPrvAddCtrl);
    privilegeModule.controller('prvUserGroupListCtrl', userGroupPrvListCtrl);
    privilegeModule.controller('userGroupPrvAddCtrl', userGroupPrvAddCtrl);
    console.groupEnd();

    return privilegeModule;
});