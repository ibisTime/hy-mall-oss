$(function() {
	
	var userId = getQueryString('userId');
	var view = !!getQueryString('v');
	
	var fields = [{
		field: 'mobile',
		title: '手机号',
		required: true,
        readonly: view,
		mobile: true
	}, {
		field: 'idKind',
		title: '证件类型',
		type: 'select',
        readonly: view,
		data: {'1': '身份证'}
	}, {
		field: 'idNo',
		title: '证件号',
        readonly: view,
		maxlength: 30
	}, {
		field: 'realName',
		title: '真实姓名',
        readonly: view,
		maxlength: 10
	}, {
		field: 'userReferee',
		title: '推荐人',
		pageCode: '805120',
		detailCode: '805056',
		params: {
			kind: 'f1',
			updater: '',
			companyCode: OSS.company
		},
		type: 'select',
		keyName: 'userId',
		valueName: '{{loginName.DATA}}',
		searchName: 'loginName',
        readonly: view,
		required: true
	}, {
		title: '注册地',
		type: 'citySelect',
		required: true,
        readonly: view,
		hidden: view
	}, {
		title: '注册地',
		field: 'citySelect1',
		formatter: function(v, r) {
			r = r.userExt || {};
			var res = $.unique([r.province, r.city, r.area]).reverse();
			return res.join(' / ');
		},
        readonly: view,
		hidden: !view
	}, {
		field: 'remark',
		title: '备注',
        readonly: view,
		maxlength: 250
	}];
	
	buildDetail({
		fields: fields,
		code:  {
			userId:userId
		},
		addCode: '805042',
		detailCode: '805056',
		beforeSubmit: function(data){
			data.loginName=data.mobile;
			data.isRegHx ='1';
			data.kind='f1';
			
			return data;
		},
		view: view
	});
	
});