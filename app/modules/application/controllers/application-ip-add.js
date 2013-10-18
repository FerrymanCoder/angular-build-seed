define(function(){
    'use strict';

    return ['$scope', 'auth', 'action', 'application', '$q', '$routeParams', 'ip', '$filter', function($scope, Auth, Action, Application, $q, $routeParams, Ip, $filter){
        Auth.isLogined();

        //��ȡӦ��ϵͳ��Ϣ
        $scope.app = Application.get({aid: $routeParams.aid}).$promise.then(function(response){
            response.name = decodeURI(response.name);
            response.info = decodeURI(response.info);
            return response;
        });

        $scope.ip = {validity: true, aid: $routeParams.aid};
        $scope.pristine = angular.copy($scope.ip);

        $scope.reset = function(){
            $scope.ip = angular.copy($scope.pristine);
        };

        $scope.isUnchanged = function(){
            return angular.equals($scope.ip, $scope.pristine);
        };

        //�޸���Ч��
        $scope.changeValidity = function(index, status){

            $scope.ip.validity = status;

            //���뷵��promise����switchָ��ʹ��
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        $scope.save = function(){

            $scope.isLoading = true;

            $scope.ip.begin = $filter('date')($scope.ip.begin, 'yyyy-MM-dd');
            $scope.ip.end = $filter('date')($scope.ip.end, 'yyyy-MM-dd');

            //ȥ��˸���
            Ip.create($scope.ip).$promise.then(function(response){

                $scope.isLoading = false;

                if(response['status'] == 1){
                    //�޸ĳɹ���ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ӧ��ϵͳ��ӿɷ���IP�ɹ�!'
                        , class_name: 'winner'
                        , image: 'img/save.png'
                        , sticky: false
                    });

                    $scope.pristine = angular.copy($scope.ip);

                }else{
                    //�޸Ĵ�����ʾ
                    angular.element.gritter.add({
                        title: '��ʾ'
                        , text: 'Ӧ��ϵͳ��ӿɷ���IPʧ��!'
                        , class_name: 'loser'
                        , image: 'img/save.png'
                        , sticky: false
                        , before_close: function(aid){
                            return function(e, manual_close){
                                $scope.$apply(Action.forward('appIpAdd', 'application' , {aid: aid}));
                            };
                        }($routeParams.aid)
                    });
                }
            });
        };
    }];
});