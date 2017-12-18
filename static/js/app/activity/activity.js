$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'name',
        title: '活动名称',
        search: true,
    }, {
        field: 'userId',
        title: '领队',
        type: 'select',
        search: true,
        pageCode: '805120',
        params: {
            kind: 'OL',
            updater: '',
            companyCode: OSS.company
        },
        keyName: 'userId',
        valueName: 'mobile',
        searchName: 'mobile',
        formatter: function(v, data) {
            return data.user ? data.user.realName+"("+data.user.mobile+")" : v
        }
    }, {
        field: 'type',
        title: '类型',
        type: 'select',
        key: 'act_type',
        formatter: Dict.getNameForList('act_type'),
        search: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'act_status',
        formatter: Dict.getNameForList('act_status'),
        search: true
    }, {
        field: 'amount',
        title: '活动金额',
        formatter: moneyFormat
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        data:{
        	"0": "普通",
        	"1": "置顶"
        },
        search: true
    }, {
        field: 'updateDatetime',
        title: '更新时间',
        formatter: dateTimeFormat,
    },{
        field: 'remark',
        title: '备注',
        formatter: function(v, data){
        	var description = v;
        	if(description.length>20){
				description = description.substring(0,20)+"...";
        	}
        	return description;
        }
    }];
    buildList({
        columns: columns,
        pageCode: '808705',
        searchParams: {
            companyCode: OSS.company
        },
    });
    
	//审核
	$("#examineBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 0) {
            toastr.info("不是可审核的状态");
            return;
        }

        window.location.href = "activity_examine.html?code=" + selRecords[0].code+"&userId=" + selRecords[0].userId;
    })
	
	
	//取消
    $('#cancelBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if (selRecords[0].status != 1) {
            toastr.info("活动不是可取消的状态");
            return;
        }

        var dw = dialog({
            content: '<form class="pop-form" id="popForm"">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">取消活动</li></ul>' +
                '</form>'
        });

        dw.showModal();

        buildDetail({
            container: $('#formContainer'),
            fields: [{
                field: 'remark',
                title: '备注',
                required: true
            }],
            buttons: [ {
                title: '关闭',
                handler: function() {
                    dw.close().remove();
                }
            },{
                title: '取消活动',
                handler: function() {
                    if ($('#popForm').valid()) {
                        var data = $('#popForm').serializeObject();
                        data.actCode = selRecords[0].code;
                        reqApi({
                            code: '808724',
                            json: data
                        }).done(function(data) {
                            dw.close().remove();
                            sucList()
                        });
                    }
                }
            }]
        });

        dw.__center();

    });
	//设置置顶
	$("#setLocationBtn").on("click",function(){
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
		
        if (selRecords[0].status != 1) {
            toastr.info("活动不是可设置位置的状态");
            return;
        }
		
    	var dw = dialog({
    		fixed: true,
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li class="pop-form-title">设置位置</li></ul>' +
                '</form>'
        });

        dw.showModal();
        buildDetail({
            container: $('#formContainer'),
            fields: [{
		        field: 'location1',
		        title: '位置',
		        type: 'select',
		        value: '0',
		        data:{
		        	"0": "普通",
		        	"1": "置顶"
		        },
                required: true
		    }, {
		        field: 'orderNo',
		        title: '序号',
                required: true
		    }],
            buttons: [{
                title: '确定',
        		field: 'confirm',
                handler: function() {
                    if ($('#popForm').valid()) {
                        var popFormData = $('#popForm').serializeObject();
                		var data={};
                		
                		data.code = selRecords[0].code;
                		data.location = popFormData.location1;
                		data.orderNo = popFormData.orderNo;
                		
		                reqApi({
		                    code: '808704',
		                    json: data
		                }).done(function(data) {
                    		dw.close().remove();
                            sucList()
		                });
                    }
                }
            }, {
                title: '取消',
        		field: 'cancel',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });
        dw.__center();
        
    })
	
});