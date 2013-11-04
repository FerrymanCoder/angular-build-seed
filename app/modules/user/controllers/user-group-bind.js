/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-8
 * Time: ����3:45
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$routeParams','userGroup', function($scope, Auth, Action,$routeParams, userGroup){
        Auth.isLogined();

        //��ȡ�û���Ϣ
        $scope.group = {bindGroups: []};

        userGroup.get({gid: $routeParams.gid, uid: 0, type: 'bind'}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);
            response.parentName = decodeURI(response.parentName);
            response.bindGroupName = '';

            angular.forEach( response.bindGroups, function(bind){
                bind.name = decodeURI(bind.name);
                response.bindGroupName += bind.name + '��';
            });

            $scope.group = response;
            $scope.pristine = angular.copy($scope.group);
        });

        $scope.isUnchanged = function(){
            return angular.equals($scope.group, $scope.pristine);
        };

        //������
        $scope.setting = {
            data: {
                simpleData: {
                    enable: true
                }
            },
            check:{
                enable: true,
                chkStyle: "checkbox"  ,
                autoCheckTrigger: false ,
                chkboxType : {"Y": "", "N": "" }   //���ڵ㹴ѡ������ѡ�ӽڵ�
            }
            ,
            callback: {
                onCheck: onCheck ,
                onAsyncSuccess: zTreeOnAsyncSuccess
            }
            , async: {
                enable: true
                , type: 'get'
                , url: config.domain + 'group'
                , autoParam:['id', 'dataType']
                , otherParam:{'type': 'onlyNode', gid:$routeParams.gid, treeType:'bind', 'auth': window.localStorage.token}
            }
            , view: {
                addDiyDom: function(treeId, treeNode){

                    jQuery('#' + treeNode.tId + '_a').append('<span id="diyBtn_' + treeNode.id+ '"></span>');

                    jQuery("#diyBtn_"+treeNode.id).on("click", function(){

                    });
                }
            }
        };

        //���ɹ��������ݺ�ִ�еĻص�����
        function zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {
            if(treeNode != null ){
                var treeObj = $.fn.zTree.getZTreeObj("selectTree");
                $.each(treeNode.children,function(treeIndex,treeVal){
                    $.each($scope.group.bindGroups,function(index,val){
                        if(treeVal.id==val.id){
                          treeObj.checkNode(treeNode.children[treeIndex], true, true);
                        }
                    });
                });
            }
        };

        //����ѡ�к�ȡ��ѡ���¼�����
        function onCheck (event, treeId, treeNode) {

            if(treeNode.checked)
            {
                $scope.group.bindGroupName += treeNode.name + '��';
                $scope.group.bindGroups.push({id: treeNode.id, name: treeNode.name, isParent: treeNode.isParent, checked :treeNode.checked});

            }else{

                angular.forEach($scope.group.bindGroups, function(val, key){
                    if(val.id == treeNode.id){
                        $scope.group.bindGroups.splice(key, 1);
                        return false;
                    }
                });

                $scope.group.bindGroupName = '';
                angular.forEach($scope.group.bindGroups, function(bind){
                    $scope.group.bindGroupName += bind.name + '��';
                });
            }

            $scope.$root.$$phase || $scope.$apply();  //����$digest already in progress
        }

        $scope.save = function(){

            $scope.isLoading = true;
            //ȥ��˸���
            var formData = {
                groupId: $scope.group.groupId

                , bindGroups: []
            };

            angular.forEach( $scope.group.bindGroups, function(bind){
                formData.bindGroups.push(bind.id);
            });

            //ȥ��˸���
            userGroup.save(formData).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //�޸ĳɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û��󶨳ɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });
                    $scope.pristine = angular.copy($scope.user);

                }else{
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û���ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('userGroupBind', 'user'));
                        }
                    });
                }
            });
        };
    }];
});