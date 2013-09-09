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
    , 'angular/angular-resource'
    , 'angular/angular-route'
], function(console, angular){
    'use strict';

    var initialize = function(needModules, routeRules){

        console.group('��ʼ����ģ������');

        var deps = ['ngResource', 'ngRoute'];
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

        //�ṩȡ���������ݵķ���
        mainModule.factory('action', ['acl', '$q', function(acl, $q){

            var data = routeRules;

            //���ڻ�ȡָ�����Ƶ��������ݣ�actionָ��ʹ��
            var link = function(name, group){

                var link = {};
                angular.forEach(data, function(item){
                    if(item && item.group == group){
                        angular.forEach(item.son, function(route){
                            if(route.name == name){
                                link = route;
                                return false;
                            }
                        });
                        return false;
                    }
                });

                if(angular.isUndefined(link.status)){
                    //ȥ��˻�ȡ
                    var promise = acl.status(link.api);
                    promise.then(function(response){

                        //������
                        link.status = response.data;
                        response.data = link;
                    });
                    return promise;

                }else{

                    var deferred = $q.defer();
                    deferred.resolve(link);
                    deferred.promise.success = function(fn){
                        deferred.promise.then(function(response){
                            fn(response);
                        });
                    };

                    return deferred.promise;
                }
            };

            //�������˵��ķ���
            var menu = function(){
                var menu = [];

                angular.forEach(data, function(item){
                    if(item){
                        var group = {};
                        group.group = item.group;
                        group.title = item.title;
                        group.icon = item.icon;
                        group.son = [];
                        angular.forEach(item.son, function(route){
                            if(route.ifMenu){
                                group.son.push(route);
                            }
                        });

                        if(group.son.length){
                            menu.push(group);
                        }
                    }
                });

                //ȥ�����֤���û��Բ˵����Ƿ���Ȩ�޲���
                //���˵������֤Ȩ�޲���Ҫ�����ԣ�����http���������
                var argument = [];
                angular.forEach(menu, function(item){
                    var group = {};
                    group.group = item.group;
                    group.son = [];

                    angular.forEach(item.son, function(route){
                        if(angular.isUndefined(route.status)){
                            var info = {};
                            info.name = route.name;
                            info.api = route.api;
                            group.son.push(info);
                        }
                    });

                    argument.push(group);
                });

                var flag = false;
                angular.forEach(argument, function(item){
                    if(item.son.length){
                        flag = true;
                    }
                });

                //���Ѿ����ڻ��棬��ֱ�ӷ���
                if(!flag){
                    var deferred = $q.defer();
                    deferred.resolve(menu);
                    deferred.promise.success = function(fn){
                        deferred.promise.then(function(response){
                            fn(response);
                        });
                    };

                    return deferred.promise;
                }

                //ȥ�����֤
                var promise = acl.verify(argument);
                promise.then(function(response){

                    //������֤�Ľ���������浽data�У��Ժ�Ͳ���Ҫ�ظ�������
                    angular.forEach(response.data, function(item){
                        //����menu��������ͼ�˵���ʾ
                        angular.forEach(menu, function(menuItem, menuKey){
                            if(menuItem.group == item.group){

                                angular.forEach(item.son, function(route){
                                    angular.forEach(menuItem.son, function(sonItem, sonKey){
                                        if(sonItem.name == route.name){

                                            menuItem.son[sonKey].status = route.status;
                                            return false;
                                        }
                                    });
                                });

                                menu[menuKey] = menuItem;
                                return false;
                            }
                        });
                    });

                    response.data = menu;
                });
                return promise;
            };

            return {
                link: link
                , menu: menu
            };
        }]);

        //����a��ǩָ��
        mainModule.directive('action', ['action', function(action){
            return {
                restrict: 'EA'
                , replace: true
                , template: '<a></a>'
                , link: function(scope, element, attrs){
                    action.link(attrs.name, attrs.group).success(function(data){
                        element.html('<i class="'+ data.icon + ' ' + (attrs.color ? attrs.color : '') + '"></i> ' + data.title);
                        element.attr('href', '#!' + data.uri);

                        //TODO ��Ҫ�жϵ�ǰ�û��Ƿ���Ȩ�޽��иò���
                        //element.remove(); //����Ȩ�ޣ�����ʾ������
                        //element.attr('class', element.attr('class') + ' disabled');   //����Ȩ�ޣ�����ø�����
                    });
                }
            }
        }]);

        //����layout����Ҫ�Ŀ�����
        //���˵�
        mainModule.controller('menuCtrl', ['$scope', 'action', '$timeout', function($scope, action, $timeout){
            $scope.menu = '';
            action.menu().success(function(data){
                $scope.menu = data;
            });

            $scope.menu2 = '';
            $timeout(function(){
                action.menu().success(function(data){
                    $scope.menu2 = data;
                });
            }, 3000);
        }]);

        return mainModule;
    };

    return {
        initialize: initialize
    };
});