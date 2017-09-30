$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '订单编号',
        search: true
    }, {
        field: 'applyUser',
        title: '下单用户',
        search: true,
        formatter: function(v, data) {
            return data.user.mobile;
        },
        type: 'select',
        search: true,
        pageCode: '805120',
        params: {
            kind: 'C',
            updater: '',
            companyCode: OSS.company
        },
        keyName: 'userId',
        valueName: 'mobile',
        searchName: 'mobile',
    }, {
        field: 'productName',
        title: '商品名称'
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
        field: 'payType',
        title: '买单方式',
        key: 'pay_type',
        formatter: Dict.getNameForList("pay_type"),
        type: 'select',
        search: true,
    }, {
        field: 'amount1',
        title: '人民币总价',
        formatter: moneyFormat
    }, {
        field: 'amount2',
        title: '积分总价',
        formatter: moneyFormat
    }, {
        title: "提货方式",
        field: "takeType",
        type: "select",
        key: "take_type",
        formatter: Dict.getNameForList("take_type"),
        search: true
    }, {
        field: 'promptTimes',
        title: '催货次数'
    }, {
        field: 'status',
        title: '订单状态',
        type: "select",
        data: {
            "7": "已结算",
            "8": "不归还",
            "9": "已评论",
            "91": "用户异常",
            "92": '商户异常',
            "93": "快递异常"
        },
        search: true,
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '下单时间',
        type: 'date',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
    }, {
        field: "payDatetime",
        title: "支付时间",
        formatter: dateTimeFormat,
        field1: 'payDateStart',
        title1: '支付时间',
        type: 'date',
        field2: 'payDateEnd',
        twoDate: true,
        search: true,
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        columns: columns,
        pageCode: '810055',
        singleSelect: false,
        searchParams: {
            companyCode: OSS.company,
            statusList: ["7", "8", "9", "91", "92", "93"]
        },
        beforeDetail: function(data) {
            if (data.takeType == "2") {
                window.location.href = "leaseOrder_addedit.html?&v=1&code=" + data.code;
            } else if (data.takeType == "1") {
                window.location.href = "leaseStoreOrder_addedit.html?&v=1&code=" + data.code;
            }
        }
    });

});