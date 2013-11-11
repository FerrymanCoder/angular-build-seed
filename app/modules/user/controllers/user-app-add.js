/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-8
 * Time: ����2:53
 */
define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'userApp', 'application', '$routeParams', '$q', '$modal', function($scope, Auth, Action, UserApp, Application, $routeParams, $q, $modal){
        Auth.isLogined();

        var page = 0;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        //��ȡ���������
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Application.query({page: ++page}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.app = decodeURI(item.app);
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

        //��ȡ��һ������
        $scope.downloadData();

        $scope.form = {ipLimit: 1, uid: $routeParams.uid};

        var modalPromise = $modal({
            template: 'form.html'
            , persist: true
            , show: false
            , backdrop: 'static'
            , scope: $scope
        });
        var modal = $q.when(modalPromise);

        //�޸���Ч��
        $scope.changeIpLimit = function(item, status){

            $scope.form.ipLimit = status;

            //���뷵��promise����switchָ��ʹ��
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        //���ڴ��� Ӧ��ϵͳ��Ϣ ��ģ̬����
        $scope.modalWin = function(aid){

            $scope.form.aid = aid; //����Ҫ���ӵ�Ӧ��ϵͳpid

            modal.then(function(modalEl){
                modalEl.modal('show');
            });
        };

        //���ڱ�������ӵ�Ȩ����Ϣ
        $scope.addNewApp = function(){

            UserApp.create($scope.form).$promise.then(function(response){
                if(response['status'] == 1){
                    //�ɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�ɷ���ϵͳ��ӳɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                }else{
                    //������ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: '�ɷ���ϵͳ���ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close:function(uid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('userAppAdd', 'user' , {uid: uid}));
                            };
                        }($routeParams.uid)
                    });
                }
            });
        };
    }];
});