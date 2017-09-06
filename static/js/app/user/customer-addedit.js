$(function() {

    var userId = getQueryString('userId');
    var view = !!getQueryString('v');

    var fields = [{
        field: 'mobile',
        title: '手机号',
        required: true,
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
        required: true
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "user_status",
        formatter: Dict.getNameForList("user_status"),
    }, {
        field: 'bankcardList',
        title: '银行卡信息:',
        type: 'o2m',
        pageCode: '802015',
        o2mvalue: {
            'userId': userId
        },
        columns: [{
            field: 'realName',
            title: '真实名称',
        }, {
            field: 'bankcardNumber',
            title: '银行卡号',
        }, {
            field: 'bankName',
            title: '银行名称',
        }, {
            field: 'subbranch',
            title: '开户支行',
        }, {
            field: 'bindMobile',
            title: '预留手机号',
        }, {
            field: 'createDatetime',
            title: '创建时间',
            formatter: dateTimeFormat
        }]
    }, {
        field: 'remark',
        title: '备注',
        readonly: view,
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: {
            userId: userId
        },
        detailCode: '805121',
        view: view
    });

});