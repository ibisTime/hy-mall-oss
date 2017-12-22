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
        valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
        searchName: 'keywords',
    }, {
        field: 'productName',
        title: '商品名称'
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
        title: "运费",
        field: "yunfei",
        formatter: moneyFormat,
    }, {
        title: "提货方式",
        field: "takeType",
        type: "select",
        key: "take_type",
        formatter: Dict.getNameForList("take_type"),
        search: true
    }, {
        field: 'takeStore',
        title: '提货地',
        formatter: function(v, data) {
            if (data.takeType == "2") {
                return "平台"
            } else { return data.storeUser.realName; }
        },
        type: 'select',
        search: true,
        pageCode: '805120',
        params: {
            kind: 'PA',
            updater: '',
            companyCode: OSS.company
        },
        keyName: 'userId',
        valueName: 'realName',
        searchName: 'realName',
        search: true
    }, {
        field: 'receiver',
        title: '收件人',
        search: true
    }, {
        field: 'reMobile',
        title: '收件人电话',
        search: true
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
        field1: 'payDatetimeStart',
        title1: '支付时间',
        type: 'date',
        field2: 'payDatetimeEnd',
        twoDate: true,
        search: true,
    }, {
        field: 'status',
        title: '订单状态',
        type: "select",
       data: {
           "1": "待支付",
           "2": "已支付待发货",
           "3": "已发货待收货",
           "4": "已收货体验中",
           "5": "已归还，待确认",
           "6": "逾期中",
           "7": "已结算",
           "8": "不归还",
           "9": "已评论",
           "91": "用户异常",
           "92": '商户异常',
           "93": "快递异常"
       },
        search: true,
    }, {
        field: 'backStore',
        title: '归还点',
        formatter: function(v, data) {
            if (v == "SYS_USER_HW") {
                return "平台"
            } else if (data.backStoreUser) {
                return data.backStoreUser.realName;
            }
        },
        type: 'select',
        search: true,
        pageCode: '805120',
        params: {
            kind: 'PA',
            updater: '',
            companyCode: OSS.company
        },
        keyName: 'userId',
        valueName: 'realName',
        searchName: 'realName',
        search: true
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        columns: columns,
        pageCode: '810055',
        singleSelect: false,
        searchParams: {
            // takeType: '2',
            companyCode: OSS.company,
        	statusList: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "91", "92", "93"]
        },
        beforeDetail: function(data) {
            if (data.takeType == "2") {
                window.location.href = "leaseOrder_addedit.html?&v=1&code=" + data.code;
            } else if (data.takeType == "1") {
                window.location.href = "leaseStoreOrder_addedit.html?&v=1&code=" + data.code;
            }
        }
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
    $("#takeStore").append('<option value="SYS_USER_HW">平台</option>')
        .trigger('chosen:updated');
    $("#backStore").append('<option value="SYS_USER_HW">平台</option>')
        .trigger('chosen:updated');
});