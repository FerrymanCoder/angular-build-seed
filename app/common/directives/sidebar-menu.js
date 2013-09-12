/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-11
 * Time: ����10:24
 */
define(function(){
    'use strict';

    var initialize = function(module){

        module.directive('kzSidebarMenu', [function(){
            return {
                restrict: 'EA'
                , replace: true
                , template: '<ul>' +
                                '<li data-ng-repeat="item in data" data-ng-class="{active: checkActive(item.sonUris)}" class="submenu">' +
                                    '<a data-ng-click="toggle(item)"><i class="{{ item.icon }}  icon-white"></i> <span>{{ item.title }}</span> <span class="label label-important">{{ item.son.length }}</span></a>' +
                                    '<ul data-ng-show="item.switch">' +
                                        '<li data-ng-repeat="operation in item.son">' +
                                            '<a href="#!{{ createLink(operation.uri) }}">{{ operation.title }}</a>' +
                                        '</li>' +
                                    '</ul>' +
                                '</li>' +
                            '</ul>'
                , scope: {
                    data: '='
                }
                , controller: ['$location', function($location){
                    //�жϵ�ǰ�˵����Ƿ�ѡ�У�������ǰurl��ʾ��ҳ��
                    this.checkActive = function(uris){
                        var currentUri = $location.path()
                            , flag = false;

                        angular.forEach(uris, function(item){
                            var reg = new RegExp(item.replace(/:(.*)[\/]?/g, '(.*)'), 'ig');
                            if(reg.test(currentUri)){
                                flag = true;
                                return false;
                            }
                        });

                        return flag;
                    };

                    //��ʼ�������еĶ�̬����
                    this.createLink = function(argObj){
                        return function(uri){
                            angular.forEach(argObj, function(value, key){
                                uri = uri.replace(':'+key, value);
                            });
                            return uri;
                        };
                    }
                }]
                , link: function(scope, element, attrs, controller){
                    scope.checkActive = controller.checkActive;
                    scope.createLink = controller.createLink((new Function('return ' + attrs.args))());

                    scope.toggle = function(item){
                        item.switch = !item.switch;
                    };

                    console.log(attrs.args);
                }
            };
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});