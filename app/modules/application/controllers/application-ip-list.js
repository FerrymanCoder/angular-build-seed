/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-10-10
 * Time: ����9:41
 */
define([], function(){
    'use strict';

    return ['$scope', 'auth', 'action', '$location', '$routeParams', '$modal', '$q', '$filter', 'ip', 'application', function($scope, Auth, Action, $location, $routeParams, $modal, $q, $filter, Ip, Application){
        var page = 0;
        $scope.aid = $routeParams.aid;
        $scope.resetFlag = false;
        $scope.hasManyData = true;
        $scope.isLoading = true;
        $scope.data = [];

        Action.link('appIpEdit', 'application').success(function(response){
            $scope.switchFlag = response.status;
        });

        //��ȡ�û���Ϣ
        $scope.app = Application.get({aid: $routeParams.aid}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);
            return response;
        });

        //��ȡ���������
        $scope.downloadData = function(){
            $scope.isLoading = true;

            Ip.query({page: ++page, aid: $routeParams.aid}).$promise.then(function(response){

                angular.forEach(response.items, function(item){
                    item.info = decodeURI(item.info);
                    if(item.begin == -1){
                        item.begin = '������';
                    }else{
                        item.begin = Date.parse(item.begin);
                    }
                    if(item.end == -1){
                        item.end = '������';
                    }else{
                        item.end = Date.parse(item.end);
                    }

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

        //������Ч��
        $scope.changeValidity = function(index, status){

            var promise = Ip.changStatus({id: $scope.data[index].ipId, status: status, aid: $routeParams.aid, type: 'validity'}).$promise;
            promise.then(function(response){
                if(response['status'] == 0){

                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'IP����Ч�Ը���ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(aid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appIpList', 'application' , {aid: aid}));
                            };
                        }($routeParams.aid)
                    });
                }else{
                    $scope.data[index].validity = status;
                }
            });

            return promise; //����promse����switch����ж���ʾ״̬
        };

        //ɾ��ָ���û�
        $scope.delete = function(object, index){
            object.isDelete = 1; //��ʶ�����ݱ�ɾ��

            Ip.remove({pid: object.ipId, aid: $routeParams.aid}).$promise.then(function(reponse){
                if(reponse['status'] == 0){

                    object.isDelete = 0;    //ȡ�������ݵ�ɾ��״̬

                    //ɾ��������ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'IPɾ��ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/configuration2.png'
                        , sticky: false
                        , before_close: function(aid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appIpList', 'application' , {aid: aid}));
                            };
                        }($routeParams.aid)
                    });

                }else{
                    //���б���ɾ����������
                    $scope.data.splice(index, 1);

                    //ɾ���¹���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'IPɾ���ɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });
                }
            });
        };


        var modalPromise = $modal({
            template: 'form.html'
            , persist: true
            , show: false
            , backdrop: 'static'
            , scope: $scope
        });

        var modal = $q.when(modalPromise);

        $scope.form = {aid: $scope.aid};

        //�����༭��ģ̬����
        $scope.modalWin = function(rule){
            $scope.updateRule = rule;   //����ָ��ǰ�༭�Ĺ������ݶ������ڸ�����ʾ�б�

            if(rule.begin == '������'){
                $scope.form.begin = null;
            }else{
                $scope.form.begin = $filter('date')(rule.begin, 'yyyy-MM-dd');
            }

            if(rule.end == '������'){
                $scope.form.end = null;
            }else{
                $scope.form.end = $filter('date')(rule.end, 'yyyy-MM-dd');
            }

            $scope.form.pid = rule.ipId;

            modal.then(function(modalEl){
                modalEl.modal('show');
            });
        };

        //����ָ���������Чʱ��
        $scope.updateDate = function(){
            Ip.updateDate($scope.form).$promise.then(function(response){
                if(response['status'] == 1){

                    $scope.updateRule.begin = $filter('date')($scope.form.begin, 'yyyy-MM-dd');
                    $scope.updateRule.end = $filter('date')($scope.form.end, 'yyyy-MM-dd');

                    //�ɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'IP������ĳɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                }else{
                    //������ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'IP�������ʧ��!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(aid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appIpList', 'application' , {aid: aid}));
                            };
                        }($routeParams.aid)
                    });
                }
            });
        };

        //��ȡ��һ������
        $scope.downloadData();
    }];
});