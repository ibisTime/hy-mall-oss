$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'name',
        title: '商品名称',
        formatter: function(v, data){
        	return data.product.name;
        }
    }, {
        field: 'price',
        title: '价格',
        amount: true,
        formatter: moneyFormat
    }, {
        field: 'quantity',
        title: '数量',
    }, {
        field: 'buyMaxCount',
        title: '单人购买最大数量',
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "product_group_code",
        formatter: Dict.getNameForList("product_group_code"),
        search: true
    }, {
        field: 'startDatetimeStart',
        title: '开始时间',
        type: 'date',
        formatter: function(v, data){
        	return dateTimeFormat(data.startDatetime);
        },
        search: true
    }, {
        field: 'endDatetimeEnd',
        title: '结束时间',
        type: 'date',
        formatter: function(v, data){
        	return dateTimeFormat(data.endDatetime);
        },
        search: true
    }, {
        field: 'remark',
        title: '备注'
    }];

    buildList({
        columns: columns,
        pageCode: '808095',
    });
    
    //下架
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 0 && selRecords[0].status != 1) {
            toastr.info("不是可撤下的状态");
            return;
        }
        
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">撤下团购</li></ul>' +
                '</form>'
        });

        dw.showModal();

        buildDetail({
            container: $('#formContainer'),
            fields: [{
                field: 'remark',
                title: '备注',
                value: selRecords[0].remark ? selRecords[0].remark : '',
                required: true,
            }],
            buttons: [{
                title: '通过',
                handler: function() {
                    if ($('#popForm').valid()) {
                        var data = $('#popForm').serializeObject();
                        data.code = selRecords[0].code;
                        reqApi({
                            code: '808091',
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

    });
    
});
