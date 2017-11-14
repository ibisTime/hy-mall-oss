$(function() {

    var code = getQueryString('userId');
    var view = !!getQueryString('v');
    var ed = getQueryString('e') || view;

    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: 'PA'
    }, {
        field: 'userId',
        type: 'hidden'
    }, {
        field: 'loginName',
        title: '登录账号',
        readonly: ed,
        required: true,
        maxlength: 60
    }, {
        field: 'realName',
        title: '自提点名称',
        required: true,
        maxlength: 255,
    }, {
        title: "联系电话",
        field: "mobile",
        tm: true,
        required: true,
    }, {
        title: '所在地区',
        type: 'citySelect',
        required: true,
        hidden: view
    }, {
        field: 'address',
        title: '详细地址',
        required: true,
    }];

    buildDetail({
        fields: fields,
        code: code,
        addCode: '805042',
        editCode: '805081',
        detailCode: '805121',
        beforeDetail: function(data) {
            data.userId = data.code;
        },
        view: view
    });

    var h = "<br/><p class='huilv' style='padding: 5px 0 0 194px;display: block;color:red;'>初始密码为 888888</p>";
    $(h).insertAfter("#loginName");
});