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
        field: 'productName',
        title: '商品名称',
        formatter: function(v, data) {
            if (data.productOrderList[0].product) {
                return data.productOrderList[0].product.name;
            } else {
                return ""
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
        field: 'promptTimes',
        title: '催货次数'
    }, {
        field: 'status',
        title: '订单状态',
        type: "select",
        data: {
            "91": "用户异常",
            "92": "商户异常",
            "93": "快递异常",
            "5": "已完成",
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
        search: true,
        twoDate: true
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
        router: "storeOrder",
        columns: columns,
        pageCode: '808065',
        singleSelect: false,
        searchParams: {
            toUser: getUserId(),
            statusList: ["5", "91", "92", "93"]
        }
    });

});