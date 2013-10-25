/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-30
 * Time: ����9:14
 */
define(function(){
    'use strict';

    return ['$scope', '$routeParams', '$location', 'auth', 'action', 'userGroup', '$modal', '$q', '$filter', function($scope, $routeParams, $location, Auth, Action, userGroup,$modal, $q, $filter){
        Auth.isLogined();

        var page = $routeParams.page - 1;
        $scope.uid = $routeParams.uid;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        Action.link('userEdit', 'user').success(function(response){
            $scope.switchFlag = response.status;
        });
        Action.link('userGroupBind', 'user').success(function(response){
            $scope.switchFlag = response.status;
        });

        //��ȡ���������
        $scope.downloadData = function(){
            $scope.isLoading = true;

            userGroup.groupList({page: ++page}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.name = decodeURI(item.name);
                    item.parentName = decodeURI(item.parentName);
                    item.app = decodeURI(item.app);
                    item.info = decodeURI(item.info);
                    $scope.data.push(item);
                });

                if(!response.hasMore){
                    $scope.hasManyData = false;
                }

                $scope.isLoading = false;
            });
        };

        //���ý�������������ɸѡ��������������
        $scope.resetFilter = function(){
            $scope.status = '';
            $scope.searchText = '';
            $scope.predicate = '';
            $scope.reverse = false;

            $scope.resetFlag = 0;
        };

        $scope.form = {group: 1, gid: $routeParams.gid};

        var modalPromise = $modal({
            template: 'form.html'
            , persist: true
            , show: false
            , backdrop: 'static'
            , scope: $scope
        });

        var modal = $q.when(modalPromise);

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
                , autoParam:['id']
                , otherParam:{'type': 'onlyNode', 'uid': $routeParams.uid, 'auth': window.localStorage.token}
            }
            , view: {
                addDiyDom: function(treeId, treeNode){

                    jQuery('#' + treeNode.tId + '_a').append('<span id="diyBtn_' + treeNode.id+ '"></span>');

                    jQuery("#diyBtn_"+treeNode.id).on("click", function(){

                        //�����������Ȩ�޵�ģ̬����
                        $scope.modalWin(treeNode.id);
                        $scope.$root.$$phase || $scope.$apply();
                    });
                }
            }
        };



        function onMouseDown(event, treeId, treeNode) {
            if(treeNode!=null)
            {
                $scope.form.parentName = treeNode.name;
                $scope.form.parentID=treeNode.id;
                $scope.$root.$$phase || $scope.$apply();  //����$digest already in progress
            }
        }

        //������Ч��
        $scope.changeValidity = function(index, status){

            var promise = userGroup.changStatus({page: page, gid: $scope.data[index].groupId }).$promise;
            promise.then(function(response){
                if(response['status'] == 0){

                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û�����Ч�Ը���ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('userGroup', 'user', {page:1}));
                        }
                    });
                }else{
                    $scope.data[index].validity = status;
                }
            });

            return promise; //����promse����switch����ж���ʾ״̬
        };

        //������ص�����
        $scope.searchData = function(){
            page=$routeParams.page-1;
            $scope.data=[];
            $scope.status = '';
            $scope.predicate = '';
            $scope.reverse = false;
            $scope.hasManyData=true;

            $location.hash($scope.searchText);
        };

        //ɾ��ָ���û�
        $scope.delete = function(object, index){
            object.isDelete = 1; //��ʶ�����ݱ�ɾ��

            userGroup.remove({gid: object.groupId}).$promise.then(function(reponse){
                if(reponse['status'] == 0){

                    object.isDelete = 0;    //ȡ�������ݵ�ɾ��״̬

                    //ɾ��������ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û�ɾ��ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('userGroup', 'user' , {page:1}));
                        }
                    });
                }else{
                    //���б���ɾ����������
                    $scope.data.splice(index, 1);

                    //ɾ���¹���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û�ɾ���ɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });
                }
            });
        };

        //�����༭��ģ̬����
        $scope.modalWin = function(row){

            $scope.updateRow = row;   //����ָ��ǰ�༭�Ĺ������ݶ������ڸ�����ʾ�б�
            $scope.form.name = row.name;
            $scope.form.parentName = row.parentName;
            $scope.form.parentId = row.parentId;
            $scope.form.groupId = row.groupId;
            modal.then(function(modalEl){
                modalEl.modal('show');
            });
        };

        //�����û���
        $scope.updateDate = function(){
            $scope.$root.$$phase || $scope.$apply();
            //ȥ��˸���
            var formData = {
                groupId: $scope.form.groupId
                , name:encodeURIComponent($scope.form.name)
                , parentId: encodeURIComponent($scope.form.parentId)
            };
            userGroup.updateData(formData).$promise.then(function(response){
                if(response['status'] != 0){
                    $scope.updateRow.name =$scope.form.name;
                    $scope.updateRow.parentName = $scope.form.parentName;
                    //�ɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û�����Ч�Ը��ĳɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });
                }else{
                    //������ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�û�����Ч�Ը���ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close:function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('userGroup', 'user' , {uid: uid, page: 1}));
                            };
                        }($routeParams.uid)
                    });
                }
            });
        };

        //��ȡ��һ������
        $scope.downloadData();

    }];
});