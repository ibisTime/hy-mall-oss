$(function() {

    var code = getQueryString('userId');
    var view = !!getQueryString('v');

    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: 'PA'
    }, {
        field: 'loginPwd',
        title: '新登录密码',
        type: 'password',
        required: true,
    }, {
        field: 'adminPwd',
        title: '管理员密码',
        type: 'password',
        required: true,
    }];

    buildDetail({
        fields: fields,
        addCode: '805065',
        // editCode: '805065',
        beforeSubmit: function(data) {
            data.userId = code;
            data.adminUserId = getUserId();

            return data;
        }
    });

});