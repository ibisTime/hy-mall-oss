$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: 'type',
        title: '类别',
        type: 'select',
        listCode: "810007",
        params: {
            parentCode: "0",
            type: "4",
            status: "1"
        },
        keyName: "code",
        valueName: "name",
        searchName: "name",
        required: true,
        readonly: view
    }, {
        field: 'name',
        title: '商品名称',
        required: true,
        maxlength: 50,
        readonly: view
    }, {
        field: 'slogan',
        title: '广告语',
        required: true,
        maxlength: 250,
        readonly: view
    }, {
        field: 'advPic',
        title: '广告图',
        type: 'img',
        single: true,
        required: true,
        readonly: view
    }, {
        field: 'pic',
        title: '展示图',
        type: 'img',
        required: true,
        readonly: view
    }, {
        field: 'originalPrice',
        title: '原价',
        amount: true,
        required: true,
        readonly: view
    }, {
        field: 'price',
        title: '价格',
        amount: true,
        required: true,
        formatter: function(v, data) {
            if (view == "1") {
                if (data.price1 != "0") {
                    return moneyFormat(data.price1) + "人民币"
                } else if (data.price2) {
                    return moneyFormat(data.price2) + "积分"
                }
            } else {
                if (data.price1 != "0") {
                    return moneyFormat(data.price1)
                } else if (data.price2) {
                    return moneyFormat(data.price2)
                }

            }
        },

    }, {
        field: 'deposit',
        title: '押金',
        amount: true,
        required: true,
        readonly: view
    }, {
        field: 'minRentDays',
        title: '最小租赁天数',
        number: true,
        required: true,
        readonly: view
    }, {
        field: 'dayOverdueFee',
        title: '日逾期费用(元)',
        amount: true,
        required: true,
        readonly: view
    }, {
        title: '商品详述',
        field: 'description',
        type: 'textarea',
        required: true,
        readonly: view
    }, {
        title: '包装清单',
        field: 'packsList',
        type: "o2m",
        required: true,
        editTable: true,
        addeditTable: true,
        readonly: view,
        columns: [{
            field: '',
            title: '',
            checkbox: true,
            hidden: true
        }, {
            field: 'name',
            title: '名称',
            required: true,
            maxlength: 32
        }, {
            field: 'quantity',
            title: '数量',
            number: true,
            required: true
        }]
    }, {
        field: 'remark',
        title: '备注',
        maxlength: 255,
        readonly: view
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '810026',
        addCode: '810010',
        editCode: '810012',
        beforeSubmit: function(data) {
            data["packsList"] = $('#packsListList').bootstrapTable('getData');
            if (!data["packsList"].length) {
                toastr.info("包装清单不能为空");
                return;
            }
            return data
        }
    });

});