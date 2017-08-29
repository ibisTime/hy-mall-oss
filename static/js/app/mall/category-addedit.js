$(function() {
	
	var code = getQueryString('code');
	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: '1'
	}, {
        field: 'name',
        title: '类别名称',
        required: true,
    }, {
		title: '图片',
		field: 'pic',
		type: 'img',
		single: true,
	}, {
        field: 'orderNo',
        title: '次序',
		required: true,
        number: true,
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '808006',
		addCode: '808000',
		editCode: '808002',
		beforeSubmit: function(data){
			data.parentCode = 0;
			data.type = "1";
			
			return data;
		}
	});
	
});