/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-5
 * Time: ����4:04
 */
define(function(){
    //����Ҫ���ص�ģ��
    return window.config = {
        domain: 'http://localhost/angular-build-seed/mock/index.php?rest/V1/'
        , modules:[
            //'modules/publish', 'modules/user', 'modules/privilege', 'modules/application', 'modules/log'
            'common', 'modules/publish', 'modules/user'
        ]
    };
});