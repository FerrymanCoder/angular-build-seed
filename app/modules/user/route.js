/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: ����3:01
 */
define(function(){
    'use strict';

    return {
        group: 'user'
        , title: '�û�����'
        , icon: 'icon-user'
        , son:[{
            uri: '/users/list/:page'
            , controller: 'userListCtrl'
            , templateUrl: 'modules/user/templetes/user-list.html'
            , ifMenu: true
            , name: 'userList'
            , title: '�û��б�'
            , icon: 'icon-user'
            , api: 'restV1/users/get'
        }
        ,{
            uri: '/users/grouplist/:page'
            , controller: 'userGroupCtrl'
            , templateUrl: 'modules/user/templetes/user-group.html'
            , ifMenu: true
            , name: 'userGroup'
            , title: '�û���'
            , icon: 'icon-user'
            , api: 'restV1/users/get'
        }
        , {
            uri: '/user/add'
            , controller: 'userAddCtrl'
            , templateUrl: 'modules/user/templetes/user-add.html'
            , ifMenu: false
            , name: 'userAdd'
            , title: '����'
            , icon: 'icon-plus'
            , api: 'restV1/user/post'
        }
        , {
            uri: '/userGroup/add'
            , controller: 'userGroupAddCtrl'
            , templateUrl: 'modules/user/templetes/userGroup-add.html'
            , ifMenu: false
            , name: 'userGroupAdd'
            , title: '�����û���'
            , icon: 'icon-plus'
            , api: 'restV1/userGroup/put'
        }
        , {
            uri: '/user/:uid/info'
            , controller: 'userEditCtrl'
            , templateUrl: 'modules/user/templetes/user-edit.html'
            , ifMenu: false
            , name: 'userEdit'
            , title: '�༭'
            , icon: 'icon-edit'
            , api: 'restV1/user/put'
        }
        , {
            uri: '/userGroup/:gid/info'
            , controller: 'userGroupEdit'
            , templateUrl: 'modules/user/templetes/user-group-edit.html'
            , ifMenu: false
            , name: 'groupEdit'
            , title: '�༭'
            , icon: 'icon-edit'
            , api: 'restV1/userGroup/put'
        }
        , {
            ifMenu: false
            , name: 'userDelete'
            , title: 'ɾ��'
            , icon: 'icon-trash'
            , api: 'restV1/user/delete'
        }
        , {
            uri: '/user/self'
            , controller: 'userSelfCtrl'
            , templateUrl: 'modules/user/templetes/user-self.html'
            , ifMenu: false
            , name: 'userSelf'
            , title: '������Ϣ'
            , icon: 'icon-list-alt'
            , api: 'restV1/user/get'
        }
        , {
            uri: '/user/self-psw'
            , controller: 'userSelfPswCtrl'
            , templateUrl: 'modules/user/templetes/user-self-psw.html'
            , ifMenu: false
            , name: 'userSelfPsw'
            , title: '���Ŀ���'
            , icon: 'icon-key'
            , api: 'restV1/user/post'
        }
        , {
            uri: '/user/:uid/group/list/:page'
            , controller: 'someoneGroupCtrl'
            , templateUrl: 'modules/user/templetes/someone-group.html'
            , ifMenu: false
            , name: 'userGroupList'
            , title: '�����û���'
            , icon: 'icon-group'
            , api: 'restV1/userGroup/get'
        }
        , {
            uri: '/group/:gid/privilege/list/:page'
            , controller: 'userGroupPrivilegeCtrl'
            , templateUrl: 'modules/user/templetes/user-group-Privilege.html'
            , ifMenu: false
            , name: 'userGroupPrivilege'
            , title: '�û���Ȩ��'
            , icon: 'icon-group'
            , api: 'restV1/userGroup/get'
        }
        , {
            uri: '/group/:gid/user/list/:page'
            , controller: 'userGroupUserCtrl'
            , templateUrl: 'modules/user/templetes/user-group-user.html'
            , ifMenu: false
            , name: 'userGroupUserList'
            , title: '�û����Ա'
            , icon: 'icon-group'
            , api: 'restV1/userGroup/get'
        }
        , {
           uri: '/group/:gid/bind'
            , controller: 'userGroupBindCtrl'
            , templateUrl: 'modules/user/templetes/user-group-bind.html'
            ,ifMenu: false
            , name: 'userGroupBind'
            , title: '���û���'
            , icon: 'icon-group'
            , api: 'restV1/userGroup/post'
        }
        , {
            ifMenu: false
            , name: 'userPsw'
            , title: '���Ŀ���'
            , icon: 'icon-key'
            , api: 'restV1/user/put'
        }
        , {
            uri: '/user/:uid/app/:aid/list/:page'
            , controller: 'userAppListCtrl'
            , templateUrl: 'modules/user/templetes/user-app-list.html'
            , ifMenu: false
            , name: 'userAppList'
            , title: '�ɷ���ϵͳ'
            , icon: 'icon-cloud'
            , api: 'restV1/userApp/get'
        }
        ,{
            ifMenu: false
            , name: 'userAppDelete'
            , title: 'ɾ��'
            , icon: 'icon-trash'
            , api: 'restV1/userApp/delete'
        }
        ,{
            uri: '/user/:uid/app/add'
            , controller: 'userAppAddCtrl'
            , templateUrl: 'modules/user/templetes/user-app-add.html'
            , ifMenu: false
            , name: 'userAppAdd'
            , title: '����'
            , icon: 'icon-plus'
            , api: 'restV1/userApp/post'
        }
        ,{
            uri: '/user/:uid/group/add'
            , controller: 'userForGroupAddCtrl'
            , templateUrl: 'modules/user/templetes/user-group-add.html'
            , ifMenu: false
            , name: 'userForGroupAdd'
            , title: '����'
            , icon: 'icon-plus'
            , api: 'restV1/userApp/post'
        }]
    };
});