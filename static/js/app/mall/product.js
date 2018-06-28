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
        field: 'category',
        title: '大类',
        type: 'select',
        listCode: '808007',
        params: {
            type: '1',
            parentCode: 0,
        },
        keyName: 'code',
        valueName: 'name',
        search: true,
        onChange: function(v, data) {
            if (v) {
                $("#type").renderDropdown({
                    listCode: "808007",
                    params: {
                        type: "1",
                        parentCode: v,
                    },
                    keyName: "code",
                    valueName: "name",
                    searchName: "name"
                });
            }
        },
    }, {
        field: 'type',
        title: '小类',
        type: 'select',
        listCode: '808007',
        params: {
            type: '1',
            parentCode: "1",
        },
        keyName: 'code',
        valueName: 'name',
        search: true
    }, {
        field: 'location',
        title: '位置',
        type: 'select',
        key: "product_location",

        formatter: Dict.getNameForList("product_location"),
        search: true,
    }, {
        field: 'orderNo',
        title: '序号'
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "product_status",
        formatter: Dict.getNameForList("product_status"),
        search: true
    }, {
        field: 'leaderBackRate',
        title: '领队返点比例',
    }, {
        field: 'oneBackRate',
        title: '一级返点比例',
    }, {
        field: 'twoBackRate',
        title: '二级返点比例',
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildList({
        columns: columns,
        pageCode: '808025',
        deleteCode: '808011',
        searchParams: {
        	status:'normal',
            companyCode: OSS.company
        },
        beforeDetail: function(data) {
            window.location.href = "product_detail.html?code=" + data.code + "&v=1";
        },
        beforeEdit: function(data) {
            if (data.status == 3) {
                toastr.info("已上架，不可修改");
                return;
            }
            window.location.href = "product_addedit.html?code=" + data.code + '&category=' + data.category;
        }
    });
    //上架
    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 1 && selRecords[0].status != 4) {
            toastr.info("该商品状态不可上架");
            return;
        }
        window.location.href = "product_up.html?v=1&code=" + selRecords[0].code + "&category=" + selRecords[0].category;
    });
    //下架
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 3) {
            toastr.info("该商品状态不可下架");
            return;
        }
        confirm("确认下架？").then(function() {
            reqApi({
                code: '808014',
                json: { "code": selRecords[0].code }
            }).then(function() {
                sucList();
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
        window.location.href = "product_addeditCopy.html?code=" + selRecords[0].code + '&category=' + selRecords[0].category;
    });

    //回收
    $('#goRecycleBinBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 4&&selRecords[0].status != 1) {
            toastr.info("该商品状态不可回收");
            return;
        }
        confirm("确认回收？").then(function() {
            reqApi({
                code: '808015',
                json: {"code": selRecords[0].code}
            }).then(function() {
            	sucList();
            });
        }, function() {});

    });
    
    
});
