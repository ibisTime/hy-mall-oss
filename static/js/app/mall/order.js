$(function () {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '订单编号',
    }, {
        field: 'status',
        title: '订单状态',
        type: "select",
        key: "order_status",
        keyCode:'808907',
        formatter: Dict.getNameForList("order_status","808907"),
        search: true,
    },{
    	field: 'productName',
    	title: '商品名称'
    },{
        field: 'productType',
        title: '商品类型', 
		type: 'select',
		listCode: '808007',
		params:{
			type: '1',
			parentCode: OSS.categoryCode,
		},
		keyName: 'code',
		valueName: 'name',
		searchName: 'productType',
        search: true
    },{
        field: 'payType',
        title: '买单方式',
		key: 'pay_type',
		keyCode: "808907",
        formatter: Dict.getNameForList("pay_type",'808907'),
		type: 'select',
        search: true,
    }, {
		field : 'amount1',
		title : '商品总价',
		formatter: moneyFormat
	},{
        field: 'yunfei',
        title: '运费',
        formatter: moneyFormat,
    },{
        field: 'applyUser',
        title: '下单用户',
        search: true,
        formatter: function(v, data){
        	return data.user.mobile;
        },
		type: 'select',
        search: true,
		pageCode1: '805120',
		params: {
			kind: 'f1',
    		updater: '',
			companyCode: OSS.company
		},
		keyName: 'userId',
		valueName: 'mobile',
		searchName: 'mobile',
    },{
        field: 'applyDatetime',
        title: '下单时间',
        formatter: dateTimeFormat,
		field1 : 'dateStart',
		title1 : '下单时间',
		type:'date',
		field2 : 'dateEnd',
		search: true,
    }];

    buildList({
        columns: columns,
        pageCode: '808065',
    });
    
    $("#detailBtn").off('click').click(function(){
		var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        var type = selRecords[0].payType?selRecords[0].payType:0;
        window.location.href = "order_addedit.html?Code=" + selRecords[0].code+'&type='+type;
	})
    
    $("#zjLedgerBtn").click(function(){
		var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "zjLedger.html?refNo=" + selRecords[0].code;
	})
    
});