$(function() {
	
	var code = getQueryString('code');
	var view = getQueryString('v');
	
	var typeData = {}
	reqApi({
		code:'808007'
	}).done(function(d) {
            		
		d.forEach(function(v,i){
			typeData[v.code] = v.name;
		})
    });
	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: '1'
	}, {
        field: 'type',
        title: '类别',
		type: 'select',
		listCode: '808007',
        readonly: view,
		data: typeData,
		keyName: 'code',
		valueName: 'name',
    }, {
        field: 'name',
        title: '商品名称',
        required: true,
		readonly: view
    }, {
        field: 'slogan',
        title: '广告语',
        required: true,
		readonly: view
    }, {
        field: 'advPic',
        title: '广告图',
        type : 'img',
		required: true,
		readonly: view
    }, {
        field: 'pic',
        title: '展示图',
        type : 'img',
		required: true,
		readonly: view
    }, {
        field: 'description',
        title: '图文描述',
        type: 'textarea',
        required: true,
		readonly: view
    }, {
    	field: 'productSpecsList',
        title: '商品规格:',
        type: 'o2m',
        columns: [{
	        field: 'name',
	        title: '规格名称',
	    }, {
	        field: 'originalPrice',
	        title: '原价/市场价',
	        amount: true,
	        formatter: moneyFormat,
	    }, {
	        field: 'price1',
	        title: '人民币价',
	        amount: true,
	        formatter: moneyFormat,
	    }, {
	        field: 'price2',
	        title: '积分价',
	        amount: true,
	        formatter: moneyFormat,
	    }, {
			field: 'quantity',
			title: '库存',
		}, {
			field: 'province',
			title: '发货地',
		}, {
			field: 'weight',
			title: '重量（kg）',
		}, {
			field: 'orderNo',
			title: '序号',
		}]
    }, {
        field: 'remark',
        title: '备注',
        readonly: view
    }];
    var viewList = [{
        field: 'location',
        title: '位置',
        type:'select',
        key:"product_location",
        keyCode:'808907',
        formatter:Dict.getNameForList("product_location","808907"),
    },  {
        field: 'orderNo',
        title: 'UI次序',
        number: true,
        readonly: true
    }]
    if (view) {
        fields = fields.concat(viewList)
    }
	
	buildDetail({
		fields: fields,
		code: code,
		view: view,
		detailCode: '808026',
	});
	
});