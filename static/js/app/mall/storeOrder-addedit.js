$(function() {

    var code = getQueryString('code');

    var fields = [{
        title: "订单信息",
        type: "title"
    }, {
        field: 'code1',
        title: '订单编号',
        formatter: function(v, data) {
            return data.code;
        },
        readonly: true,
    }, {
        title: '下单人',
        field: 'mobile',
        readonly: true,
        formatter: function(v, data) {
            return data.user.mobile;
        }
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        formatter: dateTimeFormat,
        readonly: true
    }, {
        field: 'payAmount1',
        title: '总额',
        formatter: function(v, data) {
            if (v) {
                return "人民币：" + moneyFormat(v)
            } else if (data.payAmount2) {
                return "积分：" + moneyFormat(data.payAmount2);
            }
        },
        readonly: true
    }, {
        field: 'payDatetime',
        title: '支付时间',
        formatter: dateTimeFormat,
        readonly: true
    }, {
        field: 'takeAddress',
        title: '提货地址',
        readonly: true,
    }, {
        title: "商品信息",
        type: "title"
    }, {
        title: "商品信息",
        field: "productOrderList",
        type: "o2m",
        readonly: true,
        columns: [{
            title: "商品名称",
            field: "name",
            formatter: function(v, data) {
                return data.product.name;
            }
        }, {
            title: "产品规格",
            field: "productSpecsName"
        }, {
            title: "商品价格",
            field: "price1",
            formatter: function(v, data) {
                if (v) {
                    return moneyFormat(v) + "人民币"
                } else if (data.price2) {
                    return moneyFormat(data.price2) + "积分"
                }
            }
        }, {
            title: "数量",
            field: "quantity"
        }]
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '808066',
        view: true
    });

});