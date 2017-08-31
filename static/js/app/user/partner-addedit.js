$(function() {
	
	var code = getQueryString('userId');
	var view = !!getQueryString('v');
	var ed = getQueryString('e')||view;
	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: 'PA'
	}, {
		field: 'userId',
		type: 'hidden'
	}, {
		field: 'loginName',
		title: '登录账号',
        readonly: ed,
		required: true,
		maxlength: 60
	}, {
		field: 'realName',
		title: '自提点名称',
		required: true,
		maxlength: 10,
	}, {
		field: 'remark',
		title: '联系方式',
		required: true,
	}, {
		title: '所在地区',
		type: 'citySelect',
		required: true,
		hidden: view
	}, {
		title: '所在地区',
		field: 'citySelect1',
		formatter: function(v, r) {
			r = r.userExt || {};
			var res = $.unique([r.province, r.city, r.area]).reverse();
			return res.join(' / ');
		},
		hidden: !view
	},{
		field: 'address',
		title: '详细地址',
		required: true,
	}];
	
	buildDetail({
		fields: fields,
		code: code,
		addCode: '805042',
		editCode: '805181',
		detailCode: '805121',
		beforeDetail: function(data) {
			data.userId = data.code;
		},
		view: view
	});
	
	var h ="<br/><p class='huilv' style='padding: 5px 0 0 194px;display: block;color:red;'>初始密码为 888888</p>";
	$(h).insertAfter("#loginName");
});