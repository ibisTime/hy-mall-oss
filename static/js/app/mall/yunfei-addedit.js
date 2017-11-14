$(function() {
    var view = getQueryString('v');
    var code = getQueryString('code');

    var fields = [{
        title: '出发省份',
        field: 'startPoint',
        readonly: !!code,
    }, {
        field: 'endPoint',
        title: '目的省份',
        readonly: !!code,
    }, {
        field: 'startWeight',
        title: '首重重量(kg)',
        number: true,
        required: true,
        readonly: view
    }, {
        title: "首重价格(元)",
        field: "startPrice",
        amount: true,
        formatter: moneyFormat,
        required: true,
        readonly: view
    }, {
        field: "addWeight",
        title: "递增重量(kg)",
        number: true,
        required: true,
        readonly: view
    }, {
        field: "addPrice",
        title: "递增价格(元)",
        amount: true,
        formatter: moneyFormat,
        required: true,
        readonly: view
    }, {
        title: "备注",
        field: "remark",
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '801926',
        editCode: '801920',
        view: view,
        beforeSubmit: function(data) {
            data.idList = [data.id];
            return data;
        }
    });

});