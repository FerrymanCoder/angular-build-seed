/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-22
 * Time: ����8:25
 */
define([
    'config'
], function(config){
    'use strict';

    return ['$resource', function($resource){
        return $resource(config.domain + 'database/:type/page/:page', {}, {
            dbList: {
                method: 'GET'
                , params: {type: 'dblist'}
            }
        });
    }];
});