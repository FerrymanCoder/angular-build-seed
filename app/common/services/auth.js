/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-5
 * Time: ����9:16
 */
define(function(){
    'use strict';

    return ['$location', function($location){
        return function(data){
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
        };
    }];
});