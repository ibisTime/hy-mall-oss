$(function() {
    var kind = getQueryString('k') || "";

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '订单编号',
        search: true
    }, {
        field: 'productName',
        title: '商品名称'
    }, {
        title: "商品类型",
        field: "productType",
        formatter: function(v, data) {
            if (data.productType == "J04") {
                return "积分"
            } else {
                return "普通"
            }
        }
    }, {
        field: 'payType',
        title: '买单方式',
        key: 'pay_type',
        formatter: Dict.getNameForList("pay_type"),
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
        pageCode: '805120',
        params: {
            kind: 'C',
            updater: '',
            companyCode: OSS.company
        },
        keyName: 'userId',
        valueName: 'mobile',
        searchName: 'mobile',
    }, {
        field: 'promptTimes',
        title: '催货次数',
        readonly: true
    }, {
        title: "提货方式",
        field: "takeType",
        type: "select",
        key: "take_type",
        formatter: Dict.getNameForList("take_type"),
        // search: true
    }, {
        field: 'status',
        title: '订单状态',
        type: "select",
        key: "rorder_status",
        formatter: Dict.getNameForList("rorder_status"),
        search: true,
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '下单时间',
        type: 'date',
        field2: 'dateEnd',
        search: true,
        twoDate: true
    }, {
        field: "payDatetime",
        title: "支付时间",
        formatter: dateTimeFormat,
        field1: 'payDateStart',
        title1: '支付时间',
        type: 'date',
        field2: 'payDateEnd',
        twoDate: true,
        search: true,
    }, {
        title: "备注",
        field: "remark"
    }];
    buildList({
        columns: columns,
        pageCode: '810055',
        singleSelect: false,
        searchParams: {
            takeType: "1",
            toUser: kind ? "" : getUserId(),
            companyCode: OSS.company,
            statusList: kind ? ["1", "2", "3", "4", "5", "6", "7", "8", "9", "91", "92", "93"] : ["1", "2", "3", "4", "5", "6"]
        }
    });
    //现场发货
    $("#formStoresBtnBtn").off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        }
        if (selRecords.length > 1) {
            toastr.warning("请选择一条记录");
            return;
        }
        if (selRecords[0].status != 2) {
            toastr.warning("不是可以发货的状态");
            return;
        }
        if (selRecords[0].takeType == "2") {
            toastr.warning("不是可以现场发货的订单");
            return;
        }
        window.location.href = "./leaseStoreOrder_Shipment.html?code=" + selRecords[0].code;


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
            if (selRecords[i].status == 1 || selRecords[i].status == 4 || selRecords[i].status == 5 || selRecords[i].status == 6 || selRecords[i].status == 7) {
                toastr.warning(selRecords[i].code + "不是能取消订单的状态!,只有已支付待发货和已发货待收货的状态才可以取消订单");
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
                    code: "810047",
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
    });
    // 确认归还
    $("#returnBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        }
        if (selRecords.length > 1) {
            toastr.warning("请选择一条记录");
            return;
        }
        if (selRecords[0].status != 5) {
            toastr.warning("不是可以确认归还的状态");
            return;
        }
        // window.location.href = "leaseOrder_addedit.html?&v=1&F=1&code=" + selRecords[0].code;
        confirm("确认该商品已经归还了？").then(function() {
            reqApi({
                code: '810050',
                json: { "code": selRecords[0].code, "remark": "已经归还" }
            }).then(function() {
                toastr.info("操作成功");
                $('#tableList').bootstrapTable('refresh', { url: $('#tableList').bootstrapTable('getOptions').url });
            });
        }, function() {});

    });
    //流水查询
    $("#ledgerBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.warning("请选择记录");
            return;
        };
        window.location.href = "order_ledger.html?refNo=" + selRecords[0].code;
    });
});