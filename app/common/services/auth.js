/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-5
 * Time: ����9:16
 */
define(function(){
    'use strict';

    var initialize = function(module){
        module.factory('auth', ['$location', function($location){
            return {
                isLogined: function(data){
                    //TODO Ϊ�˼��ݾ����������Ҫ��������������˳־û�token�ķ���
                    if(!window.localStorage.token){
                        //TODO ����Ӳ����
                        $location.path('/login').replace();
                    }

                    //������󷵻صĽ���а�����Ȩʧ����Ϣ������������ת
                    if(typeof(data) == "object" && data.status == 0){
                        //TODO ����Ӳ����
                        $location.paht('/login').replace();
                    }
                }
                , userInfo: function(user){
                    if(angular.isUndefined(user)){
                        return {
                            id: window.localStorage.userId
                            ,account: window.localStorage.userAccount
                            , name: window.localStorage.userName
                            , idCard: window.localStorage.userIdCard
                            , sex: window.localStorage.userSex
                            , type: window.localStorage.userType
                            , email: window.localStorage.userEmail
                            , qq: window.localStorage.userQq
                            , phone: window.localStorage.userPhone
                            , mobile: window.localStorage.userMobile
                            , info: window.localStorage.userInfo
                            , photo: window.localStorage.userPhoto
                        };
                    }else{
                        window.localStorage.userId = user.id || 0;
                        window.localStorage.userAccount = user.account || '';
                        window.localStorage.userName = user.name || '';
                        window.localStorage.userIdCard = user.idCard || '';
                        window.localStorage.userSex = user.sex || -1;
                        window.localStorage.userType = user.type || '';
                        window.localStorage.userEmail = user.email || '';
                        window.localStorage.userQq = user.qq || '';
                        window.localStorage.userPhone = user.phone || '';
                        window.localStorage.userMobile = user.mobile || '';
                        window.localStorage.userInfo = user.info || '';
                        window.localStorage.userPhoto = user.photo || '';
                    }
                }
            };
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});