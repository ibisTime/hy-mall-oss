$(function() {
	
	var code = getQueryString('userId');
	var view = !!getQueryString('v');
	var ed = getQueryString('e')||view;
	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: '11'
	}, {
		field: 'userId',
		type: 'hidden'
	}, {
		field: 'realName',
		title: '真实姓名',
		required: true,
		maxlength: 10,
		hidden: true
	}, {
		field: 'idKind',
		title: '证件类型',
		type: 'select',
		required: true,
		data: {'1': '身份证'},
		value: 1,
		hidden: true
	}, {
		field: 'idNo',
		title: '证件号',
		required: true,
		maxlength: 30,
		hidden: true
	}, {
		field: 'mobile',
		title: '手机号',
		required: true,
		hidden: true
	}, {
		field: 'loginName',
		title: '登录账号',
        readonly: ed,
		required: true,
		maxlength: 60
	}, {
		title: '辖区',
		type: 'citySelect',
		hidden: view
	}, {
		title: '辖区',
		field: 'citySelect1',
		formatter: function(v, r) {
			r = r.userExt || {};
			var res = $.unique([r.province, r.city, r.area]).reverse();
			return res.join(' / ');
		},
		hidden: !view
	},{
		field: 'userReferee',
		title: '推荐人',
		type: 'select',
		pageCode: '805120',
		params: {
			kind: '11',
			updater:'',
			companyCode: OSS.company
		},
		keyName: 'userId',
		valueName: 'loginName',
		searchName: 'loginName',
        readonly: ed,
	}, {
		field: 'remark',
		title: '备注',
		maxlength: 250
	}];
	
	buildDetail({
		fields: fields,
		code: code,
		addCode: '805180',
		editCode: '805181',
		detailCode: '805056',
		beforeDetail: function(data) {
			data.userId = data.code;
		},
		view: view
	});
	
	var h ="<br/><p class='huilv' style='padding: 5px 0 0 194px;display: block;color:red;'>初始密码为 888888</p>";
	$(h).insertAfter("#loginName");
});