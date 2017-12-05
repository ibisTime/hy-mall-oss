$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'title',
        title: '标题',
        search: true
    }, {
        field: 'description',
        title: '描述'
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: "product_status",
        formatter: Dict.getNameForList("product_status"),
        search: true
    }, {
        field: 'updateDatetime',
        title: '更新时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: "801055",
        searchParams: {
            companyCode: OSS.company,
        },
    });

})