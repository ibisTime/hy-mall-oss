$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '姓名',
        search: true
    }, {
        field: 'mobile',
        title: '手机号',
        search: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'sale_apply_status',
        formatter: Dict.getNameForList('sale_apply_status'),
        search: true
    }, {
        field: 'applyUser',
        title: '申请人',
        type:'select',
        pageCode: '805120',
        params: {
            kind: 'C',
            updater: '',
            companyCode: OSS.company
        },
        keyName: 'userId',
        valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
        searchName: 'keywords',
        search: true,
        formatter: function(v, data) {
            return data.applyUserName;
        },
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat,
        field1: 'applyDatetimeStart',
        title1: '申请时间',
        type1: 'date',
        field2: 'applyDatetimeEnd',
        type2: 'date',
        twoDate: true,
        search: true,
    }];
    buildList({
        columns: columns,
        pageCode: '805255'
    });

    $('#checkBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if(selRecords[0].status != 0){
            toastr.info("不是待审核状态不可操作");
            return;
        }

        window.location.href = "sale_addedit.html?isCheck=1&v=1&code=" + selRecords[0].code;
    });

});