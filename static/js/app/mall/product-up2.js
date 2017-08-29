$(function() {
	
	var code = getQueryString('code');
	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: '1'
	}, {
        field: 'orderNo',
        title: '序号',
        required: true,
    }];
	
	buildDetail({
		fields: fields,
		code:code,
		detailCode: '808026',
		addCode: '808010',
		editCode: '808012',
	});
	
	$("#subBtn").off("click").click(function() {
		if($('#jsForm').valid()){
			confirm("确认上架？").then(function() {
				var data = $('#jsForm').serializeObject();
				data.code = code;
				data.originalPrice = '0';
				data.location = '1';
	        	reqApi({
	                code: '808013',
	                json:  data
	            }).then(function() {
	               sucDetail();
	            });
	            
			});
		}
    });
});