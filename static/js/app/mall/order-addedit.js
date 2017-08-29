$(function() {
	
	var code = getQueryString('code');
	var type = getQueryString('type')||'';
	var typeDataFields;
	
	reqApi({
        code: '808007',
        json: {
			status: '1',
        	parentCode: OSS.categoryCode
        },
        sync: true
    }).done(function(d) {
    	var data1 = [];
    	if(d.length){
    		
    		d.forEach(function(v,i){
    			var tmpl = {'dkey':v.code,'dvalue': v.name}
    			data1.push(tmpl) ;
    		})
    	}
    	
    	typeDataFields = data1;
    });
	
	reqApi({
		code:'808066',
		json:{
			code:code
		},
        sync: true
	}).done(function(data){
		
		//订单编号
		$("#orderCode").text(data.code);
		//订单状态
		$("#status").text(Dict.getNameForList1("order_status","808907",data.status));
		//时间
		if(data.status==4){
			$("#statusTimeTxt").html("收货时间:");
			$("#statusTime").text(dateTimeFormat(data.updateDatetime));
			if(data.updater=='system'){
				$("#updater").text("系统自动收货");
			}else{
				$("#updater").text(data.user.mobile);				
			}
			
			$(".shouhuoTxt").removeClass("hidden");
			$(".statusTimeTxt").removeClass("hidden");
		}else if(data.status==91||data.status==92){
			$("#statusTimeTxt").html("取消时间:");
			$("#statusTime").text(dateTimeFormat(data.updateDatetime));
			$(".statusTimeTxt").removeClass("hidden");
		}
		//下单用户
		$("#applyUser").text(data.user.mobile);
		//下单说明
		$("#applyNote").text(data.applyNote);
		//下单时间
		$("#applyDatetime").text(dateTimeFormat(data.applyDatetime));
		//购买数量
		$("#quantity").text(data.quantity);
		//支付方式
		if(data.status==1){
			$(".payType").hide();
		}else{
			$("#payType").text(Dict.getNameForList1("pay_type","808907",data.payType));
		}
		
		//已支付人民币总额
		
		if(type=='20'){
			$("#payAmount1").text(data.payAmount1/1000+"礼品券");
		}else if(type=='21'){
			$("#payAmount1").text(data.payAmount1/1000+"联盟券");
		}else{
			$("#payAmount1").text(data.payAmount1/1000+"分润+"+data.payAmount11/1000+"贡献奖励");
		}

		//运费
		$("#yunfei").text(moneyFormat(data.yunfei));
		
		
		//商品名称
		$("#name").text(data.productName);
		
		//商品类别
		$("#productType").text(Dict.findName(typeDataFields,data.productType));
		
		//规格名称
		$("#paramName").text(data.productSpecsName);
		//价格
		$("#amount1").text(moneyFormat(data.amount1));
		
		
		//收货人姓名
		$("#receiver").text(data.receiver);
		//收件人电话
		$("#reMobile").text(data.reMobile);
		//收货地址
		$("#reAddress").text(data.reAddress);
		
		if(data.deliveryDatetime){
			//发货人
			$("#deliverer").text(data.store.name);
			//发货时间
			$("#deliveryDatetime").text(dateTimeFormat(data.deliveryDatetime));
		}
		
		//物流编号
		$("#logisticsCode").text(data.logisticsCode);
		//物流公司
		$("#logisticsCompany").text(data.logisticsCompany);
		//备注
		$("#remark").text(data.remark);
		
	})
	
	$('#backBtn').on('click', function() {
		goBack();
	});
	
});