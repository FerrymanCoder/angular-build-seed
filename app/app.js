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
], function(console, angular, common){
    'use strict';

    var initialize = function(needModules, routeRules){

        console.group('��ʼ����ģ������');

        var deps = ['ngResource', 'ngRoute', 'ngAnimate'];
        for(var index in needModules){
            deps.push(needModules[index].name);
        }

        console.info('��ȡ��ģ��������ģ�飺', deps);

        var mainModule = angular.module('webOS', deps);

        console.groupEnd();
        console.info('�����Ӧ�õ���ģ�飺', mainModule.name);

        mainModule.config(['$httpProvider', '$locationProvider', '$routeProvider', function($httpProvider, $locationProvider, $routeProvider){

            $locationProvider.html5Mode(false).hashPrefix('!');

            console.group('��ʼ����ģ���·�ɹ���');

            angular.forEach(routeRules, function(item){
                if(typeof(item) != 'undefined'){
                    angular.forEach(item.son, function(route){

                        console.info('����·�ɣ�', route.uri);

                        $routeProvider.when(route.uri, {
                            templateUrl: route.templateUrl
                            , controller: route.controller
                        });
                    });
                }
            });

            //TODO ����Ӳ����
            $routeProvider.otherwise({redirectTo:'/dashboard'});

            console.groupEnd();

            //TODO Ϊ�˼��ݾ����������Ҫ��������������˳־û�token�ķ���
            if(window.localStorage.token){
                $httpProvider.defaults.headers.common['Authorization'] = 'MD ' + window.localStorage.token;
            }
        }]);

        //����ͨ��ģ��
        common.initialize(mainModule, routeRules);

        return mainModule;
    };

    return {
        initialize: initialize
    };
});