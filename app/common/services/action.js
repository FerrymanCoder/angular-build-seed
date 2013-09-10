/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-10
 * Time: ����10:02
 */
define(function(){
    'use strict';

    var initialize = function(module, routeRules){

        module.factory('action', ['acl', '$q', function(acl, $q){
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

        return module;
    };

    return {
        initialize: initialize
    };
});