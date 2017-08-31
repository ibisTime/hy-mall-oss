$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '订单编号',
    }, {
        field: 'status',
        title: '订单状态',
        type: "select",
        key: "order_status",
        keyCode: '808907',
        formatter: Dict.getNameForList("order_status", "808907"),
        search: true,
    }, {
        field: 'productName',
        title: '商品名称',
        formatter: function(v, data) {
            if (data.productOrderList[0].product) {
                return data.productOrderList[0].product.name;
            } else {
                return ""
            }

        }
    }, {
        field: 'type',
        title: '商品类型',
        type: 'select',
        listCode: '808007',
        params: {
            // type: '1',
            // parentCode: OSS.categoryCode,
        },
        keyName: 'code',
        valueName: 'name',
        searchName: 'name',
        search: true
    }, {
        field: 'payType',
        title: '买单方式',
        key: 'pay_type',
        keyCode: "808907",
        formatter: Dict.getNameForList("pay_type", '808907'),
        type: 'select',
        search: true,
    }, {
        field: 'amount1',
        title: '商品总价',
        formatter: moneyFormat
    }, {
        field: 'yunfei',
        title: '运费',
        formatter: moneyFormat,
    }, {
        field: 'applyUser',
        title: '下单用户',
        search: true,
        formatter: function(v, data) {
            return data.user.mobile;
        },
        type: 'select',
        search: true,
        pageCode1: '805120',
        params: {
            kind: 'f1',
            updater: '',
            companyCode: OSS.company
        },
        keyName: 'userId',
        valueName: 'mobile',
        searchName: 'mobile',
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '下单时间',
        type: 'date',
        field2: 'dateEnd',
        search: true,
    }];

    buildList({
        columns: columns,
        pageCode: '808065',
    });

    $("#detailBtn").off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        var type = selRecords[0].payType ? selRecords[0].payType : 0;
        window.location.href = "order_addedit.html?Code=" + selRecords[0].code + '&type=' + type;
    });
    //现场发货
    $("#formStoresBtn").off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].toUser != OSS.SYS_USER) {
            toastr.info("不是可以现场发货的订单");
            return;
        }
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">取消订单</li>' +
                '<li><label>备注：</label><input id="remark" name="remark" class="control-def"></input></li>' +
                '<li><input id="subBtn" name="subBtn"type="button" class="btn margin-left-100 submit" value="确定"><li><input id="goBackBtn" name="goBackBtn" type="button" class=" btn margin-left-20 goBack" value="返回"></ul>' +
                '</form>'
        });
        dw.showModal();
        $(document).on('click', '#subBtn', function() {
            $('#popForm').validate({
                'rules': {
                    remark: {
                        required: true,
                        maxlength: 255
                    }
                }
            });
            if ($('#popForm').valid()) {
                var data = $('#popForm').serializeObject();
                data.orderCode = selRecords[0].code;
                data.remark = $("#remark").val();
                reqApi({
                    code: "808055",
                    json: data
                }).done(function() {
                    toastr.info("操作成功");
                    $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
                    setTimeout(function() {
                        dw.close().remove();
                    }, 500)
                });
            }
        });
        $(document).on('click', '#goBackBtn', function() {
            setTimeout(function() {
                dw.close().remove();
            }, 500)

        });
        dw.__center();
        var type = selRecords[0].payType ? selRecords[0].payType : 0;
        window.location.href = "order_addedit.html?Code=" + selRecords[0].code + '&type=' + type;
    });
    //物流发货
    $("#deliverGoodsBtn").off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].toUser == OSS.SYS_USER) {
            window.location.href = "order_addedit.html?Code=" + selRecords[0].code + '&type=' + type;

        } else {
            toastr.info("不是可以物流发货的订单");
            return;
        }

    });

    $("#zjLedgerBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "zjLedger.html?refNo=" + selRecords[0].code;
    })

});