/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-4
 * Time: ����10:42
 */
define(function(){
    'use strict';

    //����Ҫ���ص�ģ��������ļ���ַ
    var loadModules = function(directorys){
        var deps = [];

        for(var key in directorys){
            deps.push(directorys[key] + '/init');
        }

        return deps;
    };

    //����Ҫ�����·�ɹ���
    var loadRouteRules = function(directorys){
        var deps = [];

        for(var key in directorys){
            deps.push(directorys[key] + '/route');
        }

        return deps;
    };

    return {
        loadModules: loadModules
        , loadRouteRules: loadRouteRules
    };
});