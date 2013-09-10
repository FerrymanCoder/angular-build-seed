/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-10
 * Time: ����9:59
 */
define(function(){
    'use strict';

    var initialize = function(module){
        module.directive('action', ['action', function(action){
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

        return module;
    };

    return {
        initialize: initialize
    };
});