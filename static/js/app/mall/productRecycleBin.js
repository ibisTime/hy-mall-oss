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
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildList({
        columns: columns,
        pageCode: '808025',
        deleteCode: '808011',
        searchParams: {
        	status:'9',
            companyCode: OSS.company
        },
        beforeDetail: function(data) {
            window.location.href = "product_detail.html?Code=" + data.code + "&v=1";
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
                code: '808016',
                json: { "code": selRecords[0].code }
            }).then(function() {
            	sucList();
            });
        }, function() {});

    });

});