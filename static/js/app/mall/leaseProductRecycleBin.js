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
        listCode: '808007',
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
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildList({
        columns: columns,
        pageCode: '810025',
        searchParams: {
        	status:'9',
            companyCode: OSS.company
        },
        beforeDetail: function(data) {
            window.location.href = "./leaseProduct_addedit.html?Code=" + data.code + "&v=1";
        }
    });
    //还原
    $('#outRecycleBinBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        confirm("确认还原？").then(function() {
            reqApi({
                code: '810016',
                json: { "code": selRecords[0].code }
            }).then(function() {
            	sucList();
            });
        }, function() {});

    });
});