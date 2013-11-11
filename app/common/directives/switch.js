/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-26
 * Time: ����5:45
 */
define(function(){
    'use strict';

    var initialize = function(module){
        module.directive('kzSwitch', [function(){
            return {
                restrict: 'E'
                , replace: true
                , template: '<div class="make-switch switch-mini">' +
                                '<input type="checkbox" />' +
                            '</div>'
                , scope: {
                    id: '='
                    , method: '&'
                    , model: '='
                    , active: '='
                }
                , link: function(scope, element, attrs){

                    element.bootstrapSwitch();
                    element.bootstrapSwitch('setState', scope.model);
                    element.bootstrapSwitch('setActive', scope.active);

                    element.on('switch-change', function(e, data){
                        scope.method({item: scope.id, status: data.value}).then(function(response){
                            element.bootstrapSwitch('setState', !data.value, true);
                        });    //����ҵ��ص�
                        scope.$root.$$phase || scope.$apply();  //����$digest already in progress
                    });

                    scope.$watch('model', function(value){
                        element.bootstrapSwitch('setState', value, true);   //�������������ڽ�ֹ����'switch-change'�¼���������ѭ��
                    });

                    scope.$watch('active', function(value){
                        element.bootstrapSwitch('setActive', value);
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