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
    , 'modules/user/controllers/user-group-bind'
    , 'modules/user/controllers/user-group-user'
    , 'modules/user/controllers/user-app-list'
    , 'modules/user/controllers/user-app-add'
    , 'modules/user/controllers/user-add'
    , 'modules/user/controllers/usergroup-add'
    , 'modules/user/controllers/someone-group'
    , 'modules/user/controllers/user-group-add'
    , 'modules/user/controllers/user-group-edit'
    //����
    , 'modules/user/services/user'
    //�û���ʾ�û���
    , 'modules/user/services/group'
    //�û���
    , 'modules/user/services/usergroup'
    //�û�������û�
    , 'modules/user/services/usergroupuser'
    , 'modules/user/services/userApp'
    //ָ��
    , 'modules/user/directives/password-strength'
    //��
    , 'angular/angular-resource'
    , 'angular/angular-strap'
], function(
        console
        , angular
        , userSelfCtrl
        , userSelfPswCtrl
        , userListCtrl
        , userEditCtrl
        , userGroupCtrl
        , userGroupBindCtrl
        , userGroupUserCtrl
        , userAppListCtrl
        , userAppAddCtrl
        , userAddCtrl
		, userGroupAddCtrl
        , someoneGroupCtrl
        , userForGroupAddCtrl
        , userGroupEditCtrl
        , user
        , group
        , userGroup
        , usergroupuser
        , userApp
        , pswStrength){
   'use strict';

    console.group('�û�ģ���ʼ��');

    var userModule = angular.module('userModule', ['ngResource', '$strap.directives']);

    userModule.factory('user', user);
    userModule.factory('group', group);
    userModule.factory('userGroup', userGroup);
    userModule.factory('usergroupuser', usergroupuser);
    userModule.factory('userApp', userApp);

    userModule.controller('userSelfCtrl', userSelfCtrl);
    userModule.controller('userSelfPswCtrl', userSelfPswCtrl);
    userModule.controller('userListCtrl', userListCtrl);
    userModule.controller('userEditCtrl', userEditCtrl);
    userModule.controller('userGroupCtrl', userGroupCtrl);
    userModule.controller('userGroupBindCtrl', userGroupBindCtrl);
    userModule.controller('userGroupUserCtrl', userGroupUserCtrl);
    userModule.controller('userAppListCtrl', userAppListCtrl);
    userModule.controller('userAppAddCtrl', userAppAddCtrl);
    userModule.controller('userAddCtrl', userAddCtrl);
    userModule.controller('userGroupAddCtrl', userGroupAddCtrl);
    userModule.controller('someoneGroupCtrl', someoneGroupCtrl);
    userModule.controller('userForGroupAddCtrl', userForGroupAddCtrl);
    userModule.controller('userGroupEdit', userGroupEditCtrl);

    userModule.directive('kzPasswordStrength', pswStrength);

    console.groupEnd();

    return userModule;
});