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
        field: 'userId',
        title: '下单用户',
        search: true,
//      formatter: function(v, data) {
//          return data.user.mobile;
//      },
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
        field: 'productName',
        title: '商品名称',
        formatter: function(v, data) {
            if (data.product) {
                return data.product.name;
            } else {
                return "-"
            }

        },
        search: true,
    }, {
        field: 'status',
        title: '订单状态',
        type: "select",
        data: {
        	'1':'退货申请中',
        	'2':'代发货',
        	'3':'退货失败',
        	'4':'已发货',
        	'5':'已退款',
        	'6':'收货异常',
        },
        search: true,
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        columns: columns,
        pageCode: '808085'
    });
    
    //审核
    $("#checkBtn").off('click').click(function(){
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        };
        
        if (selRecords[0].status != '1') {
            toastr.warning("不是退货申请中的记录");
            return;
        };
        
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">退货审核</li></ul>' +
                '</form>'
        });

        dw.showModal();

        buildDetail({
            container: $('#formContainer'),
            fields: [{
                field: 'approveNote',
                title: '审核说明',
                required: true,
            }],
            buttons: [{
                title: '通过',
                handler: function() {
                    if ($('#popForm').valid()) {
                        var data = $('#popForm').serializeObject();
                        data.code = selRecords[0].code;
                        data.approveResult = '1';
                        data.approveUser = getUserName();
                        reqApi({
                            code: '808081',
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
                        data.approveResult = '0';
                        data.approveUser = getUserName();
                        reqApi({
                            code: '808081',
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
    
    
    //收货处理
    $("#collectGoodsBtn").click(function(){
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        };
        
        if (selRecords[0].status != '4') {
            toastr.warning("不是已发货的记录");
            return;
        };
        
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">收货处理</li></ul>' +
                '</form>'
        });

        dw.showModal();

        buildDetail({
            container: $('#formContainer'),
            fields: [{
                field: 'remark',
                title: '备注',
            }],
            buttons: [{
                title: '确认收货',
                handler: function() {
                    if ($('#popForm').valid()) {
                        var data = $('#popForm').serializeObject();
                        data.code = selRecords[0].code;
                        data.handleResult = '1';
                        data.handleUser = getUserName();
                        reqApi({
                            code: '808083',
                            json: data
                        }).done(function(data) {
                            dw.close().remove();
                            sucList()
                        });
                    }
                }
            }, {
                title: '收货异常',
                handler: function() {
                    if ($('#popForm').valid()) {
                        var data = $('#popForm').serializeObject();
                        data.code = selRecords[0].code;
                        data.handleResult = '0';
                        data.handleUser = getUserName();
                        reqApi({
                            code: '808083',
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
