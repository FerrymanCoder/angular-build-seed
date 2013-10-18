/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: ����3:23
 */
define(function(){
    'use strict';

    return {
        group: 'privilege'
        , title: 'Ȩ�޹���'
        , icon: 'icon-eye-open'
        , son:[{
            uri: '/privilege/list/:page'
            , controller: 'prvListCtrl'
            , templateUrl: 'modules/privilege/templetes/privilege-list.html'
            , ifMenu: true
            , name: 'privilegeList'
            , title: 'Ȩ���б�'
            , icon: 'icon-eye-open'
            , api: 'restV1/privilege/get'
        }
        , {
            uri: '/privilege/uid/:uid/list/:page'
            , controller: 'prvUserListCtrl'
            , templateUrl: 'modules/privilege/templetes/user-privilege-list.html'
            , ifMenu: false
            , name: 'privilegeUserList'
            , title: 'Ȩ���б�'
            , icon: 'icon-screenshot'
            , api: 'restV1/userPrivilege/get'
        }
        , {
            uri: '/privilege/gid/:gid/list/:page'
            , controller: 'prvUserGroupListCtrl'
            , templateUrl: 'modules/privilege/templetes/user-group-privilege-list.html'
            , ifMenu: false
            , name: 'privilegeUserGroupList'
            , title: '�û���Ȩ��'
            , icon: 'icon-screenshot'
            , api: 'restV1/userGroupPrivilege/get'
        }
        , {
            ifMenu: false
            , name: 'privilegeUserDelete'
            , title: 'ɾ��'
            , icon: 'icon-trash'
            , api: 'restV1/userPrivilege/delete'
        }
        ,{
            ifMenu: false
            , name: 'privilegeUserEdit'
            , title: '�༭'
            , icon: 'icon-edit'
            , api: 'restV1/userPrivilege/put'
        }
        ,{
            ifMenu: false
            , name: 'privilegeUserGroupEdit'
            , title: '�༭'
            , icon: 'icon-edit'
            , api: 'restV1/userGroupPrivilege/put'
        }
        ,{
            uri: '/privilege/gid/:gid/add'
            , controller: 'userGroupPrvAddCtrl'
            , templateUrl: 'modules/privilege/templetes/user-group-privilege-add.html'
            , ifMenu: false
            , name: 'privilegeUserGroupAdd'
            , title: '����'
            , icon: 'icon-plus'
            , api: 'restV1/userGroupPrivilege/post'
        }
        ,{
            uri: '/privilege/uid/:uid/add'
            , controller: 'userPrvAddCtrl'
            , templateUrl: 'modules/privilege/templetes/user-privilege-add.html'
            , ifMenu: false
            , name: 'privilegeUserAdd'
            , title: '����'
            , icon: 'icon-plus'
            , api: 'restV1/userPrivilege/post'
        }]
    };
});