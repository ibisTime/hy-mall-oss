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
        field: 'receiver',
        title: '收件人',
        readonly: true,
    }, {
        field: 'reMobile',
        title: '收件人联系方式',
        readonly: true,
    }, {
        field: 'reAddress',
        title: '收货地址',
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
            if (v && !data.payAmount2) {
                return "人民币：" + moneyFormat(v)
            } else if (v && data.payAmount2) {
                return "人民币：" + moneyFormat(v) + "、积分：" + moneyFormat(data.payAmount2);
            }
        },
        readonly: true
    }, {
        field: 'payDatetime',
        title: '支付时间',
        formatter: dateTimeFormat,
        readonly: true
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
            title: "产品规格",
            field: "productSpecsName"
        }, {
            title: "数量",
            field: "quantity"
        }]
    }, {
        title: "发货信息",
        type: "title"
    }, {
        title: '物流公司',
        field: 'logisticsCompany',
        type: 'select',
        key: 'kd_company',
        keyCode: "808907",
        readonly: true,

    }, {
        title: '物流单号',
        field: 'logisticsCode',
        readonly: true,
         formatter:function(v,data){
            if(v){
                return v
            }else{
                $("#logisticsCompany").parent().hide();
                 $("#logisticsCode").parent().hide();
                  $("#deliverer").parent().hide();
                   $("#deliveryDatetime").parent().hide();
                    $("#pdf").parent().hide();
            }
        }
    }, {
        field: 'deliverer',
        title: '发货人',
        readonly: true,
    }, {
        field: 'deliveryDatetime',
        title: '发货时间',
        formatter: dateTimeFormat,
        readonly: true,
    }, {
        field: 'pdf',
        title: '物流单',
        type: "img",
        readonly: true
    },  {
        field: 'remark',
        title: '备注',
        readonly: true
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '808066',
        view: true
    });

});