$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'name',
        title: '商品名称',
        search: true,
    }, {
        field: 'type',
        title: '类型',
        type: 'select',
        listCode: '810007',
        params: {
            type: '4',
            // parentCode: 0,
        },
        keyName: 'code',
        valueName: 'name',
        search: true
    }, {
        field: 'originalPrice',
        title: '原价',
        formatter: moneyFormat
    }, {
        field: 'price1',
        title: '价格',
        formatter: function(v, data) {
            if (v) {
                return moneyFormat(v) + "元";
            } else if (data.price2) {
                return moneyFormat(data.price2) + "积分";
            }
        }
    }, {
        field: 'deposit',
        title: '押金',
        formatter: moneyFormat
    }, {
        field: 'quantity',
        title: '库存',
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        key: "rent_prod_location",

        formatter: Dict.getNameForList("rent_prod_location"),
        search: true,
    }, {
        field: 'orderNo',
        title: '序号'
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "rent_prod_status",
        formatter: Dict.getNameForList("rent_prod_status"),
        search: true
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildList({
        columns: columns,
        pageCode: '810025',
        searchParams: {
        	status:'normal',
            companyCode: OSS.company
        }
    });
    //上架
    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords.length > 1) {
            toastr.info("不能多选");
            return;
        }

        if (selRecords[0].status != 1 && selRecords[0].status != 4) {
            toastr.info("该商品状态不可上架");
            return;
        }
        window.location.href = "leaseProduct_up.html?Code=" + selRecords[0].code + "&v=1";

    });
    //下架
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
    //一键新增
    $('#copyBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords.length > 1) {
            toastr.info("不能多选");
            return;
        }

        window.location.href = "leaseProduct_addeditCopy.html?code=" + selRecords[0].code;

    });
});