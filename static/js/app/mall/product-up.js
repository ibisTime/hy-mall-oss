$(function() {

    var code = getQueryString('code');
    var category = getQueryString('category');
    var boughtCount = getQueryString('boughtCount') || '0';
    var leaderBackRate = 0, oneBackRate = 0, twoBackRate = 0;
    if(category == OSS.JFProductCategory){
    	category = true
    } else {
    	reqApi({
	        code: '808917',
	        json: {
	            key: 'PROD_LD_BACK_RATE'
	        },
	        sync: true
	    }).done(function(data) {
	    	leaderBackRate = data.cvalue;
	    })
	    reqApi({
	        code: '808917',
	        json: {
	            key: 'PROD_ONE_BACK_RATE'
	        },
	        sync: true
	    }).done(function(data) {
	    	oneBackRate = data.cvalue;
	    })
	    reqApi({
	        code: '808917',
	        json: {
	            key: 'PROD_TWO_BACK_RATE'
	        },
	        sync: true
	    }).done(function(data) {
	    	twoBackRate = data.cvalue;
	    })
	    
	    
    	category = false
    }
    
    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: '1'
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        key: "product_location",
        required: true,
    }, {
        field: 'orderNo',
        title: 'UI次序',
        required: true,
    }, {
        field: 'leaderBackRate',
        title: '领队返点比例',
        required: true,
        hidden: category,
        min: '0',
        max: '1',
        number: true,
        formatter: function(v, data){
        	return data.leaderBackRate ? data.leaderBackRate : leaderBackRate;
        }
    }, {
        field: 'oneBackRate',
        title: '一级返点比例',
        required: true,
        hidden: category,
        min: '0',
        max: '1',
        number: true,
        formatter: function(v, data){
        	return data.oneBackRate ? data.oneBackRate : oneBackRate;
        }
    }, {
        field: 'twoBackRate',
        title: '二级返点比例',
        required: true,
        hidden: category,
        min: '0',
        max: '1',
        number: true,
        formatter: function(v, data){
        	return data.twoBackRate ? data.twoBackRate : twoBackRate;
        }
    }, {
        field: 'boughtCount',
        title: '销售量',
        number: true,
        required: true,
        value: boughtCount,
        'Z+': true
    }, {
        field: 'remark',
        title: '备注',
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '808026',
    });

    $("#subBtn").off("click").click(function() {
        if ($('#jsForm').valid()) {
            confirm("确认上架？").then(function() {
                var data = $('#jsForm').serializeObject();
                data.code = code;
                data.remark = $("#remark").val();
                
                if(category) {
                	data.leaderBackRate = 0;
                	data.oneBackRate = 0;
                	data.twoBackRate = 0;
                }
                reqApi({
                    code: '808013',
                    json: data
                }).then(function() {
                    sucDetail();
                });

            });
        }
    });
});