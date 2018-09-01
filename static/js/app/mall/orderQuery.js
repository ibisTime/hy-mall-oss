$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'toUser',
        title: '提货地',
        formatter: function(v, data) {
            if (v == "SYS_USER_HW") {
                return "平台"
            } else {
                return data.toUserDetail.realName;
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
        title: '商品名称',
        formatter: function(v, data) {
        	if(data.productOrderList[0]){
        		if (data.productOrderList[0].product) {
	                return data.productOrderList[0].product.name;
	            } 
        	} else {
                return ""
            }

        }
    }, {
    	field: 'groupCode',
    	title: '团购商品',
    	type: 'select',
    	pageCode: '808095',
        keyName: 'code',
        valueName: '{{productName.DATA}}',
        searchName: 'productName',
        visible: false,
        search: true
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
        field: 'yunfei',
        title: '运费',
        formatter: moneyFormat
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
            "2": "待发货",
            "3": "待收货",
            "4": "待评价",
            "5": "已完成",
            "6": "已支付待成团",
            "7": "未成团",
            "8": "已成团",
            "91": "用户异常",
            "92": "商户异常",
            "93": "快递异常",
        },
        search: true,
    }, {
        field: 'promptTimes',
        title: '催货次数',
        readonly: true
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        columns: columns,
        pageCode: '808065',
        searchParams: {
            statusList: ["1", "2", "3", "4", "5", "6", "7", "8", "91", "92", "93"]
        },
        beforeDetail: function(data) {
            if (data.toUser == OSS.SYS_USER) {
                window.location.href = "order_addedit.html?&v=1&code=" + data.code;
            } else {
                window.location.href = "storeOrder_addedit.html?&v=1&code=" + data.code;
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
    $("#toUser").append('<option value="SYS_USER_HW">平台</option>')
        .trigger('chosen:updated');
});