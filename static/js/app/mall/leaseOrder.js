$(function() {
    var query = getQueryString('Q') || "";
    var searchParams;
    if (query) {
        searchParams = {};
    } else {
        searchParams = {
            toUser: OSS.SYS_USER
        }
    }

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
        key: "rorder_status",
        keyCode: '810907',
        formatter: Dict.getNameForList("rorder_status", "810907"),
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
        field: 'payType',
        title: '买单方式',
        key: 'pay_type',
        keyCode: "810907",
        formatter: Dict.getNameForList("pay_type", '810907'),
        type: 'select',
        search: true,
    }, {
        field: 'amount1',
        title: '人民币总价',
        formatter: moneyFormat
    }, {
        field: 'amount2',
        title: '积分总价',
        formatter: moneyFormat
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
            kind: 'C',
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
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        columns: columns,
        pageCode: '808065',
        singleSelect: false,
        searchParams: searchParams
    });
    //物流发货
    $("#deliverGoodsBtn").off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords.length > 1) {
            toastr.info("请选择一条记录");
            return;
        }
        if (selRecords[0].status != 2) {
            toastr.warning("不是可以发货的状态");
            return;
        }
        if (selRecords[0].toUser == OSS.SYS_USER) {
            window.location.href = "order_deliverGoods.html?code=" + selRecords[0].code;

        } else {
            toastr.warning("不是可以物流发货的订单");
            return;
        }

    });
    //取消订单
    $("#cancelBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        }
        var codeList = []

        for (var i = 0; i < selRecords.length; i++) {
            codeList.push(selRecords[i].code)
            if (selRecords[i].status == 4 || selRecords[i].status == 5 || selRecords[i].status == 91 || selRecords[i].status == 92 || selRecords[i].status == 93) {
                toastr.warning(selRecords[i].code + "不是能取消订单的状态!");
                return;
            }
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
                // 'rules': {
                //     remark: {
                //         required: true,
                //         maxlength: 255
                //     }
                // }
            });
            if ($('#popForm').valid()) {
                var data = $('#popForm').serializeObject();
                data.codeList = codeList;
                data.remark = $("#remark").val();
                reqApi({
                    code: "808056",
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

    })
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords.length > 1) {
            toastr.info("不能多选");
            return;
        }

        if (selRecords[0].status != 3) {
            toastr.info("该商品状态不可下架");
            return;
        }
        confirm("确认下架？").then(function() {
            reqApi({
                code: '810014',
                json: { "code": selRecords[0].code }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        }, function() {});

    });
});