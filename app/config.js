/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-5
 * Time: ����4:04
 */
define(function(){
    //����Ҫ���ص�ģ��
    return window.config = {
        domain: 'http://10.0.0.101/angular-build-seed/mock/index.php?rest/V1/'
        , modules:[
            //'modules/privilege', 'modules/application'
            'modules/publish','modules/privilege', 'modules/user', 'modules/log', 'modules/database'
        ]
    };
});