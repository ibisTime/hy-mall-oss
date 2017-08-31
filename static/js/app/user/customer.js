$(function() {
	
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'mobile',
		title : '手机号',
		search: true
	},{
		field : 'realName',
		title : '姓名'
	},{
		field : 'idNo',
		title : '证件号码'
	},{
		field : 'province',
		title : '注册地',
		formatter: function(v, r) {
			r = r.userExt || {};
			var res = $.unique([r.province, r.city, r.area]).reverse();
			return res.join(' / ');
		}
	},{
		field : 'status',
		title : '状态',
		type: 'select',
		key: 'user_status',
		formatter: Dict.getNameForList('user_status'),
		search: true
	},{
		field : 'createDatetime',
		title : '注册时间',
		formatter: dateTimeFormat,
		field1: 'dateStart',
        title1: '注册时间',
        type1: 'date',
        field2: 'dateEnd',
        type2: 'date',
        search: true,
	},{
		field : 'remark',
		title : '备注'
	}];
	buildList({
		router: 'customer',
		columns: columns,
		pageCode: '805120',
		searchParams: {
			kind: 'C',
			companyCode: OSS.company
		}
	});
	$('#lockBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			toastr.info("请选择记录");
			return;
		}
		confirm("确认执行该操作？").then(function() {
			reqApi({
				code: '805052',
				json: {
					userId: selRecords[0].userId,
					toStatus: selRecords[0].status != '0' ? '0' : '2'
				}
			}).then(function() {
				sucList();
			});
		});
	});
	
	
	$('#detail2Btn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			toastr.info("请选择记录");
			return;
		}
		
		window.location.href = "customer_addedit.html?v=1&userId=" + selRecords[0].userId;
	});
	
	//查看银行卡
	$('#bankCardBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			toastr.info("请选择记录");
			return;
		}
		
		window.location.href = "bankCard.html?c=1&userId="+selRecords[0].userId;
	});
	
	//查看推荐关系
	$('#userRefereeBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			toastr.info("请选择记录");
			return;
		}
		
		window.location.href = "customer_userReferee.html?userId="+selRecords[0].userId+"&mobile="+selRecords[0].mobile;
	});
	
	
	//修改实名认证
	$('#identityBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			toastr.info("请选择记录");
			return;
		}
		
		window.location.href = "bizman_identity.html?userId="+selRecords[0].userId;
	});
});

