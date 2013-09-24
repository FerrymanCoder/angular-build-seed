/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-10
 * Time: ����9:59
 */
define(function(){
    'use strict';

    var initialize = function(module){
        module.directive('kzAction', ['action', function(action){
            return {
                restrict: 'EA'
                , replace: true
                , template: '<a></a>'
                , link: function(scope, element, attrs){
                    action.link(attrs.name, attrs.group).success(function(response){

                        var data = angular.copy(response);

                        element.html('<i class="'+ data.icon + '"></i> ' + data.title);

                        if(data.status == 0){
                            //TODO ��Ҫ�жϵ�ǰ�û��Ƿ���Ȩ�޽��иò���
                            //element.remove(); //����Ȩ�ޣ�����ʾ������
                            element.attr('class', element.attr('class') + ' disabled');   //����Ȩ�ޣ�����ø�����
                        }else{
                            if(!angular.isUndefined(data.uri)){
                                //�滻uri�еĶ�̬����
                                if(attrs.args){
                                    //���ַ���ת����js����
                                    var argObj = (new Function('return ' + attrs.args))();
                                    angular.forEach(argObj, function(value, key){
                                        data.uri = data.uri.replace(':'+key, value);
                                    });
                                }
                                element.attr('href', '#!' + data.uri);
                            }
                        }
                    });
                }
            };
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});