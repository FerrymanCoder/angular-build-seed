/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: ����9:54
 */
define([
    //��׼��
    'lib/console-min'
    , 'angular/angular'
    , 'common/init'
    , 'angular/angular-resource'
    , 'angular/angular-route'
    , 'angular/angular-animate'
    , 'angular/angular-strap'
], function(console, angular, common){
    'use strict';

    var initialize = function(needModules, routeRules){

        console.group('��ʼ����ģ������');

        var deps = ['ngResource', 'ngRoute', 'ngAnimate', '$strap.directives'];
        for(var index in needModules){
            deps.push(needModules[index].name);
        }

        console.info('��ȡ��ģ��������ģ�飺', deps);

        var mainModule = angular.module('webOS', deps);

        console.groupEnd();
        console.info('�����Ӧ�õ���ģ�飺', mainModule.name);

        mainModule.config(['$httpProvider', '$locationProvider', '$routeProvider', '$windowProvider', function($httpProvider, $locationProvider, $routeProvider, $windowProvider){

            $locationProvider.html5Mode(false).hashPrefix('!');

            console.group('��ʼ����ģ���·�ɹ���');

            angular.forEach(routeRules, function(item){
                if(typeof(item) != 'undefined'){
                    angular.forEach(item.son, function(route){

                        if(!angular.isUndefined(route.uri)){
                            console.info('����·�ɣ�', route.uri);

                            $routeProvider.when(route.uri, {
                                templateUrl: route.templateUrl
                                , controller: route.controller
                            });
                        }
                    });
                }
            });

            //TODO ����Ӳ����
            $routeProvider.otherwise({redirectTo:'/dashboard'});

            console.groupEnd();

            //TODO Ϊ�˼��ݾ����������Ҫ��������������˳־û�token�ķ���
            if(window.localStorage.token){
                $httpProvider.defaults.headers.common['AUTH'] = 'MD ' + window.localStorage.token;
            }

            //��Ӧ�����������ڼ���¼״̬
            $httpProvider.interceptors.push(function($q){
                return {
                    'response': function(response){

                        //�����ص�������ָʾ���û�δ��¼���򴥷���ת����¼ҳ��
                        if(!angular.isUndefined(response.data)){
                            if(!angular.isUndefined(response.data.loginStatus) && response.data.loginStatus == 0){
                                delete window.localStorage.token;   //ɾ���Ựid
                                $windowProvider.$get().location.href = config.host + 'login.html';
                            }
                        }

                        return response || $q.when(response);
                    }
                };
            });
        }]);

        //����ͨ��ģ��
        common.initialize(mainModule, routeRules);

        //���ڿؼ�������
        mainModule.value('$strapConfig', {
            datepicker: {
                language:  'zh-CN'
                , weekStart: 1
                , todayBtn:  1
                , autoclose: 1
                , todayHighlight: 1
                , keyboardNavigation: 1
                , pickerPosition: 'bottom-left'
                , format: 'yyyy-mm-dd'
            }
        });

        return mainModule;
    };

    return {
        initialize: initialize
    };
});