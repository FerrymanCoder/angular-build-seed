/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-11-1
 * Time: ����9:08
 */
define(function(){
    'use strict';

    return ['$scope', 'action', '$routeParams', 'userGroup', '$location', 'auth', '$q', function($scope, Action, $routeParams, userGroup, $location, Auth, $q){
        Auth.isLogined();

        //��ȡָ���û�����Ϣ
        var gid = $routeParams.gid;
        $scope.group = {};
        userGroup.find({gid: gid}).$promise.then(function(response){
            response.parentName = decodeURI(response.parentName);
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);

            $scope.group = response;

            $scope.pristine = angular.copy($scope.group);
        });

        //�����޸�
        $scope.reset = function(){
            $scope.group = angular.copy($scope.pristine);
        };

        $scope.isUnchanged = function(){
            return angular.equals($scope.group, $scope.pristine);
        };

        //�������ò���
        $scope.setting = {
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onMouseDown: onMouseDown
            }
            , async: {
                enable: true
                , type: 'get'
                , url: config.domain + 'group'
                , autoParam:['id', 'dataType']
                , otherParam:{'type': 'onlyNode', 'auth': window.localStorage.token}
            }
        };

        function onMouseDown(event, treeId, treeNode) {
            if(treeNode != null)
            {
                $scope.group.parentName = treeNode.name;
                $scope.group.parentId = treeNode.id;
                $scope.group.dataType = treeNode.dataType;

                $scope.$root.$$phase || $scope.$apply();  //����$digest already in progress
            }
        }

        //�޸���Ч��
        $scope.changeValidity = function(item, status){

            $scope.group.validity = status;

            //���뷵��promise����switchָ��ʹ��
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        //�����û���
        $scope.updateDate = function(){

            //ȥ��˸���
            var formData = {
                gid: $scope.group.groupId
                , name: $scope.group.name
                , parentId: $scope.group.parentId
                , dataType: $scope.group.dataType
                , validity: $scope.group.validity
                , info: $scope.group.info
            };

            userGroup.updateData(formData).$promise.then(function(response){
                if(response['status'] != 0){

                    //�ɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û������ϸ��ĳɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.group);

                }else{
                    //������ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û������ϸ���ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close:function(gid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('groupEdit', 'user' , {gid: gid}));
                            };
                        }($routeParams.gid)
                    });
                }
            });
        };
    }];
});