$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "父类",
        field: "parentCode",
        type: 'select',
        listCode: "808007",
        keyName: "code",
        valueName: "name",
        searchName: "name",
        params: {
            updater: "",
            type: "1",
            parentCode: "0",
        },
        search: true
    }, {
        field: 'name',
        title: '小类名称',
        search: true,
    }, {
        field: 'status',
        title: '状态',
        key: "category_status",
        search: true,
        formatter: Dict.getNameForList("category_status"),
    }, {
        field: 'orderNo',
        title: '次序',
        sortable: true,
    }];

    buildList({
        columns: columns,
        pageCode: '808005',
        searchParams: {
            type: "1",
            companyCode: OSS.company,
            parentCode: "1",
            "orderColumn": "order_no",
            "orderDir": "asc"
        }
    });

    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == 1) {
            toastr.info("已上架");
            return;
        }
        confirm("确认上架？").then(function() {
            reqApi({
                code: '808003',
                json: { "code": selRecords[0].code }
            }).then(function() {
                sucList();
            });
        });

    });

    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != 1) {
            toastr.info("还未上架");
            return;
        }
        confirm("确认下架？").then(function() {
            reqApi({
                code: '808004',
                json: { "code": selRecords[0].code }
            }).then(function() {
                sucList();
            });
        });
    });

});
