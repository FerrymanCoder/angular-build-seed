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
            , title: '�б�'
            , icon: 'icon-user'
            , api: 'restV1/users/get'
        }
        , {
            uri: '/user/add'
            , controller: 'userAddCtrl'
            , templateUrl: 'modules/user/templetes/user-add.html'
            , ifMenu: false
            , name: 'userAdd'
            , title: '�����û�'
            , icon: ''
            , api: 'restV1/user/post'
        }
        , {
            uri: '/user/edit/:uid'
            , controller: 'userEditCtrl'
            , templateUrl: 'modules/user/templetes/user-edit.html'
            , ifMenu: false
            , name: 'userEdit'
            , title: '�༭'
            , icon: 'icon-edit'
            , api: 'restV1/user/put'
        }
        , {
            uri: '/user/info/:uid'
            , controller: 'userInfoCtrl'
            , templateUrl: 'modules/user/templetes/user-info.html'
            , ifMenu: false
            , name: 'userInfo'
            , title: '��ϸ��Ϣ'
            , icon: ''
            , api: 'restV1/user/get'
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
            , api: 'restV1/user/put'
        }
        , {
            uri: '/user/:uid/group/list/:page'
            , controller: 'userGroupListCtrl'
            , templateUrl: 'modules/user/templetes/user-group-list.html'
            , ifMenu: false
            , name: 'userGroupList'
            , title: '�����û���'
            , icon: 'icon-group'
            , api: 'restV1/userGroup/get'
        }
        , {
            uri: '/user/:uid/psw'
            , controller: 'userPswCtrl'
            , templateUrl: 'modules/user/templetes/user-psw.html'
            , ifMenu: false
            , name: 'userPsw'
            , title: '���Ŀ���'
            , icon: 'icon-key'
            , api: 'restV1/user/put'
        }
        , {
            controller: 'userSystemListCtrl'
            , templateUrl: 'modules/user/templetes/user-system-list.html'
            , ifMenu: false
            , name: 'userSystemList'
            , title: '�ɷ���ϵͳ'
            , icon: 'icon-cloud'
            , api: 'restV1/userSystem/get'
        }]
    };
});