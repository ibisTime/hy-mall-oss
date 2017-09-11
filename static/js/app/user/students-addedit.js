$(function() {
    var code = getQueryString('code');

    var fields = [{
        field: 'applyUser',
        title: '申请人',
        readonly: true
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat,
        readonly: true
    }, {
        field: 'authArg1',
        title: '学信网图片',
        type: "img",
        readonly: true
    }, {
        field: 'authArg2',
        title: '证件号',
        readonly: true
    }, {
        field: 'authArg3',
        title: '姓名',
        readonly: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'auth_status',
        formatter: Dict.getNameForList('auth_status'),
        readonly: true
    }, {
        title: "毕业时间",
        field: "gradDatetime",
        type: "date",
        readonly: true
    }, {
        title: "审核人",
        field: "approveUser",
        readonly: true
    }, {
        title: "审核时间",
        formatter: dateTimeFormat,
        readonly: true
    }, {
        title: "备注",
        field: "remark",
        readonly: true
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '805216',
        view: true
    }
    buildDetail(options);
});