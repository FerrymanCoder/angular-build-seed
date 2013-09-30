/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-17
 * Time: ����3:52
 */
define(function(){
    'use strict';

    return ['$scope', '$routeParams', 'auth', 'action', 'db', function($scope, $routeParams, auth, Action, Db){
        var page = $routeParams.page - 1;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        //��ȡ���������
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Db.query({page: ++page, file: 0}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.fileName = decodeURI(item.fileName);
                    $scope.data.push(item);
                });

                if(!response.hasMore){
                    $scope.hasManyData = false;
                }

                $scope.isLoading = false;
            });
        };

        //�ָ����ݿ�
        //ID�������ļ�ID
        $scope.dbBackup = function(){

            //������ִ�У����ظ�ִ��
            if($scope.isLoading){
                return;
            }

            $scope.isLoading = true;
            Db.backup({file: 0,page: page}).$promise.then(function(response){
                if(response['status'] == 0){
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '����ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('dbBackupList', 'database'));
                        }
                    });
                }else{
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '���ݳɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    }),
                    function add() {
                        var item = response.data;
                        item.fileName = decodeURI(item.fileName);
                        $scope.data.push(item);
                    }();
                };
                $scope.isLoading = false;
            });
        };

        //�ָ����ݿ�
        $scope.dbRecover = function(filename){
            $scope.isSuccess=true;
            Db.recover({file: filename, page: page}).$promise.then(function(response){
                if(response['status'] == 0){
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�ָ�ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('dbBackupList', 'database'));
                        }
                    });
                }else{
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�ָ��ɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });
                }
            });
        };

        //����
        //TODO
        $scope.dbDownload = function(){
            Db.query({file: 0,page: page,Download:1}).$promise.then(function(data){
                var blob = new Blob([data], {type: "application/octet-stream"});
                saveAs(blob, 'hello.png');
            });
        };

        //ɾ��һ����¼
        //id: Ҫɾ�����ļ�id
        //index ��ǰ�е���������λ��
        $scope.dbDelete = function(id, index){
            Db.delete({file: 0, page: page}).$promise.then(function(response){
                if(response['status'] == 0){
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'ɾ��ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(e, manual_close){
                            $scope.$apply(Action.forward('dbBackupList', 'database'));
                        }
                    });
                }
                else{
                    $("tr#"+id).addClass("delete-line").fadeOut(1000,function(){$scope.data.splice(index, 1)}) ;
                }
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

        //��ȡ��һ������
        $scope.downloadData();
    }];
});