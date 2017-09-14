$(function() {
    var code = getQueryString('code');

    var fields = [{
        field: 'orderCode',
        title: '发货单号',
        type: "hidden",
        value: code,
        required: true,
    }, {
        title: "商品信息",
        type: "title"
    }, {
        title: "订单编号",
        field: "code1",
        formatter: function(v, data) {
            return data.code;
        },
        readonly: true,
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
    }, {
        field: 'receiver',
        title: '收件人',
        readonly: true,
    }, {
        field: 'reMobile',
        title: '联系方式',
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
        title: "下单说明",
        field: "applyNote",
        readonly: true
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        formatter: dateTimeFormat,
        readonly: true
    }, {
        field: 'payAmount3',
        title: '实际支付总额',
        formatter: function(v, data) {
            if (v != "0" && data.payAmount1 != "0" && data.payAmount2 != "0") {
                return "人民币：" + moneyFormat(data.payAmount1) + "，积分" + moneyFormat(data.payAmount2) + "，小金库" + moneyFormat(data.payAmount3)
            } else if (v == "0" && data.payAmount1 != "0" && data.payAmount2 != "0") {
                return "人民币：" + moneyFormat(data.payAmount1) + "，积分" + moneyFormat(data.payAmount2);
            } else if (v != "0" && data.payAmount1 != "0" && data.payAmount2 == "0") {
                return "人民币：" + moneyFormat(data.payAmount1) + "，小金库" + moneyFormat(data.payAmount3);
            } else if (v != "0" && data.payAmount1 == "0" && data.payAmount2 != "0") {
                return "积分" + moneyFormat(data.payAmount2) + "，小金库" + moneyFormat(data.payAmount3);
            } else if (v == "0" && data.payAmount1 == "0" && data.payAmount2 != "0") {
                return "积分" + moneyFormat(data.payAmount2);
            } else if (v != "0" && data.payAmount1 == "0" && data.payAmount2 == "0") {
                return "小金库" + moneyFormat(data.payAmount3);
            } else if (v == "0" && data.payAmount1 != "0" && data.payAmount2 == "0") {
                return "人民币" + moneyFormat(data.payAmount1);
            }
        },
        readonly: true
    }, {
        field: 'payDatetime',
        title: '支付时间',
        formatter: dateTimeFormat,
        readonly: true
    }, {
        field: 'promptTimes',
        title: '催货次数',
        readonly: true,
        formatter: function(v, data) {
            return data.promptTimes
        }
    }, {
        title: '物流公司',
        field: 'logisticsCompany',
        type: 'select',
        key: 'kd_company',
        required: true,
        value: "SF"
    }, {
        title: '物流单号',
        field: 'logisticsCode',
        required: true,
    }, {
        field: 'deliverer',
        title: '发货人',
        required: true,
        value: getUserName()
    }, {
        field: 'deliveryDatetime',
        title: '发货时间',
        type: "datetime",
        formatter: dateTimeFormat,
        value: dateTimeFormat(new Date()),
        required: true,
    }, {
        field: 'pdf',
        title: '物流单',
        type: 'img',
        single: true
    }, {
        field: 'remark',
        title: '备注',
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '808066'
    });

    $("#subBtn").off("click").click(function() {
        if ($('#jsForm').valid()) {
            var data = $('#jsForm').serializeObject();
            $('#jsForm').find('.btn-file [type=file]').parent().next().each(function(i, el) {
                var values = [];
                var imgs = $(el).find('.img-ctn');
                imgs.each(function(index, img) {
                    values.push($(img).attr('data-src') || $(img).find('img').attr('src'));
                });

                data[el.id] = values.join('||');
            });
            for (var i = 0, len = fields.length; i < len; i++) {
                var item = fields[i];
                if (item.equal && (!$('#' + item.field).is(':hidden') || !$('#' + item.field + 'Img').is(':hidden'))) {
                    data[item.equal] = $('#' + item.field).val() || $('#' + item.field).attr('src');
                } else if (item.emptyValue && !data[item.field]) {
                    data[item.field] = item.emptyValue;
                } else if (item.readonly && item.pass) {
                    data[item.field] = $('#' + item.field).attr('data-value') || $('#' + item.field).html();
                }
                if (item.type == 'select' && item.passValue) {
                    data[item.field] = $('#' + item.field).find('option:selected').html();
                }

                if (item.type == "checkbox") {
                    data[item.field] = $.isArray(data[item.field]) ? data[item.field].join(",") : data[item.field];
                }
            }
            data.code = code;
            reqApi({
                code: '808054',
                json: data
            }).then(function() {
                sucDetail();
            });
        }
    })

});