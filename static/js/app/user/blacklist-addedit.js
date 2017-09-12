$(function() {

    var id = getQueryString('id');
    var view = !!getQueryString('v');

    var fields = [{
        field: 'mobile',
        title: '手机号',
        readonly: view,
        mobile: true
    }, {
        field: 'idKind',
        title: '证件类型',
        type: 'select',
        readonly: view,
        data: { '1': '身份证' }
    }, {
        field: 'idNo',
        title: '证件号',
        readonly: view,
        maxlength: 30
    }, {
        field: 'realName',
        title: '真实姓名',
        readonly: view,
        maxlength: 10
    }, {
        field: 'userReferee',
        title: '推荐人',
        pageCode: '805120',
        detailCode: '805056',
        params: {
            kind: 'f1',
            updater: '',
            companyCode: OSS.company
        },
        type: 'select',
        keyName: 'userId',
        valueName: '{{loginName.DATA}}',
        searchName: 'loginName',
        readonly: view,
    }, {
        title: "状态",
        field: "status",
        type: "select",
        type: 'select',
        data: {
            "0": "删除",
            "1": "有效"
        },
        readonly: view,
    }, {
        field: 'remark',
        title: '备注',
        readonly: view,
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: {
            id: id
        },
        detailCode: '805246',
        view: view
    });

});