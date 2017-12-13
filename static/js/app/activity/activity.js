$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'name',
        title: '活动名称'
    }, {
        field: 'userId',
        title: '领队',
        type: 'select',
        search: true,
        pageCode: '805120',
        params: {
            kind: 'OL',
            updater: '',
            companyCode: OSS.company
        },
        keyName: 'userId',
        valueName: 'mobile',
        searchName: 'mobile',
        formatter: function(v, data) {
            return data.user ? data.user.realName+"("+data.user.mobile+")" : v
        }
    }, {
        field: 'type',
        title: '类型',
        type: 'select',
        key: 'act_type',
        formatter: Dict.getNameForList('act_type'),
        search: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'act_status',
        formatter: Dict.getNameForList('act_status'),
        search: true
    }, {
        field: 'updateDatetime',
        title: '更新时间',
        formatter: dateTimeFormat,
    },{
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: '808705',
        searchParams: {
            companyCode: OSS.company
        },
    });
    
	//审核
	$("#examineBtn").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status != 0) {
            toastr.info("不是可审核的状态");
            return;
        }

        window.location.href = "activity_examine.html?code=" + selRecords[0].code+"&userId=" + selRecords[0].userId;
    })
});