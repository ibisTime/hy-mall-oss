$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "参数键",
        field: 'ckey',
        search: true
    }, {
        title: '参数值',
        field: 'cvalue',
    }, {
        field: 'updateDatetime',
        title: '最近修改时间',
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        router: "jfRule",
        columns: columns,
        pageCode: "622915",
        searchParams: {
            type: "2",
            companyCode: OSS.company
        }
    });

});