$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'applyUser',
        title: '申请人',
        formatter: function(v, data) {
            return data.authArg3
        }
    }, {
        field: 'authArg3',
        title: '姓名'
    }, {
        field: 'authArg1',
        title: '证件类型',
        type: "select",
        key: "id_kind",
        formatter: Dict.getNameForList("id_kind"),
    }, {
        field: 'authArg2',
        title: '证件号'
    }, {
        title: "芝麻分值",
        field: "result"
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'auth_status',
        formatter: Dict.getNameForList('auth_status'),
        search: true
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '申请时间',
        type: 'date',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
    }, {
        title: "审核时间",
        field: "approveDatetime",
        formatter: dateTimeFormat,
        readonly: true
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        columns: columns,
        pageCode: '805215',
        searchParams: {
            type: "zm_score",
            companyCode: OSS.company
        },
    });
});