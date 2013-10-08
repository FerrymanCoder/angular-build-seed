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
    , 'modules/user/controllers/self'
    , 'modules/user/controllers/self-psw'
    , 'modules/user/controllers/user-list'
    , 'modules/user/controllers/user-edit'
    , 'modules/user/controllers/user-group'
    //����
    , 'modules/user/services/user'
    , 'modules/user/services/group'
    //ָ��
    , 'modules/user/directives/password-strength'
    //��
    , 'angular/angular-resource'
    , 'angular/angular-strap'

], function(console, angular, userSelfCtrl, userSelfPswCtrl, userListCtrl, userEditCtrl, userGroupCtrl, user, group, pswStrength){
   'use strict';

    console.group('�û�ģ���ʼ��');

    var userModule = angular.module('userModule', ['ngResource', '$strap.directives']);

    userModule.factory('user', user);
    userModule.factory('group', group);
    userModule.controller('userSelfCtrl', userSelfCtrl);
    userModule.controller('userSelfPswCtrl', userSelfPswCtrl);
    userModule.controller('userListCtrl', userListCtrl);
    userModule.controller('userEditCtrl', userEditCtrl);
    userModule.controller('userGroupCtrl', userGroupCtrl);

    userModule.directive('kzPasswordStrength', pswStrength);

    console.groupEnd();

    return userModule;
});