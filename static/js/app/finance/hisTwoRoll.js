$(function() {
	
	var searchs = JSON.parse(sessionStorage.getItem('listSearchs') || '{}');
	var pathName = location.pathname;
	
	var dateEnd = searchs[pathName] ? searchs[pathName].dateEnd : new Date();
	var dateStart = searchs[pathName] ? searchs[pathName].dateStart : new Date((+dateEnd)-6*24*3600*1000);
	
	var searchParamsValue ={
		companyCode: OSS.company,
		dateStart: dateFormat(dateStart,'yyyy-MM-dd 00:00:00'),
		dateEnd: dateFormat(dateEnd,'yyyy-MM-dd 23:59:59')
	};

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'realName',
		title : '户名',
		search: true
	},{
		field: 'currency',
		title: '币种',
		type: 'select',
		key: 'currency',
		keyCode: "802006",
        formatter: Dict.getNameForList("currency",'802006'),
		search: true
	},{
		field: 'channelType',
		title: '渠道',
		type: 'select',
		key: 'channel_type',
		keyCode:'802006',
		formatter: Dict.getNameForList('channel_type','802006'),
		search: true
	},{
		field : 'bizType',
		title : '业务类型',
		type: 'select',
		key: 'biz_type',
		keyCode:'802006',
		formatter: Dict.getNameForList('biz_type','802006'),
		search: true
	},{
		field : 'transAmount',
		title : '变动金额',
		formatter:  moneyFormat
	},{
		field: 'preAmount',
		title: '变动前金额',
		formatter: moneyFormat
	},{
		field: 'postAmount',
		title: '变动后金额',
		formatter: moneyFormat
	},{
		field : 'status',
		title : '状态',
		type: 'select',
		key: 'jour_status',
		keyCode:'802006',
		formatter: Dict.getNameForList('jour_status','802006'),
		search: true
	},{
		field: 'createDatetime',
		title: '创建时间',
		formatter: dateTimeFormat
	},{
		field1 : 'dateStart',
		title1 : '创建时间',
		type1:'datetime',
		field2 : 'dateEnd',
		type2:'datetime',
		search: true,
		visible: false
	},{
		field : 'workDate',
		title : '拟对账日期',
		type:'date',
		search: true,
	},{
		field : 'refNo',
		title : '关联单号',
		search: true
	}];
	buildList({
		columns: columns,
		pageCode: '802530',
		searchParams: searchParamsValue,
		beforeDetail: function(data) {
			location.href = "historyLedger_addedit.html?v=1&code=" + data.code;
		}
	});
	
	//显示搜索框日期
	$("#dateEnd").val(dateEnd?dateFormat(dateEnd,'yyyy-MM-dd 23:59:59'):"")
	$("#dateStart").val(dateStart?dateFormat(dateStart,'yyyy-MM-dd 00:00:00'):"")
	
	//重置点击
	$(".search-form").find("input[type='reset']").off('click').click(function(){
		var me = this;
		setTimeout(function() {
			$(me).closest('.search-form').find('select').trigger('chosen:updated');
			
			var dateEndTmpl = new Date();
			var dateStartTmpl = new Date((+dateEndTmpl)-6*24*3600*1000);
			searchParamsValue.dateEnd=dateFormat(dateEndTmpl,'yyyy-MM-dd 23:59:59');
			searchParamsValue.dateStart=dateFormat(dateStartTmpl,'yyyy-MM-dd 00:00:00');
			$("#dateEnd").val(searchParamsValue.dateEnd)
			$("#dateStart").val(searchParamsValue.dateStart)
		}, 100);
	})
	
});

