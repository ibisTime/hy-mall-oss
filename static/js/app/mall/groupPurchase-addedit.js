$(function() {

    var code = getQueryString('code');
    var view = !!getQueryString('v');
    
        
    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: '1'
    }, {
        field: 'productCode',
        title: '产品',
        type: "select",
        pageCode: '808025',
        params: {
            status: "3",
        },
        keyName: 'code',
        valueName: 'name',
        searchName: 'name',
        required: true,
    }, {
        field: 'quantity',
        title: '数量',
        required: true,
        'Z+': true
    }, {
        field: 'buyMaxCount',
        title: '单人购买最大数量',
        required: true,
        'Z+': true
    }, {
        title: '团购时间',
        formatter: dateFormatData,
        field1: 'startDatetime',
        field2: 'endDatetime',
        type : 'datetime',
        twoDate: true,
        required: true,
    }, {
        field: 'remark',
        title: '备注',
        hidden: !!!code
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '808096',
        addCode: '808090',
    });
        
});
