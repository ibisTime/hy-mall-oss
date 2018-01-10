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
        valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
        searchName: 'keywords',
    }, {
        field: 'promptTimes',
        title: '催货次数',
        readonly: true
    }, {
        title: "提货方式",
        field: "takeType",
        type: "select",
        key: "take_type",
        formatter: Dict.getNameForList("take_type"),
        // search: true
    }, {
        field: 'status',
        title: '订单状态',
        type: "select",
        data: {
            "3": "已发货待收货",
            "4": "已收货体验中",
            "5": "已归还，待确认",
            "6": "逾期中",
            "7": "已结算",
            "8": "不归还",
            "9": "已评论",
            "91": "用户异常",
            "92": "商户异常",
            "93": "商户异常",
        },
        // key: "rorder_status",
        // formatter: Dict.getNameForList("rorder_status"),
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
        field1: 'payDatetimeStart',
        title1: '支付时间',
        type: 'date',
        field2: 'payDatetimeEnd',
        twoDate: true,
        search: true,
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        router: "leaseStoreOrder",
        columns: columns,
        pageCode: '810055',
        singleSelect: false,
        searchParams: {
            takeType: "1",
            toUser: getUserId(),
            companyCode: OSS.company,
            statusList: ["3", "4", "5", "6", "7", "8", "9", "91", "92", "93"]
        }
    });

    // 确认归还
    $("#returnBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        }
        if (selRecords.length > 1) {
            toastr.warning("请选择一条记录");
            return;
        }
        if (selRecords[0].status != 5) {
            toastr.warning("不是可以确认归还的状态");
            return;
        }
        confirm("确认该商品已经归还了？").then(function() {
            reqApi({
                code: '810050',
                json: { "code": selRecords[0].code, "remark": "已经归还" }
            }).then(function() {
                sucList();
            });
        }, function() {});

    });
    //流水查询
    $("#ledgerBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        };
        window.location.href = "order_ledger.html?refNo=" + selRecords[0].code;
    });
});
