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
        $scope.data.bindGroups = [];

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
                    item.bindGroupName="";
                    angular.forEach( item.bindGroups, function(bind){
                        bind.name = decodeURI(bind.name);
                        item.bindGroupName+=bind.name+",";
                    });
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

        $scope.bindForm = {group: 1, gid: $routeParams.gid};
        $scope.form = {group: 1, gid: $routeParams.gid};
        var bindModalPromise = $modal({
            template: 'bindform.html'
            , persist: true
            , show: false
            , backdrop: 'static'
            , scope: $scope
        });

        var modalPromise = $modal({
            template: 'form.html'
            , persist: true
            , show: false
            , backdrop: 'static'
            , scope: $scope
        });

        var bindModal = $q.when(bindModalPromise);
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
                , otherParam:{'type': 'onlyNode', 'uid': $routeParams.uid}
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

        function onCheck (event, treeId, treeNode) {
            if(treeNode!=null)
            {
                if(treeNode.checked)
                {
                    $scope.bindForm.bindGroupName+=treeNode.name+",";
                    $scope.data.bindGroups.push({id:treeNode.id,name:treeNode.name});
                }
                else
                {
                    $scope.data.bindGroups.push({id:treeNode.id,name:treeNode.name});
                    //�ص���������������,��һ����Ԫ������,�ڶ���Ϊ��ǰֵ
                    $.each($scope.data.bindGroups,function(key,val){
                        if(val&&val.id==treeNode.id){
                            $scope.data.bindGroups.splice(key,1);
                          //  break;
                        }
                    });
                    $scope.bindForm.bindGroupName="";
                    angular.forEach( $scope.data.bindGroups, function(bind){
                        $scope.bindForm.bindGroupName+=bind.name+",";
                    });
                }
                $scope.$root.$$phase || $scope.$apply();  //����$digest already in progress
            }
        }

        $scope.checkedSetting = {
            data: {
                simpleData: {
                    enable: true
                }
            },
            check:{
                enable:true,
                chkStyle:"checkbox"
            }
            ,
            callback: {
                onCheck: onCheck
            }
            , async: {
                enable: true
                , type: 'get'
                , url: config.domain + 'group'
                , autoParam:['id']
                , otherParam:{'type': 'onlyNode', 'uid': $routeParams.uid}
            }
            , view: {
                addDiyDom: function(treeId, treeNode){

                    jQuery('#' + treeNode.tId + '_a').append('<span id="diyBtn_' + treeNode.id+ '"></span>');

                    jQuery("#diyBtn_"+treeNode.id).on("click", function(){

                        //�����������Ȩ�޵�ģ̬����
                        $scope.bindModalWin(treeNode.id);
                        $scope.$root.$$phase || $scope.$apply();
                    });
                }
            }
        };

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

            Group.remove({gid: object.groupId}).$promise.then(function(reponse){
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
        $scope.bindModalWin = function(row){

            $scope.updateRow = row;   //����ָ��ǰ�༭�Ĺ������ݶ������ڸ�����ʾ�б�
            $scope.bindForm.name = row.name;
            $scope.bindForm.bindGroupName = row.bindGroupName;
            $scope.bindForm.validity = row.validity;
            $scope.bindForm.pid = row.id;
            bindModal.then(function(modalEl){
                modalEl.modal('show');
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

        //�رհ��û��鵯����
        $scope.hideBindWin = function(){
            bindModal.then(function(modalEl){
                modalEl.modal('hide');
            });
        };
    }];
});