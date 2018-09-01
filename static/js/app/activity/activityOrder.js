$(function() {


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '订单编号',
        search: true
    }, {
        field: 'actName',
        title: '活动名称',
        formatter: function(v, data) {
            return data.activity.name;
        },
        type: 'select',
        search: true,
        pageCode: '808705',
        keyName: 'name',
        valueName: '{{name.DATA}}',
        searchName: 'name',
    }, {
        field: 'applyUser',
        title: '下单用户',
        search: true,
        formatter: function(v, data) {
            return data.user?data.user.mobile:v;
        },
        type: 'select',
        search: true,
        pageCode: '805120',
        params: {
            kind: 'C',
            updater: '',
            companyCode: OSS.company
        },
        keyName: 'userId',
        valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
        searchName: 'keywords',
    }, {
        field: 'payType',
        title: '买单方式',
        key: 'pay_type',
        formatter: Dict.getNameForList("pay_type"),
        type: 'select',
        search: true,
    }, {
        field: 'totalAmount1',
        title: '总价',
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '订单状态',
        type: "select",
        key: 'act_order_status',
        formatter: Dict.getNameForList("act_order_status"),
        search: true,
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '下单时间',
        type: 'date',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
    }, {
        field: "payDatetime",
        title: "支付时间",
        formatter: dateTimeFormat,
        field1: 'payDatetimeStart',
        title1: '支付时间',
        type: 'date',
        field2: 'payDatetimeEnd',
        twoDate: true,
        search: true,
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        columns: columns,
        pageCode: '808735',
        singleSelect: false,
        searchParams: {
            companyCode: OSS.company
        },
        beforeDetail: function(){
        	var selRecords = $('#tableList').bootstrapTable('getSelections');
        	
		    var orderData = selRecords[0].orderData?"1":"";
		    var rorderList = selRecords[0].rorderList?"1":"";
		    var toUser = '';
		    if(orderData=='1'&&rorderList=='1'){
		    	toUser = orderData=='1'?selRecords[0].orderData.toUser:selRecords[0].rorderList[0].takeStore;
		    }
		    
        	window.location.href = "activityOrder_addedit.html?code=" + selRecords[0].code+"&orderData="+orderData
        					+"&rorderList="+rorderList+"&toUser="+toUser+"&amount="+selRecords[0].activity.amountType;
        }
    });
    
    //审核
    $("#returnCheckBtn").off('click').click(function(){
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        };
        
        if (selRecords[0].status != '6') {
            toastr.warning("不是申请退款中的记录");
            return;
        };
        
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">申请退款</li></ul>' +
                '</form>'
        });

        dw.showModal();

        buildDetail({
            container: $('#formContainer'),
            fields: [{
                field: 'remark',
                title: '备注',
                required: true,
            }],
            buttons: [{
                title: '通过',
                handler: function() {
                    if ($('#popForm').valid()) {
                        var data = $('#popForm').serializeObject();
                        data.code = selRecords[0].code;
                        data.result = '1';
                        reqApi({
                            code: '808730',
                            json: data
                        }).done(function(data) {
                            dw.close().remove();
                            sucList()
                        });
                    }
                }
            }, {
                title: '不通过',
                handler: function() {
                    if ($('#popForm').valid()) {
                        var data = $('#popForm').serializeObject();
                        data.code = selRecords[0].code;
                        data.result = '0';
                        reqApi({
                            code: '808730',
                            json: data
                        }).done(function(data) {
                            dw.close().remove();
                            sucList()
                        });
                    }
                }
            }, {
                title: '取消',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });

        dw.__center();
    })


});