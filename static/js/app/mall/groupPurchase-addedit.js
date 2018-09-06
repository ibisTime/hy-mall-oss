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
            category: 'NJ01'
        },
        keyName: 'code',
        valueName: 'name',
        searchName: 'name',
        required: true,
    }, {
        field: 'price',
        title: '价格',
        amount: true,
        required: true,
        formatter: moneyFormat
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
        dateFormat: 'YYYY-MM-DD hh:00:00',
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
        view: view
    });
    
    $("#startDatetime").parent("li").append("<p style='padding-left: 194px; color: red; font-size: 12px; margin-top: 10px;'>时间请务必在当前时间一小时后，并且只要小时，分钟和秒设置为零</P>")
        
});
