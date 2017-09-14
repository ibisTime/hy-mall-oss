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
        title: "商品类型",
        field: "productType",
        formatter: function(v, data) {
            if (data.productType == "J04") {
                return "积分"
            } else {
                return "普通"
            }
        }
    }, {
        title: "商品名称",
        field: "productName",
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
    }, {
        field: 'bookDatetime',
        title: '预定时间',
        formatter: function(v, data) {
            var date = new Date(v);
            var str = date.format('yyyy-MM-dd') + "至";
            date.setDate(date.getDate() + (data.rentDay - 1));
            return str + date.format('yyyy-MM-dd');
        },
        readonly: true
    }, {
        field: 'rentDay',
        title: '租赁天数',
        readonly: true
    }, {
        field: 'deductType',
        title: '抵扣方式',
        readonly: true,
        type: "select",
        key: "deduct_type"
    }, {
        field: 'deductAmount',
        title: '抵扣金额',
        readonly: true,
        formatter: moneyFormat
    }, {
        field: 'realDeposit',
        title: '实际押金',
        readonly: true,
        formatter: moneyFormat
    }, {
        field: 'amount2',
        title: '订单金额',
        formatter: function(v, data) {
            if (v) {
                return "人民币：" + moneyFormat(data.amount1) + ",积分" + moneyFormat(v)
            } else if (data.amount1) {
                return "人民币：" + moneyFormat(data.amount1);
            }
        },
        readonly: true
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
        field: 'applyUser',
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
        title: "运费",
        field: "yunfei",
        formatter: moneyFormat,
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
        field: 'payType',
        title: '支付方式',
        key: 'pay_type',
        formatter: Dict.getNameForList("pay_type"),
        type: 'select',
        readonly: true
    }, {
        title: '支付组号',
        field: 'payGroup',
        readonly: true
    }, {
        field: 'payCode',
        title: '渠道号',
        readonly: true
    }, {
        title: "订单状态",
        field: "status",
        type: "select",
        readonly: true,
        key: "rorder_status",
    }, {
        field: 'promptTimes',
        title: '催货次数',
        readonly: true,
        formatter: function(v, data) {
            return data.promptTimes
        }
    }, {
        title: "收发货信息",
        type: "title"
    }, {
        title: '物流公司',
        field: 'logisticsCompany',
        type: 'select',
        key: 'kd_company',
        readonly: true,

    }, {
        title: '物流单号',
        field: 'logisticsCode',
        readonly: true
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
    }, {
        title: "签收日期",
        field: "signDatetime",
        formatter: dateTimeFormat,
        readonly: true,
    }, {
        title: "租赁开始时间",
        field: "rstartDatetime",
        formatter: dateTimeFormat,
        readonly: true,
    }, {
        title: "租赁结束时间",
        field: "rendDatetime",
        formatter: dateTimeFormat,
        readonly: true,
    }, {
        title: "逾期信息",
        type: "title"
    }, {
        title: "逾期开始时间",
        field: "overdueStartDatetime",
        formatter: dateTimeFormat,
        readonly: true,
    }, {
        title: "逾期结束时间",
        field: "overdueEndDatetime",
        formatter: dateTimeFormat,
        readonly: true,
    }, {
        title: "日逾期费用(元)",
        field: "dayOverdueFee",
        formatter: moneyFormat,
        readonly: true,
    }, {
        title: "逾期天数",
        field: "overdueDay",
        readonly: true,
    }, {
        title: "逾期金额",
        field: "overdueAmount",
        formatter: moneyFormat,
        readonly: true
    }, {
        title: "归还信息",
        type: "title"
    }, {
        title: "租赁归还申请时间",
        field: "backApplyDatetime",
        formatter: dateTimeFormat,
        readonly: true,
    }, {
        field: 'backType',
        title: '归还方式',
        readonly: true,
        type: "select",
        key: "back_type",
    }, {
        title: "归还地址",
        field: 'backAddress',
        readonly: true
    }, {
        title: '归还物流公司',
        field: 'backLogisticsCompany',
        type: 'select',
        key: 'back_kd_company',
        readonly: true
    }, {
        title: '归还物流单号',
        field: 'backLogisticsCode',
        readonly: true
    }, {
        field: 'backPdf',
        title: '物流单',
        type: "img",
        readonly: true
    }, {
        field: 'backDealer',
        title: '归还处理人',
        readonly: true,
    }, {
        field: 'backDatetime',
        title: '归还时间',
        formatter: dateTimeFormat,
        readonly: true,
    }, {
        field: 'backAmount',
        title: '归还金额',
        formatter: moneyFormat,
        readonly: true,
    }, {
        field: 'remark',
        title: '备注',
        readonly: true
    }, {
        title: "评论信息",
        type: "title"
    }, {
        title: "评论信息",
        field: "productOrderListCom",
        type: "o2m",
        pageCode: '801025',
        o2mvalue: {
            orderCode: code,
            limit: 100,
            start: 0,
            companyCode: OSS.company
        },
        readonly: true,
        columns: [{
            title: "商品名称",
            field: "entityName",
        }, {
            title: "内容",
            field: "content"
        }, {
            title: "星级",
            field: "score",
            formatter: function(v, data) {
                if (v == 1) {
                    return "1颗星"
                } else if (v == 2) {
                    return "2颗星"
                } else if (v == 3) {
                    return "3颗星"
                } else if (v == 4) {
                    return "4颗星"
                } else if (v == 5) {
                    return "5颗星"
                }
            },
        }, {
            title: "评论时间",
            field: "commentDatetime",
            formatter: dateTimeFormat
        }]
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '810056',
        view: true
    });

});